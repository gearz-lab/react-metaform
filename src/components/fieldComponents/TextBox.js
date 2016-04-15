import React from 'react';
import { Input } from 'react-bootstrap';

const TextBox = React.createClass({

    propTypes: {
        value: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired
    },

    handleChange: function(event) {
        this.props.onChange(event.target.value);
    },

    render() {
        return (
            <Input
                type="text"
                value={this.props.value}
                placeholder="Enter text"
                label="Working example with validation"
                help="Validation is based on string length."
                hasFeedback
                ref="input"
                groupClassName="group-class"
                labelClassName="label-class"
                onChange={this.handleChange} />
        );
    }
});

export default TextBox;