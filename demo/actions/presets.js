if (process.env.APP_ENV !== 'browser') {
    require.extensions['.txt'] = function (module, filename) {
        var fs = require('fs');
        module.exports = fs.readFileSync(filename, 'utf8');
    };
}

import base from './presets/default.txt';
export const LOAD_PRESETS = 'LOAD_PRESETS';
export const SET_PRESET = 'SET_PRESET';

/**
 * Loads all available presets
 * @returns {{type: string, presets: *[]}}
 */
export function loadPresets() {
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

/**
 * Sets the selected preset
 * @param preset
 * @returns {{type: string, preset: *}}
 */
export function setPreset(preset) {
    return {
        type: SET_PRESET,
        preset: preset
    }
}