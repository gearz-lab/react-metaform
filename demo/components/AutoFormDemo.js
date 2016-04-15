import React from 'react';
import AutoForm from '../../src/AutoForm';
import DefaultComponentFactory from '../../src/DefaultComponentFactory';
var AutoFormDemo = React.createClass({
    render: function() {
        var schema = {
            entities: [
                {
                    name: 'contact',
                    fields: [
                        {
                            name: 'name',
                            type: 'string'
                        },
                        {
                            name: 'email',
                            type: 'string'
                        },
                        {
                            name: 'phones',
                            type: 'array',
                            arrayType: 'entity',
                            entityType: 'phone',
                            layoutName: 'edit'
                        }
                    ],
                    layouts: [
                        {
                            name: 'edit',
                            groups: [
                                {
                                    orientation: 'vertical',
                                    fields: [
                                        {
                                            name: 'name'
                                        },
                                        {
                                            name: 'email'
                                        },
                                        {
                                            name: 'phones'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'phone',
                    fields: [
                        {
                            name: 'number',
                            type: 'string'
                        },
                        {
                            name: 'longDistanceCode',
                            type: 'string'
                        }
                    ],
                    layouts: [
                        {
                            name: 'edit',
                            fields: [
                                {
                                    name: 'number'
                                },
                                {
                                    name: 'longDistanceCode'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        return <AutoForm schema={schema} componentFactory={DefaultComponentFactory} entityName="contact" layoutName="edit" />;
    }
});

export default AutoFormDemo;

