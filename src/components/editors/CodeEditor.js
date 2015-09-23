import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import braceJsx from 'brace/mode/jsx';
import braceJavaScript from 'brace/mode/javascript.js';
import braceCSharp from 'brace/mode/csharp.js';
import braceJava from 'brace/mode/java.js';
import braceSql from 'brace/mode/sql.js';
import gitHubTheme from 'brace/theme/github.js';
import FormGroup from './FormGroup.js';

const CodeEditor = React.createClass({

    handleChange: function(newValue) {
        if(!this.props.onChange) {
            return;
        }
        this.props.onChange({id: this.props.id, value: newValue});
    },

    render: function() {

        let formGroupProps = {
            displayName: this.props.displayName ? this.props.displayName : "CodeEditor"
        };

        // metadata
        let props = {
            value: this.props.value,
            name: this.props.name,
            ref: 'input',
            readOnly: this.props.readOnly,
            onChange:this.handleChange,
            mode: this.props.mode ? this.props.mode : 'jsx',
            width: this.props.width ? this.props.width : '100%',
            theme: 'github',
            height: this.props.height,
            fontSize: 14
        };

        return <FormGroup {...formGroupProps}>
                    <AceEditor {...props} />
                </FormGroup>
    }
});

export default CodeEditor;