import React from 'react';
import AutoForm from '../../src/AutoForm';

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
                    ]
                }
            ]
        };
        return <AutoForm schema={schema} />;
    }
});

export default AutoFormDemo;

