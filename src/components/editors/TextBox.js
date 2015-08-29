import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';
import GearzMixin from '../mixins/GearzMixin.js';

const TextBox = React.createClass({

    propTypes: {
        onChange: React.PropTypes.func.isRequired,
        name: React.PropTypes.string.isRequired
    },

    mixins: [GearzMixin],

    /**
     * Returns the style due to the valid state
     */
    _getValidStyle() {
        if(this.props.invalid) {
            if(this.props.invalid.value === undefined || this.props.invalid.value === null) {
                throw new Error('invalid prop should have a value property');
            }
            var invalid = this.props.invalid.value;
            if(invalid) {
                return 'error';
            }
        }
        return 'success';
    },

    /**
     * Returns the input type for the given property type
     */
    _getInputType(inputType, type, subType) {
        if(inputType) {
            return inputType;
        }
        switch(type) {
            case 'string':
                if(subType == 'password') {
                    return 'password';
                }
                return 'text';
        }
        return 'text';
    },

    /**
     * Returns an addon
     */
    _getAddon(addonText, addonGlyphicon) {
        if(addonGlyphicon) {
            return <Glyphicon glyph={addonGlyphicon} />;
        } else {
            return addonText;
        }
    },

    handleChange(event){
        if(!this.props.onChange) {
            return;
        }
        let newValue = event.target.value;
        if(newValue && this.props.maxLength) {
            if(newValue.length <= this.props.maxLength) {
                this.props.onChange({name: this.props.name, value: newValue});
            }
            else {

            }
        }
        else {
            this.props.onChange({name: this.props.name, value: newValue});
        }
    },

    render() {
        let value = this.props.rawValue ? this.props.rawValue : this.props.value;
        if(value === undefined || value === null) {
            // the value can never be null or undefined, because the Input will act as 'uncontrolled' if so, meaning that
            // it will allow whatever the user inputs
            value = '';
        }

        // metadata
        let props = {
            value: value,
            ref: 'input',
            type: this._getInputType(this.props.inputType, this.props.type, this.props.subType),
            subType: this.props.type,
            maxLength: this.props.maxLength,
            placeholder: this.props.placeholder,
            label: this.props.displayName,
            help: this.props.help,
            readOnly: this.props.readOnly,
            addonBefore: this._getAddon( this.props.addonBefore, this.props.addonBeforeGlyphicon),
            addonAfter: this._getAddon( this.props.addonAfter, this.props.addonAfterGlyphicon),
            hasFeedback: this.props.hasFeedback,
            groupClassName: `${this.getVisibleStyle()} ${this.props.groupClassName}`,
            labelClassName: `${this.props.labelClassName}`,
            wrapperClassName: ``,
            onChange:this.handleChange
        };

        if(props.hasFeedback) {
            props.bsStyle = this._getValidStyle()
        }

        return <Input {...props } />;
    }
});

export default TextBox;