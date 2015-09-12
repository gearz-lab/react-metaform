import chai from 'chai';
const assert = chai.assert;
import objectHelper from '../src/lib/helpers/objectHelper.js';

describe('ObjectHelper', function() {

    describe('setValue', function () {

        it('Non-existing properties', () => {
            let model = {};
            objectHelper.setValue(model, 'a.b.c.d', 2);
            assert.strictEqual(model.a.b.c.d, 2);
        });

        it('Existing properties', () => {
            let model = {
                a: {
                    name: 'andre',
                    b: {
                        name: 'pena'
                    }
                }
            };
            objectHelper.setValue(model, 'a.b.c.d', 2);
            assert.strictEqual(model.a.b.c.d, 2);
            assert.strictEqual(model.a.name, 'andre');
            assert.strictEqual(model.a.b.name, 'pena');
        });

        it('Array', () => {
            let model = {
                a: {
                    name: 'andre',
                    b: [{
                        name: 'pena'
                    }]
                }
            };
            objectHelper.setValue(model, 'a.b.0.c.d', 2);
            assert.strictEqual(model.a.b[0].c.d, 2);
            assert.strictEqual(model.a.name, 'andre');
            assert.strictEqual(model.a.b[0].name, 'pena');
        });

    });

});