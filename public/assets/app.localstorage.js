const sampleData = {
    projectName: 'Sample Project',
    sections: [
        {
            label: 'Delivery Form',
            size: 10,
            fields: [
                {
                    id: 'field_1',
                    type: 'Text',
                    size: 4,
                    attributes: {
                        label: 'First Name',
                    },
                },
                {
                    id: 'field_2',
                    type: 'Text',
                    size: 4,
                    attributes: {
                        label: 'Last Name',
                    },
                },
                {
                    id: 'field_3',
                    type: 'Email',
                    size: 4,
                    attributes: {
                        label: 'Email Address',
                    },
                },
                {
                    id: 'field_4',
                    type: 'Textarea',
                    size: 8,
                    attributes: {
                        label: 'Shipping Address',
                        rows: 3
                    },
                },
                {
                    id: 'field_5',
                    type: 'Spacer',
                    size: 4,
                    attributes: {
                        height: '1em',
                    },
                },
                {
                    id: 'field_6',
                    type: 'Select',
                    size: 4,
                    attributes: {
                        label: 'State',
                        options: [['', 'Please Choose'], ['AK', 'Arkansas']]
                    },
                },
                {
                    id: 'field_7',
                    type: 'Select',
                    size: 4,
                    attributes: {
                        label: 'Country',
                        options: [['', 'Please Choose'], ['US', 'USA']]
                    },
                },
                {
                    id: 'field_8',
                    type: 'Currency',
                    size: 4,
                    attributes: {
                        label: 'Shipping Costs',
                        step: 1,
                        prefix: '$',
                        suffix: '.00'
                    },
                },
                {
                    id: 'field_9',
                    type: 'Date',
                    size: 4,
                    attributes: {
                        label: 'Preferred Delivery',
                    },
                },
            ]
        },
    ],
};

angular.module('FBLocalStorage', [])
    .factory('Store', function () {
        return {
            load: function (key) {
                let data = localStorage.getItem(key);
                if (data !== null) {
                    try {
                        data = JSON.parse(data);
                    } catch (e) {
                        console.error('Unable to parse local storage');
                        data = null;
                    }
                }
                return data || sampleData;
            },
            save: function (key, data) {
                try {
                    localStorage.setItem(key, JSON.stringify(data));
                } catch (e) {
                    console.error('Unable to save to local storage');
                }
            }
        }
    });