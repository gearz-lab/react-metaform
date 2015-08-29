import chai from 'chai';
import metadataEvaluator from '../src/lib/helpers/collectionHelper.js';
const assert = chai.assert;

describe('ObjectHelper', function() {

    describe('toObject', function () {
        it('Basic usage', function () {
            let myArray = [{id: "a", val: 55}, {id: "b", val: 1}];
            let object = metadataEvaluator.toObject(myArray, 'id');
            assert.strictEqual(object.a.id, 'a');
            assert.strictEqual(object.a.val, 55);
            assert.strictEqual(object.b.id, 'b');
            assert.strictEqual(object.b.val, 1);
        });
        it('Using arbitrary property as key', function () {
            let myArray = [{name: "a", val: 55}, {name: "b", val: 1}];
            let object = metadataEvaluator.toObject(myArray, 'name');
            assert.strictEqual(object.a.name, 'a');
            assert.strictEqual(object.a.val, 55);
            assert.strictEqual(object.b.name, 'b');
            assert.strictEqual(object.b.val, 1);
        });
    });

});
