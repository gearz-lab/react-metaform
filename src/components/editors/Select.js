import React from 'react';
import Input from 'react-bootstrap/lib/Input';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';

const Select = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.node,
        displayName: React.PropTypes.string,
        options: React.PropTypes.array.isRequired
    },

    handleChange(event){
        let newValue = event.target.value;
        this.props.onChange({key: this.props.key, value: newValue});
    },

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
     * Returns the style due to the visible state
     */
        _getVisibleStyle() {
        var invisible = this.props.invisible;
        if(invisible) {
            return 'hide';
        }
        return '';
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

    render: function() {
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
            type: 'select',
            placeholder: this.props.placeholder,
            label: this.props.displayName,
            help: this.props.help,
            addonBefore: this._getAddon( this.props.addonBefore, this.props.addonBeforeGlyphicon),
            addonAfter: this._getAddon( this.props.addonAfter, this.props.addonAfterGlyphicon),
            hasFeedback: this.props.hasFeedback,
            groupClassName: `group-class ${this._getVisibleStyle()}`,
            labelClassName: 'label-class',
            onChange:this.handleChange,
            disabled: this.props.readOnly
        };

        if(props.hasFeedback) {
            props.bsStyle = this._getValidStyle()
        }

        return (
                <Input {...props }>
                    {
                        this.props.options.map(i => <option value={i.value}>{i.text}</option>)
                    }
                </Input>
        );
    }
});

export default Select;