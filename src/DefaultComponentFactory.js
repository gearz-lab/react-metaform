import componentFactory from './ComponentFactory.js';

import TextBox from './components/fieldComponents/TextBox';
import Group from './components/groupComponents/Group';

componentFactory.registerFieldComponent('TextBox', ['string', 'int', 'float'], TextBox);
componentFactory.registerGroupComponent('Group', Group);

// set defaults
componentFactory.setDefaultFieldComponents({
    'string': 'TextBox'
});
componentFactory.setDefaultGroupComponent('Group');

export default componentFactory;