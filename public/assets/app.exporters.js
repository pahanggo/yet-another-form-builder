const generateBs4 = function(data) {
    const outputs = [`<div class="container">`];
    data.sections.forEach((section) => {
        outputs.push(`    <div class="row justify-content-center">
        <div class="col-md-${section.size}">
            <fieldset>
                <legend>${section.label}</legend>
                <div class="row">`);

        section.fields.forEach((field) => {
            switch(field.type) {
                case 'Currency':
                    outputs.push(`                    <div class="col-md-${field.size}">
                        <label for="${field.id}">${field.attributes.label ?? ''}</label>
                        <div class="input-group">`);
                    if(field.attributes.prefix) {
                        outputs.push(`                            <div class="input-group-prepend">
                                <span class="input-group-text">${field.attributes.prefix}</span>
                            </div>`);
                    }
                    outputs.push(`                            <input class="form-control" type="number" step="${field.attributes.step}" id="${field.id}" name="${field.id}"/>`);
                    if(field.attributes.suffix) {
                        outputs.push(`                            <div class="input-group-append">
                                <span class="input-group-text">${field.attributes.suffix}</span>
                            </div>`);
                    }
                    outputs.push(`                        </div>
                    </div>`);
                    break;
                case 'Date':
                    outputs.push(`                    <div class="col-md-${field.size}">
                        <label for="${field.id}">${field.attributes.label ?? ''}</label>
                        <input class="form-control" type="date" id="${field.id}" name="${field.id}"/>
                    </div>`);
                case 'Date Time':
                    outputs.push(`                    <div class="col-md-${field.size}">
                        <label for="${field.id}">${field.attributes.label ?? ''}</label>
                        <input class="form-control" type="datetime-local" id="${field.id}" name="${field.id}"/>
                    </div>`);
                    break;
                case 'Email':
                    outputs.push(`                    <div class="col-md-${field.size}">
                        <label for="${field.id}">${field.attributes.label ?? ''}</label>
                        <input class="form-control" type="email" id="${field.id}" name="${field.id}"/>
                    </div>`);
                    break;
                case 'Number':
                    outputs.push(`                    <div class="col-md-${field.size}">
                        <label for="${field.id}">${field.attributes.label ?? ''}</label>
                        <input class="form-control" step="${field.attributes.step}" type="number" id="${field.id}" name="${field.id}"/>
                    </div>`);
                    break;
                case 'Range':
                    outputs.push(`                    <div class="col-md-${field.size}">
                        <label for="${field.id}">${field.attributes.label ?? ''}</label>
                        <input class="form-control" min="${field.attributes.min}" max="${field.attributes.max}" step="${field.attributes.step}" type="range" id="${field.id}" name="${field.id}"/>
                    </div>`);
                    break;
                case 'Select':
                    outputs.push(`                    <div class="col-md-${field.size}">
                        <label for="${field.id}">${field.attributes.label ?? ''}</label>
                        <select class="form-control" id="${field.id}" name="${field.id}"></select>
                    </div>`);
                    break;
                case 'Spacer':
                    outputs.push(`                    <div class="col-md-${field.size}">
                        <div style="height:${field.attributes.height}"></div>
                    </div>`);
                    break;
                case 'Text':
                    outputs.push(`                    <div class="col-md-${field.size}">
                        <label for="${field.id}">${field.attributes.label ?? ''}</label>
                        <input class="form-control" type="text" id="${field.id}" name="${field.id}"/>
                    </div>`);
                    break;
                case 'Textarea':
                    outputs.push(`                    <div class="col-md-${field.size}">
                        <label for="${field.id}">${field.attributes.label ?? ''}</label>
                        <textarea class="form-control" rows="${field.attributes.rows}" id="${field.id}" name="${field.id}"></textarea>
                    </div>`);
                    break;
            }
        });

        outputs.push(`                </div>
            </fieldset>
        </div>
    </div>`);
    });

    return outputs.join("\n") + "\n</div>";
}

