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
                                        }
                                    ]
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

