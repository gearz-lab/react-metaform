import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import GearzMixin from '../mixins/GearzMixin.js';

const CheckBox = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.node,
        displayName: React.PropTypes.string
    },

    mixins: [GearzMixin],

    handleChange(event){
        let oldValue = this.props.value === true ? true : false;
        let newValue = !oldValue;
        this.props.onChange({name: this.props.name, value: newValue});
    },

    render: function() {
        // metadata
        let props = {
            type: 'checkbox',
            value: this.props.value,
            label: this.props.displayName,
            readOnly: this.props.readOnly,
            groupClassName: `${this.getVisibleStyle()}`,
            labelClassName: `${this.props.labelClassName}`,
            onChange:this.handleChange,
            help: this.props.help
        };
        if (this.props.value === true) {
            props.checked = true;
        }

        return (
            <Input {...props } />
        );
    }
});

export default CheckBox;