const generateBackpack = function(data) {
    const outputs = [`<?php
        $this->crud->addFields([`];

    data.sections.forEach((section) => {
        const tab = section.label ? `
                'tab'        => '${section.label}',` : '';
        section.fields.forEach((field) => {
            const wrapper = field.size < 12 ? `
                'wrapper'    => [
                    'class' => 'form-group col-md-${field.size}',
                ],` : '';
            switch(field.type) {
                case 'Currency':
                    outputs.push(`            [
                'name'       => '${field.id}',
                'label'      => '${field.attributes.label}',
                'type'       => 'number',
                'prefix'     => '${field.attributes.prefix}',
                'suffix'     => '${field.attributes.suffix}',
                'attributes' => [
                    'step' => '${field.attributes.step}',
                ],${wrapper}${tab}
            ],`);
                    break;
                case 'Date':
                    outputs.push(`            [
                'name'       => '${field.id}',
                'label'      => '${field.attributes.label}',
                'type'       => 'date',
                'attributes' => [
                ],${wrapper}${tab}
            ],`);
                    break;
                case 'Date Time':
                    outputs.push(`            [
                'name'       => '${field.id}',
                'label'      => '${field.attributes.label}',
                'type'       => 'datetime',
                'attributes' => [
                ],${wrapper}${tab}
            ],`);
                    break;
                case 'Email':
                    outputs.push(`            [
                'name'       => '${field.id}',
                'label'      => '${field.attributes.label}',
                'type'       => 'email',
                'attributes' => [
                ],${wrapper}${tab}
            ],`);
                case 'Number':
                    outputs.push(`            [
                'name'       => '${field.id}',
                'label'      => '${field.attributes.label}',
                'type'       => 'number',
                'attributes' => [
                    'step' => '${field.attributes.step}',
                ],${wrapper}${tab}
            ],`);
                    break;
                case 'Range':
                    outputs.push(`            [
                'name'       => '${field.id}',
                'label'      => '${field.attributes.label}',
                'type'       => 'range',
                'attributes' => [
                    'min'  => '${field.attributes.min}',
                    'max'  => '${field.attributes.max}',
                    'step' => '${field.attributes.step}',
                ],${wrapper}${tab}
            ],`);
                    break;
                case 'Select':
                    outputs.push(`            [
                'name'       => '${field.id}',
                'label'      => '${field.attributes.label}',
                'type'       => 'select_from_array',
                'options'    => [`);
                field.attributes.options.forEach((opt) => {
                    outputs.push(`                    '${opt[0]}' => '${opt[1]}',`);
                });
            outputs.push(`                ],
                'attributes' => [
                ],${wrapper}${tab}
            ],`);
                    break;
                case 'Spacer':
                    outputs.push(`            [
                'name'       => '${field.id}',
                'type'       => 'custom_html',
                'value'      => '<div style="height:${field.attributes.height}">&nbsp;</div>',
                'attributes' => [
                ],${wrapper}${tab}
            ],`);
                    break;
                case 'Text':
                    outputs.push(`            [
                'name'       => '${field.id}',
                'label'      => '${field.attributes.label}',
                'type'       => 'text',
                'attributes' => [
                ],${wrapper}${tab}
            ],`);
                    break;
                case 'Textarea':
                    outputs.push(`            [
                'name'       => '${field.id}',
                'label'      => '${field.attributes.label}',
                'type'       => 'textarea',
                'attributes' => [
                    'rows' => '${field.attributes.rows}'],${wrapper}${tab}
            ],`);
                    break;
            }
        });
    });

    return outputs.join("\n") + "\n        ]);";
}

angular.module('FBExporters', [])
    .factory('BS4Exporter', function(){
        return {
            // what language should the editor mode be in?
            'lang': 'html',
            // what extension is used when downloading
            'extension': 'html',
            // the label shown to the user
            'label': 'Bootstrap 4 Exporter',
            // the export function
            'export': generateBs4,
        }
    })
    .factory('SourceExporter', function($filter){
        return {
            'lang': 'json',
            'extension': 'json',
            'label': 'View Source',
            'export': function(data){
                return $filter('json')(data);
            },
        }
    })
    .factory('BackpackExporter', function($filter){
        return {
            'lang': 'php',
            'extension': 'php',
            'label': 'Laravel Backpack Exporter',
            'export': generateBackpack,
        }
    })
    .directive('editor', function(){
        return {
            restrict: 'E',
            scope: {
                'value': '=',
                'lang': '=',
            },
            link: function(scope, el, attrs) {
                var editor = null;
                require.config({
                    paths: {vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.0-dev.20220627/min/vs'}
                });
                require(['vs/editor/editor.main'], function () {
                    editor = monaco.editor.create(el[0], {
                        value: scope.value,
                        language: scope.lang,
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        readOnly: true,
                    });
                });

                scope.$watch('value', function() {
                    if(editor) {
                        editor.setValue(scope.value);
                        monaco.editor.setModelLanguage(editor.getModel(), scope.lang);
                    }
                })
            }
        }
    })
    ;