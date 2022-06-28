function confirmDialog(msg) {
    return new Promise(function (resolve, reject) {
        let confirmed = window.confirm(msg);
        return confirmed ? resolve(true) : reject(false);
    });
}

angular.module('FB', ['FBFields', 'FBExporters', 'FBLocalStorage'])
    .controller('FBC', function (
        $scope,
        $filter,

        // fields are loaded here
        Fields,

        // this is the localstorage service
        Store,

        // exporters
        SourceExporter,
        BS4Exporter,
        BackpackExporter,
    ) {
        $scope.fields = Fields;
        $scope.data = Store.load('__fb_store__');
        $scope.rowWidth = document.querySelector('.row').clientWidth;
        $scope.colWidth = $scope.rowWidth / 12;
        $scope.exporters = [
            BackpackExporter,
            BS4Exporter,
            SourceExporter,
        ];

        $scope.selectedSection = null;
        $scope.selectedField = null;

        /**
         * Section Stuff
         */

        $scope.addSection = function () {
            $scope.data.sections.push({
                label: 'New Section',
                size: $scope.data.sections[0].size,
                fields: [
                    {
                        size: 4,
                        type: 'Text',
                        id: 'field_1',
                        attributes: {
                            label: 'Field 1',
                        },
                    },
                ]
            });

            $scope.selectedSection = $scope.data.sections[$scope.data.sections.length - 1];
        }

        $scope.editSection = function (section) {
            $scope.unselectField();
            $scope.selectedSection = section;
        }

        $scope.moveSectionUp = function (section) {
            let index = $scope.data.sections.indexOf(section);
            if (index > 0) {
                $scope.data.sections.splice(index, 1);
                $scope.data.sections.splice(index - 1, 0, section);
            }
        }

        $scope.moveSectionDown = function (section) {
            let index = $scope.data.sections.indexOf(section);
            if (index > -1 && index < $scope.data.sections.length - 1) {
                $scope.data.sections.splice(index, 1);
                $scope.data.sections.splice(index + 1, 0, section);
            }
        }

        $scope.removeSection = function (section) {
            confirmDialog('Are you sure you want to remove this section?')
                .then(() => {
                    $scope.$apply(() => {
                        $scope.selectedSection = null;
                        $scope.unselectField();
                        var index = $scope.data.sections.indexOf(section);
                        if (index > -1) {
                            $scope.data.sections.splice(index, 1);
                        }
                    });
                }).catch(() => {});
        }

        /**
         * Field Stuff
         */

        $scope.addField = function (section) {
            let index = -1;
            if ($scope.selectedField) {
                index = section.fields.indexOf($scope.selectedField);
            }

            const field = {
                type: 'Text',
                size: 4,
                id: 'field_' + (section.fields.length + 1),
                attributes: {
                    label: 'Field ' + (section.fields.length + 1),
                },
            };

            if (index > -1) {
                section.fields.splice(index + 1, 0, field);
                setTimeout(() => {
                    $scope.selectField(section.fields[index + 1]);
                    $scope.$digest();
                }, 1);
            } else {
                section.fields.push(field);
                setTimeout(() => {
                    $scope.selectField(section.fields[section.fields.length - 1]);
                    $scope.$digest();
                }, 1);
            }
        }

        $scope.selectField = function (field) {
            $scope.unselectField();
            field.selected = true;
            $scope.selectedField = field;
        }

        $scope.unselectField = function () {
            $scope.data.sections.forEach((d) => d.fields.forEach((f) => f.selected = false));
            $scope.selectedField = null;
        }

        $scope.prevField = function () {
            $scope.data.sections.forEach((s) => s.fields.forEach((f, i) => {
                if(f == $scope.selectedField && i > 0) {
                    $scope.unselectField();
                    $scope.selectField(s.fields[i - 1]);
                }
            }));
        }

        $scope.nextField = function () {
            let hasSelected = false;
            $scope.data.sections.forEach((s) => s.fields.forEach((f, i) => {
                if(!hasSelected && f == $scope.selectedField && i < s.fields.length - 1) {
                    $scope.unselectField();
                    $scope.selectField(s.fields[i + 1]);
                    hasSelected = true;
                }
            }));
        }

        $scope.moveFieldUp = function (section, field) {
            let index = section.fields.indexOf(field);
            if (index > 0) {
                section.fields.splice(index, 1);
                section.fields.splice(index - 1, 0, field);
            } else {
                const sectionIndex = $scope.data.sections.indexOf(section);
                if(sectionIndex > 0) {
                    // move to prev section
                    section.fields.splice(index, 1);
                    $scope.data.sections[sectionIndex - 1].fields.push(field);
                }
            }
        }

        $scope.moveFieldDown = function (section, field) {
            let index = section.fields.indexOf(field);
            if (index > -1) {
                if(index < section.fields.length - 1) {
                    // move down in same section
                    section.fields.splice(index, 1);
                    section.fields.splice(index + 1, 0, field);
                } else {
                    const sectionIndex = $scope.data.sections.indexOf(section);
                    if (sectionIndex < $scope.data.sections.length - 1) {
                        // move to next section
                        section.fields.splice(index, 1);
                        $scope.data.sections[sectionIndex + 1].fields.unshift(field);
                    }
                }
            }
        }

        $scope.copyField = function (section, field) {
            const copy = angular.copy(field);
            let index = section.fields.indexOf(field);
            section.fields.splice(index + 1, 0, copy);
            setTimeout(() => {
                $scope.selectField(section.fields[index + 1]);
                $scope.$digest();
            }, 1);
        }

        $scope.removeField = function (field) {
            confirmDialog('Are you sure you want to remove this field?')
                .then(() => {
                    $scope.$apply(() => {
                        $scope.unselectField();
                        $scope.data.sections.forEach((section) => {
                            var index = section.fields.indexOf(field);
                            if (index > -1) {
                                section.fields.splice(index, 1);
                                if (index > 0) {
                                    $scope.selectField(section.fields[index - 1]);
                                }
                            }
                        });
                    });
                }).catch(() => {});
        }

        $scope.resizingField = null;
        $scope.resizeXOrigin = 0;
        $scope.isResizing = false;

        $scope.startResize = function (field) {
            $scope.isResizing = true;
            $scope.resizingField = field;
            $scope.resizingField.startSize = $scope.resizingField.size;
        }

        window.addEventListener('mousemove', function (e) {
            if ($scope.resizingField) {
                if ($scope.resizeXOrigin == 0) {
                    $scope.resizeXOrigin = e.clientX;
                }
                const originalSize = $scope.resizingField.size;
                $scope.resizingField.size = Math.min(Math.max($scope.resizingField.startSize - Math.round(($scope.resizeXOrigin - e.clientX) / $scope.colWidth), 1), 12)
                if (originalSize != $scope.resizingField.size) {
                    window.requestAnimationFrame(function () {
                        $scope.$digest();
                    });
                }
            }
        });

        window.addEventListener('mouseup', function () {
            $scope.resizingField = null;
            $scope.resizeXOrigin = 0;
            $scope.isResizing = false;
            window.requestAnimationFrame(function () {
                $scope.$digest();
            });
        });

        /**
         * Exporting Stuff
         */

        $scope.exporter = null;
        $scope.hasOutput = false;
        $scope.output = `<html></html>`;

        $scope.export = function(exporter) {
            $scope.data.showTable = false;
            $scope.output = exporter.export(angular.copy($scope.data));
            $scope.hasOutput = true;
        }

        $scope.downloadExport = function(exporter) {
            const blob = new Blob([exporter.export(angular.copy($scope.data))], {type : 'text/plain;charset=utf-8'})
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.download = $scope.data.projectName + '.' + exporter.extension;
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            link.remove();
        }

        $scope.newForm = function() {
            confirmDialog('Are you sure you want to clear the form? All unsaved changes will be lost.')
                .then(() => {
                    $scope.$apply(() => {
                        $scope.data = Store.load('__blank__');
                    });
                }).catch(() => {});
        }

        $scope.download = function() {
            const blob = new Blob([$filter('json')(angular.copy($scope.data))], {type : 'text/plain;charset=utf-8'})
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.download = $scope.data.projectName + '.fb';
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            link.remove();
        }

        $scope.upload = function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.style.display = 'none';
            document.body.appendChild(input);

            input.addEventListener('change', function(ev){
                if(ev.target.files.length == 0) {
                    input.remove();
                    return;
                }
                const reader = new FileReader();
                reader.onload = (theFile) => {
                    const contents = theFile.target.result;
                    const newData = JSON.parse(contents);
                    if(newData.projectName) {
                        confirmDialog('Are you sure you want to load ' + newData.projectName + '? All unsaved changes will be lost.')
                            .then(() => {
                                $scope.$apply(() => {
                                    $scope.data = newData;
                                });
                            }).catch(() => {});
                    }
                    input.remove();
                }
                reader.readAsText(ev.target.files[0]);
            })

            input.click();
        }

        /**
         * Make sure changes are persisted on LocalStorage
         */

        $scope.unselectField();
        $scope.$watch('data', function () {
            Store.save('__fb_store__', angular.copy($scope.data));
        }, true);
    });