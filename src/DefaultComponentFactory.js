import componentFactory from './ComponentFactory.js';

// Field components
import TextBox from './components/fieldComponents/TextBox';
import Label from './components/fieldComponents/Label.js';
import CheckBox from './components/fieldComponents/CheckBox.js';
import Select from './components/fieldComponents/Select.js';
import Lookup from './components/fieldComponents/Lookup.js';
import DatePicker from './components/fieldComponents/DatePicker.js';
import EntityContainer from './components/fieldComponents/EntityContainer.js';
import ArrayContainer from './components/fieldComponents/ArrayContainer.js';

// Group components
import MetaFormGroup from './components/groupComponents/MetaFormGroup.js';

// Registers all field component definitions
componentFactory.registerFieldComponent('textbox', ['string', 'int', 'float'], TextBox);
componentFactory.registerFieldComponent('label', ['string', 'int', 'float'], Label);
componentFactory.registerFieldComponent('select', ['string', 'int', 'float'], Select);
componentFactory.registerFieldComponent('lookup', ['string', 'int', 'float'], Lookup);
componentFactory.registerFieldComponent('checkbox', ['bool'], CheckBox);
componentFactory.registerFieldComponent('datepicker', ['bool'], DatePicker);
componentFactory.registerFieldComponent('entitycontainer', ['entity'], EntityContainer);
componentFactory.registerFieldComponent('arraycontainer', ['array'], ArrayContainer);

// Registers all group component definitions
componentFactory.registerGroupComponent('metaformgroup', MetaFormGroup);

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

componentFactory.setDefaultGroupComponent('metaformgroup');

export default componentFactory;