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
        
        let { value,
            name,
            placeholder,
            displayName,
            help
            } = this.props;
        
        return (
            <div>
                Olha, alterei
                <Input
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    label={displayName || name}
                    help={help}
                    hasFeedback
                    ref="input"
                    groupClassName="group-class"
                    labelClassName="label-class"
                    onChange={this.handleChange} />
            </div>
        );
    }
});

export default TextBox;