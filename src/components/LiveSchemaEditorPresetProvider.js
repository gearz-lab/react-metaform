if (process.env.APP_ENV !== 'browser') {
    require.extensions['.txt'] = function (module, filename) {
        var fs = require('fs');
        module.exports = fs.readFileSync(filename, 'utf8');
    };
}

import textbox from './liveSchemaEditorPresets/textbox.txt';
import textboxWithInvalidConstraint from './liveSchemaEditorPresets/textboxWithInvalidConstraint.txt';
import basic from './liveSchemaEditorPresets/basic.txt';
import myLittleIde from './liveSchemaEditorPresets/myLittleJavaScriptIDE.txt';
import confirmPassword from './liveSchemaEditorPresets/confirmPassword.txt';

class LiveSchemaEditorPresetProvider {
    constructor() {
        // presets
        this.presetsConfig = [];
        this.presetsConfig.push({
            value: 'textbox',
            text: 'TextBox',
            title: 'Edit contact',
            entityName: 'contact',
            layoutName: 'contact-edit',
            code: textbox
        });
        this.presetsConfig.push({
            value: 'textboxWithInvalidConstraint',
            text: 'TextBox with an invalid constraint',
            title: 'Edit contact',
            entityName: 'contact',
            layoutName: 'contact-edit',
            code: textboxWithInvalidConstraint
        });
        this.presetsConfig.push({
            value: 'basic',
            text: 'Basic',
            title: 'Edit contact',
            entityName: 'contact',
            layoutName: 'contact-edit',
            code: basic
        });
        this.presetsConfig.push({
            value: 'myLittleIde',
            text: 'My Little JavaScript IDE',
            title: 'My Little JavaScript IDE',
            entityName: 'code',
            layoutName: 'code-edit',
            code: myLittleIde
        });
        this.presetsConfig.push({
            value: 'confirmPassword',
            text: 'Confirm password',
            title: 'Reset password',
            entityName: 'confirmPassword',
            layoutName: 'default',
            code: confirmPassword
        });
    }
    getPresets() {
        return this.presetsConfig;
    }
}

export default new LiveSchemaEditorPresetProvider();