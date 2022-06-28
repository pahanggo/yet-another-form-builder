angular.module('FBFields', [])
    .factory('Fields', function () {
        return [
            {
                // name of the field
                name: 'Currency',

                // template rendered on form view
                template: `
                    <label for="{{field.id}}">{{field.attributes.label}}</label>
                    <div class="input-group">
                        <div class="input-group-prepend" ng-if="field.attributes.prefix">
                            <span class="input-group-text">{{field.attributes.prefix}}</span>
                        </div>
                        <input id="{{field.name}}" type="number" step="{{field.attributes.step}}" ng-disabled="field.attributes.readonly" ng-readonly="field.attributes.readonly" class="form-control">
                        <div class="input-group-append" ng-if="field.attributes.suffix">
                            <span class="input-group-text">{{field.attributes.suffix}}</span>
                        </div>
                    </div>
                `,

                // extra field attributes
                attributes: [
                    {
                        // name of the attribute
                        name: 'label',

                        // default value of the attribute
                        value: 'Currency Field',

                        // template of the attribute form (shown in sidebar)
                        template: `
                            <div class="form-group">
                                <label for="input-label">
                                    Label
                                </label>
                                <input type="text" class="form-control" name="input-label" ng-model="field.attributes.label" id="input-label">
                            </div>`
                    },
                    {
                        name: 'step',
                        value: '0.01',
                        template: `
                            <div class="form-group">
                                <label for="input-step">
                                    Step
                                </label>
                                <input type="text" class="form-control" name="input-step" ng-model="field.attributes.step" id="input-step">
                            </div>`
                    },
                    {
                        name: 'prefix',
                        value: '',
                        template: `
                            <div class="form-group">
                                <label for="input-prefix">
                                    Prefix
                                </label>
                                <input type="text" class="form-control" name="input-prefix" ng-model="field.attributes.prefix" id="input-prefix">
                            </div>`
                    },
                    {
                        name: 'suffix',
                        value: '',
                        template: `
                            <div class="form-group">
                                <label for="input-suffix">
                                    Suffix
                                </label>
                                <input type="text" class="form-control" name="input-suffix" ng-model="field.attributes.suffix" id="input-suffix">
                            </div>`
                    },
                    {
                        name: 'readonly',
                        value: false,
                        template: `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" ng-model="field.attributes.readonly" id="input-readonly">
                                <label class="form-check-label" for="input-readonly">
                                    Readonly
                                </label>
                            </div>`
                    },
                ],
            },
            {
                name: 'Date',
                template: `
                    <label for="{{field.id}}">{{field.attributes.label}}</label>
                    <input id="{{field.id}}" type="date" class="form-control" ng-disabled="field.attributes.readonly" ng-readonly="field.attributes.readonly">
                `,
                attributes: [
                    {
                        name: 'label',
                        value: 'Date Field',
                        template: `
                            <div class="form-group">
                                <label for="input-label">
                                    Label
                                </label>
                                <input type="text" class="form-control" name="input-label" ng-model="field.attributes.label" id="input-label">
                            </div>`
                    },
                    {
                        name: 'readonly',
                        value: false,
                        template: `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" ng-model="field.attributes.readonly" id="input-readonly">
                                <label class="form-check-label" for="input-readonly">
                                    Readonly
                                </label>
                            </div>`
                    },
                ],
            },
            {
                name: 'Date Time',
                template: `
                    <label for="{{field.id}}">{{field.attributes.label}}</label>
                    <input id="{{field.id}}" type="datetime-local" class="form-control">
                `,
                attributes: [
                    {
                        name: 'label',
                        value: 'Date Time Field',
                        template: `
                            <div class="form-group">
                                <label for="input-label">
                                    Label
                                </label>
                                <input type="text" class="form-control" name="input-label" ng-model="field.attributes.label" id="input-label" ng-disabled="field.attributes.readonly" ng-readonly="field.attributes.readonly">
                            </div>`
                    },
                    {
                        name: 'readonly',
                        value: false,
                        template: `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" ng-model="field.attributes.readonly" id="input-readonly">
                                <label class="form-check-label" for="input-readonly">
                                    Readonly
                                </label>
                            </div>`
                    },
                ],
            },
            {
                name: 'Email',
                template: `
                    <label for="{{field.id}}">{{field.attributes.label}}</label>
                    <input id="{{field.id}}" type="email" class="form-control" ng-disabled="field.attributes.readonly" ng-readonly="field.attributes.readonly">
                `,
                attributes: [
                    {
                        name: 'label',
                        value: 'Email Field',
                        template: `
                            <div class="form-group">
                                <label for="input-label">
                                    Label
                                </label>
                                <input type="text" class="form-control" name="input-label" ng-model="field.attributes.label" id="input-label">
                            </div>`
                    },
                    {
                        name: 'readonly',
                        value: false,
                        template: `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" ng-model="field.attributes.readonly" id="input-readonly">
                                <label class="form-check-label" for="input-readonly">
                                    Readonly
                                </label>
                            </div>`
                    },
                ],
            },
            {
                name: 'Number',
                template: `
                    <label for="{{field.id}}">{{field.attributes.label}}</label>
                    <input id="{{field.id}}" type="number" step="{{field.attributes.step}}" ng-disabled="field.attributes.readonly" ng-readonly="field.attributes.readonly" class="form-control">
                `,
                attributes: [
                    {
                        name: 'label',
                        value: 'Number Field',
                        template: `
                            <div class="form-group">
                                <label for="input-label">
                                    Label
                                </label>
                                <input type="text" class="form-control" name="input-label" ng-model="field.attributes.label" id="input-label">
                            </div>`
                    },
                    {
                        name: 'step',
                        value: '1',
                        template: `
                            <div class="form-group">
                                <label for="input-step">
                                    Step
                                </label>
                                <input type="text" class="form-control" name="input-step" ng-model="field.attributes.step" id="input-step">
                            </div>`
                    },
                    {
                        name: 'readonly',
                        value: false,
                        template: `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" ng-model="field.attributes.readonly" id="input-readonly">
                                <label class="form-check-label" for="input-readonly">
                                    Readonly
                                </label>
                            </div>`
                    },
                ],
            },
            {
                name: 'Range',
                template: `
                    <label for="{{field.id}}">{{field.attributes.label}}</label>
                    <input id="{{field.id}}" type="range" step="{{field.attributes.step}}" min="{{field.attributes.min}}" max="{{field.attributes.max}}" ng-disabled="field.attributes.readonly" ng-readonly="field.attributes.readonly" class="form-control">
                `,
                attributes: [
                    {
                        name: 'label',
                        value: 'Range Field',
                        template: `
                            <div class="form-group">
                                <label for="input-label">
                                    Label
                                </label>
                                <input type="text" class="form-control" name="input-label" ng-model="field.attributes.label" id="input-label">
                            </div>`
                    },
                    {
                        name: 'step',
                        value: '1',
                        template: `
                            <div class="form-group">
                                <label for="input-step">
                                    Step
                                </label>
                                <input type="text" class="form-control" name="input-step" ng-model="field.attributes.step" id="input-step">
                            </div>`
                    },
                    {
                        name: 'min',
                        value: '0',
                        template: `
                            <div class="form-group">
                                <label for="input-min">
                                    Minimum
                                </label>
                                <input type="text" class="form-control" name="input-min" ng-model="field.attributes.min" id="input-min">
                            </div>`
                    },
                    {
                        name: 'max',
                        value: '100',
                        template: `
                            <div class="form-group">
                                <label for="input-max">
                                    Maximum
                                </label>
                                <input type="text" class="form-control" name="input-max" ng-model="field.attributes.max" id="input-max">
                            </div>`
                    },
                    {
                        name: 'readonly',
                        value: false,
                        template: `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" ng-model="field.attributes.readonly" id="input-readonly">
                                <label class="form-check-label" for="input-readonly">
                                    Readonly
                                </label>
                            </div>`
                    },
                ],
            },
            {
                name: 'Select',
                template: `
                    <label for="{{field.id}}">{{field.attributes.label}}</label>
                    <select id="{{field.id}}" class="form-control" ng-disabled="field.attributes.readonly" ng-readonly="field.attributes.readonly">
                        <option ng-repeat="option in field.attributes.options" value="{{option[0]}}">{{option[1]}}</option>
                    </select>
                `,
                attributes: [
                    {
                        name: 'label',
                        value: 'Select Field',
                        template: `
                            <div class="form-group">
                                <label for="input-label">
                                    Label
                                </label>
                                <input type="text" class="form-control" name="input-label" ng-model="field.attributes.label" id="input-label">
                            </div>`
                    },
                    {
                        name: 'options',
                        value: [['', 'Please Select']],
                        template: `
                            <div class="form-group">
                                <div class="float-right">
                                    <button type="button" class="btn btn-xs btn-secondary" ng-click="field.attributes.options.push(['',''])">
                                        <i class="la la-plus"></i>
                                    </button>
                                    <button type="button" class="btn btn-xs btn-secondary" ng-click="field.attributes.options.pop()">
                                        <i class="la la-minus"></i>
                                    </button>
                                </div>
                                <label>
                                    Options
                                </label>
                                <div class="row mb-1 no-gutters" ng-repeat="option in field.attributes.options">
                                    <div class="col-sm-3">
                                        <input type="text" class="form-control" ng-model="option[0]" id="input-label">
                                    </div>
                                    <div class="col-sm-9 pl-md-1">
                                        <input type="text" class="form-control" ng-model="option[1]" id="input-label">
                                    </div>
                                </div>
                            </div>`
                    },
                    {
                        name: 'readonly',
                        value: false,
                        template: `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" ng-model="field.attributes.readonly" id="input-readonly">
                                <label class="form-check-label" for="input-readonly">
                                    Readonly
                                </label>
                            </div>`
                    },
                ],
            },
            {
                name: 'Spacer',
                template: `
                    <div style="height:{{field.attributes.height}}"></div>
                `,
                attributes: [
                    {
                        name: 'height',
                        value: '3em',
                        template: `
                            <div class="form-group">
                                <label for="input-height">
                                    Height
                                </label>
                                <input type="text" class="form-control" name="input-height" ng-model="field.attributes.height" id="input-height">
                            </div>`
                    },
                ],
            },
            {
                name: 'Text',
                template: `
                    <label for="{{field.id}}">{{field.attributes.label}}</label>
                    <input id="{{field.id}}" type="text" class="form-control" ng-disabled="field.attributes.readonly" ng-readonly="field.attributes.readonly">
                `,
                attributes: [
                    {
                        name: 'label',
                        value: 'Label',
                        template: `
                            <div class="form-group">
                                <label for="input-label">
                                    Label
                                </label>
                                <input type="text" class="form-control" name="input-label" ng-model="field.attributes.label" id="input-label">
                            </div>`
                    },
                    {
                        name: 'readonly',
                        value: false,
                        template: `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" ng-model="field.attributes.readonly" id="input-readonly">
                                <label class="form-check-label" for="input-readonly">
                                    Readonly
                                </label>
                            </div>`
                    },
                ],
            },
            {
                name: 'Textarea',
                template: `
                    <label for="{{field.id}}">{{field.attributes.label}}</label>
                    <textarea ng-disabled="field.attributes.readonly" ng-readonly="field.attributes.readonly" id="{{field.id}}" type="text" class="form-control" rows="{{field.attributes.rows}}"></textarea>
                `,
                attributes: [
                    {
                        name: 'label',
                        value: 'Label',
                        template: `
                            <div class="form-group">
                                <label for="input-label">
                                    Label
                                </label>
                                <input type="text" class="form-control" name="input-label" ng-model="field.attributes.label" id="input-label">
                            </div>`
                    },
                    {
                        name: 'rows',
                        value: 3,
                        template: `
                            <div class="form-group">
                                <label for="input-rows">
                                    Rows
                                </label>
                                <input type="number" step="1" class="form-control" name="input-rows" ng-model="field.attributes.rows" id="input-rows">
                            </div>`
                    },
                    {
                        name: 'readonly',
                        value: false,
                        template: `
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" ng-model="field.attributes.readonly" id="input-readonly">
                                <label class="form-check-label" for="input-readonly">
                                    Readonly
                                </label>
                            </div>`
                    },
                ],
            },
        ];
    })

    .directive('fieldContent', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                field: '=',
                fields: '=',
            },
            link: function (scope, el, attrs, trans) {
                scope.$watch('field.type', function () {
                    scope.fields.forEach((f) => {
                        if (f.name == scope.field.type) {
                            const newAttributes = {};
                            scope.field.attributes = scope.field.attributes || {};
                            f.attributes.forEach((a) => {
                                newAttributes[a.name] = scope.field.attributes[a.name] || a.value;
                            });
                            scope.field.attributes = newAttributes;
                            el.html(f.template);
                            $compile(el.contents())(scope);
                        }
                    })
                });
            }
        }
    })

    .directive('fieldForm', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                field: '=',
                fields: '=',
            },
            link: function (scope, el, attrs, trans) {
                scope.$watch('field.type', function () {
                    var contents = [];
                    scope.fields.forEach((f) => {
                        if (f.name == scope.field.type) {
                            f.attributes.forEach((a) => {
                                contents.push(a.template);
                            });
                        }
                    });

                    if (contents.length > 0) {
                        contents.unshift('<hr/>');
                        el.html(contents.join(''));
                        $compile(el.contents())(scope);
                    }
                });
            }
        }
    })
    ;