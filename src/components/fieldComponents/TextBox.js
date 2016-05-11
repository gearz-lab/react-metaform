import React from 'react';
import { FormGroup, FormControl, HelpBlock, Input, ControlLabel, InputGroup } from 'react-bootstrap';

const TextBox = React.createClass({

    propTypes: {
        value: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        displayName: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        error: React.PropTypes.string,
        addonBefore: React.PropTypes.string,
        addonAfter: React.PropTypes.string
    },

    render() {

        let {
            value,
            name,
            placeholder,
            displayName,
            help,
            error,
            addonBefore,
            addonAfter,
            touched,
            onChange,
            onBlur
        } = this.props;

        let input = <FormControl
            type="text"
            value={value}
            placeholder={placeholder}
            label={displayName || name}
            help={help}
            hasFeedback
            ref="input"
            onChange={(event) => onChange(event.target.value)}
            onBlur={(event) => onBlur()} />;
            
        let content;
        if(addonBefore || addonAfter) {
            content = <InputGroup>
                { addonBefore ? <InputGroup.Addon>{addonBefore}</InputGroup.Addon> : null }
                { input }
                { addonAfter ? <InputGroup.Addon>{addonAfter}</InputGroup.Addon> : null }
            </InputGroup>
        }
        else {
            content = input;
        }
        
        let formGroupConditionalProps = {};
        if(error && touched) {
            formGroupConditionalProps.validationState = 'error';
        }
                
        return (
            <FormGroup {...formGroupConditionalProps}>
                <ControlLabel>{ displayName || name }</ControlLabel>
                { content }
                <HelpBlock>{(touched ? error : '') || help}</HelpBlock>
            </FormGroup>
        );
    }
});

export default TextBox;