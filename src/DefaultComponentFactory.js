import componentFactory from './ComponentFactory.js';

import TextBox from './components/fieldComponents/TextBox';
import Group from './components/groupComponents/Group';
import ArrayContainer from './components/fieldComponents/ArrayContainer';

componentFactory.registerFieldComponent('TextBox', ['string', 'int', 'float'], TextBox);
componentFactory.registerFieldComponent('ArrayContainer', ['array'], ArrayContainer);

componentFactory.registerGroupComponent('Group', Group);

// set defaults
componentFactory.setDefaultFieldComponents({
    'string': 'TextBox',
    'array': 'ArrayContainer'
});
componentFactory.setDefaultGroupComponent('Group');

export default componentFactory;