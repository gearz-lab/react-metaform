import componentFactory from './ComponentFactory.js';

import TextBox from '../components/editors/TextBox';
import Label from '../components/editors/Label.js';
import CheckBox from '../components/editors/CheckBox.js';
import Select from '../components/editors/Select.js';
import Lookup from '../components/editors/Lookup.js';
import DatePicker from '../components/editors/DatePicker.js';
import EntityContainer from '../components/editors/EntityContainer.js';
import ArrayContainer from '../components/editors/ArrayContainer.js';

// Registers all component definitions
componentFactory.registerComponent('textbox', ['string', 'int', 'float'], TextBox);
componentFactory.registerComponent('label', ['string', 'int', 'float'], Label);
componentFactory.registerComponent('select', ['string', 'int', 'float'], Select);
componentFactory.registerComponent('lookup', ['string', 'int', 'float'], Lookup);
componentFactory.registerComponent('checkbox', ['bool'], CheckBox);
componentFactory.registerComponent('datepicker', ['bool'], DatePicker);
componentFactory.registerComponent('entitycontainer', ['entity'], EntityContainer);
componentFactory.registerComponent('arraycontainer', ['array'], ArrayContainer);

// Registers the component defaults
componentFactory.setDefaultComponents({
    "string": 'textbox',
    "int": 'textbox',
    "float": 'textbox',
    "bool": 'checkbox',
    "date": 'datepicker',
    "entity": 'entitycontainer',
    "array": 'arraycontainer'
});

export default componentFactory;