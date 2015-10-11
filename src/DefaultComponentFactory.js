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
import ArrayGridContainer from './components/fieldComponents/ArrayGridContainer.js';

// Group components
import MetaFormGroup from './components/groupComponents/MetaFormGroup.js';
import SelectiveMetaFormGroup from './components/groupComponents/SelectiveMetaFormGroup.js';

// Registers all field component definitions
componentFactory.registerFieldComponent('TextBox', ['string', 'int', 'float'], TextBox);
componentFactory.registerFieldComponent('Label', ['string', 'int', 'float'], Label);
componentFactory.registerFieldComponent('Select', ['string', 'int', 'float'], Select);
componentFactory.registerFieldComponent('Lookup', ['string', 'int', 'float'], Lookup);
componentFactory.registerFieldComponent('CheckBox', ['bool'], CheckBox);
componentFactory.registerFieldComponent('DatePicker', ['bool'], DatePicker);
componentFactory.registerFieldComponent('EntityContainer', ['entity'], EntityContainer);
componentFactory.registerFieldComponent('ArrayContainer', ['array'], ArrayContainer);
componentFactory.registerFieldComponent('ArrayGridContainer', ['array'], ArrayGridContainer);

// Registers all group component definitions
componentFactory.registerGroupComponent('MetaFormGroup', MetaFormGroup);
componentFactory.registerGroupComponent('SelectiveMetaFormGroup', SelectiveMetaFormGroup);

// Registers the component defaults
componentFactory.setDefaultFieldComponents({
    "string": 'TextBox',
    "int": 'TextBox',
    "float": 'TextBox',
    "bool": 'CheckBox',
    "date": 'DatePicker',
    "entity": 'EntityContainer',
    "array": 'ArrayContainer',
});

componentFactory.setDefaultGroupComponent('MetaFormGroup');

export default componentFactory;