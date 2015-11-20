import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import TextBox from '../src/components/fieldComponents/TextBox';
import FloatTypeProcessor from '../src/lib/typeProcessors/FloatTypeProcessor';
import metadataEvaluator from '../src/lib/MetadataEvaluator.js';
import chai from 'chai';
import _ from 'underscore';

const assert = chai.assert;

describe('TextBox', function () {
    it('Basic usage', function () {
        var metadata =
        {
            name: 'name',
            displayName: 'Name'
        };

        var model = {
            name: 'Andre'
        };

        var changedValue = undefined;
        let evaluatedMetadata = metadataEvaluator.evaluate(metadata, model);
        evaluatedMetadata.onChange = e => changedValue = e.value;

        var component = ReactTestUtils.renderIntoDocument(<TextBox {...evaluatedMetadata} />);
        var componentNode = ReactDOM.findDOMNode(component);
        var elementsByTagName = componentNode.getElementsByTagName('input');

        ReactTestUtils.Simulate.change(elementsByTagName[0], {target: {value: 'John'}} );
        assert.equal('John', changedValue);
    });
});
