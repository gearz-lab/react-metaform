import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import GearzMixin from '../mixins/GearzMixin.js';

const CheckBox = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.bool,
        displayName: React.PropTypes.string
    },

    mixins: [GearzMixin],

    handleChange(){
        let oldValue = this.props.value === true;
        let newValue = !oldValue;
        this.props.onChange({id: this.props.id, value: newValue});
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