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
                            type: 'string',
                            help: 'Fuck this 2',
                            required: true,
                            addonAfter: 'fuck'
                        },
                        {
                            name: 'email',
                            type: 'string',
                            fuck: function(m) { return m.name }
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
                                            displayName: 'Name',
                                            name: 'name'
                                        },
                                        {
                                            displayName: 'E-mail',
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
                                    displayName: function(m) {
                                        var now = new Date().getTime();
                                         while(new Date().getTime() < now + 50)
                                        { /* do nothing */ }
                                        
                                        return m.number;
                                     },
                                    name: 'number'
                                },
                                {
                                    displayName: 'Long distance code',
                                    name: 'longDistanceCode'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        return <AutoForm schema={schema} componentFactory={DefaultComponentFactory} entityName="contact" layoutName="edit" onSubmit={ () => console.log('yeaaah') } />;
    }
});

export default AutoFormDemo;

