if (process.env.APP_ENV !== 'browser') {
    require.extensions['.txt'] = function (module, filename) {
        var fs = require('fs');
        module.exports = fs.readFileSync(filename, 'utf8');
    };
}

import textbox from './liveSchemaEditorPresets/textbox.txt';
import textboxWithInvalidConstraint from './liveSchemaEditorPresets/textboxWithInvalidConstraint.txt';
import lookup from './liveSchemaEditorPresets/lookup.txt';
import innerEntity from './liveSchemaEditorPresets/innerEntity.txt';
import arrays from './liveSchemaEditorPresets/arrays.txt';
import confirmPassword from './liveSchemaEditorPresets/confirmPassword.txt';
import confirmPurchase from './liveSchemaEditorPresets/confirmPurchase.txt';
import selectiveMetaFormGroup from './liveSchemaEditorPresets/selectiveMetaFormGroup.txt';
import applicationSchema from './liveSchemaEditorPresets/applicationSchema.txt';

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
            value: 'lookup',
            text: 'Lookup',
            title: 'Edit contact',
            entityName: 'contact',
            layoutName: 'contact-edit',
            code: lookup
        });
        this.presetsConfig.push({
            value: 'innerEntity',
            text: 'Inner entity',
            title: 'Edit contact',
            entityName: 'contact',
            layoutName: 'contact-edit',
            code: innerEntity
        });
        this.presetsConfig.push({
            value: 'arrays',
            text: 'Arrays',
            title: 'Edit contact',
            entityName: 'contact',
            layoutName: 'contact-edit',
            code: arrays
        });
        this.presetsConfig.push({
            value: 'confirmPassword',
            text: 'Confirm password',
            title: 'Reset password',
            entityName: 'confirmPassword',
            layoutName: 'default',
            code: confirmPassword
        });
        this.presetsConfig.push({
            value: 'confirmPurchase',
            text: 'Confirm purchase',
            title: 'Confirm purchase',
            entityName: 'sale',
            layoutName: 'sale-edit',
            code: confirmPurchase
        });
        this.presetsConfig.push({
            value: 'selectiveMetaFormGroup',
            text: 'SelectiveMetaFormGroup',
            title: 'SelectiveMetaFormGroup',
            entityName: 'contact',
            layoutName: 'contact-edit',
            code: selectiveMetaFormGroup
        });
        //this.presetsConfig.push({
        //    value: 'applicationSchema',
        //    text: 'Application Schema',
        //    title: 'Application Schema',
        //    entityName: 'entity',
        //    layoutName: 'entity-edit',
        //    code: applicationSchema
        //});
    }
    getPresets() {
        return this.presetsConfig;
    }
}

export default new LiveSchemaEditorPresetProvider();