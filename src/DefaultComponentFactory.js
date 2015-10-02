import componentFactory from './ComponentFactory.js';

import TextBox from './components/editors/TextBox';
import Label from './components/editors/Label.js';
import CheckBox from './components/editors/CheckBox.js';
import Select from './components/editors/Select.js';
import Lookup from './components/editors/Lookup.js';
import DatePicker from './components/editors/DatePicker.js';
import EntityContainer from './components/editors/EntityContainer.js';
import ArrayContainer from './components/editors/ArrayContainer.js';

// Registers all component definitions
componentFactory.registerFieldComponent('textbox', ['string', 'int', 'float'], TextBox);
componentFactory.registerFieldComponent('label', ['string', 'int', 'float'], Label);
componentFactory.registerFieldComponent('select', ['string', 'int', 'float'], Select);
componentFactory.registerFieldComponent('lookup', ['string', 'int', 'float'], Lookup);
componentFactory.registerFieldComponent('checkbox', ['bool'], CheckBox);
componentFactory.registerFieldComponent('datepicker', ['bool'], DatePicker);
componentFactory.registerFieldComponent('entitycontainer', ['entity'], EntityContainer);
componentFactory.registerFieldComponent('arraycontainer', ['array'], ArrayContainer);

// Registers the component defaults
componentFactory.setDefaultFieldComponents({
    "string": 'textbox',
    "int": 'textbox',
    "float": 'textbox',
    "bool": 'checkbox',
    "date": 'datepicker',
    "entity": 'entitycontainer',
    "array": 'arraycontainer'
});

export default componentFactory;