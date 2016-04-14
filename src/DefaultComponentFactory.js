import componentFactory from './ComponentFactory.js';

import TextBox from './components/fieldComponents/TextBox';

componentFactory.registerFieldComponent('TextBox', ['string', 'int', 'float'], TextBox);
componentFactory.setDefaultFieldComponents({
    'string': 'TextBox'
});

export default componentFactory;