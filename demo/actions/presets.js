if (process.env.APP_ENV !== 'browser') {
    require.extensions['.txt'] = function (module, filename) {
        var fs = require('fs');
        module.exports = fs.readFileSync(filename, 'utf8');
    };
}

import _ from 'underscore';
import base from './presets/default.txt';
export const LOAD_PRESETS = 'LOAD_PRESETS';

export function load() {
    return {
        type: LOAD_PRESETS,
        presets: [
            {
                value: 'default',
                text: 'Default',
                title: 'Edit contact',
                entityName: 'contact',
                layoutName: 'edit',
                code: base
            }
        ]
    }
}