import React from 'react';
import Select2 from 'react-select';
import FormGroup from './FormGroup.js';

const Lookup = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.node,
        displayName: React.PropTypes.string,
        options: React.PropTypes.array.isRequired
    },

    handleChange(value){
        this.props.onChange({id: this.props.id, value: value});
    },

    render: function() {

        // metadata
        let props = {
            value: this.props.value,
            name: this.props.name,
            options: this.props.options.map(i =>
            {
                return {
                    value: i.value,
                    label: i.text
                }
            }),
            onChange: this.handleChange,
            disabled: this.props.readOnly,
            displayName: this.props.displayName,
            placeholder: this.props.placeholder
        };

        return (
            <FormGroup {...props}>
                <Select2 {...props} />
            </FormGroup>
        );
    }
});

export default Lookup;