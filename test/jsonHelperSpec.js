import chai from 'chai';
import jsonHelper from '../src/lib/helpers/jsonHelper.js';
const assert = chai.assert;

describe('jsonHelper', function() {
    describe('stringify', function() {

        it('When there\'s a function', function() {
            let obj = { name: 'Andre', data: function(m) { return m.name }};
            let result = jsonHelper.stringify(obj);
            console.log(result);
            assert.equal(result.indexOf('return m.name'), 66);
        });

        it('When there\'s an array', function() {
            let obj = { name: 'Andre', data: [{ something: function(m) { return m.name }}]};
            let result = jsonHelper.stringify(obj);
            console.log(result);
            assert.equal(result.indexOf('return m.name'), 89);
        });

    });
});