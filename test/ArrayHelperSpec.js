import chai from 'chai';
import arrayHelper from '../src/lib/helpers/arrayHelper.js';
const assert = chai.assert;

describe('ArrayHelper', function () {
    it('Move right', function () {
        let array = [1, 2, 3];
        arrayHelper.move(array, 0, 1);
        assert.equal(array[0], 2);
        assert.equal(array[1], 1);
        assert.equal(array[2], 3);
    })
    it('Move left', function () {
        let array = [1, 2, 3];
        arrayHelper.move(array, 1, 0);
        assert.equal(array[0], 2);
        assert.equal(array[1], 1);
        assert.equal(array[2], 3);
    });
    it('Move out of bounds to the left', function () {
        let array = [1, 2, 3];
        arrayHelper.move(array, 1, -2);
        assert.equal(array[0], 2);
        assert.equal(array[1], 1);
        assert.equal(array[2], 3);
    });
    it('Move out of bounds to the right', function () {
        let array = [1, 2, 3];
        arrayHelper.move(array, 1, 4);
        assert.equal(array[0], 1);
        assert.equal(array[1], 3);
        assert.equal(array[2], 2);
    });
});