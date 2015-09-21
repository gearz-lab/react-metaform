import chai from 'chai';
import MetaFormStateManager from '../src/components/MetaFormStateManager.js';
import metadataProvider from '../src/lib/metadataProvider.js';
import console from '../src/lib/helpers/consoleHelpers.js';

describe('MetaFormStateManagerSpec', function() {
    it('Something', function() {

        let schema = require('./assets/metadataProviderTestData/completeWithNestedEntity');
        let model = {};
        let stateWrapper = { state: {} };
        let stateGetter = () => stateWrapper.state;
        let stateSetter = (state) => stateWrapper.state = state;

        let metaformStateManager = new MetaFormStateManager(
            schema,
            'contact',
            'contact-edit',
            model,
            stateGetter,
            stateSetter
        );

        stateSetter(metaformStateManager.getInitialState());

        //console.logObject(stateWrapper.state.componentProps);
    });
});

const assert = chai.assert;
