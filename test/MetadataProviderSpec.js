import chai from 'chai';
import metadataProvider from '../src/lib/metadataProvider.js';
const assert = chai.assert;

describe('MetadataProvider', function() {
    describe('Should merge fields', function () {
        let schema = {
            entities: [
                {
                    name: 'contact',
                    fields: [
                        {
                            name: 'name',
                            type: 'string',
                            displayName: 'Name'
                        },
                        {
                            name: 'date',
                            type: 'date',
                            displayName: 'Date'
                        }
                    ]
                }
            ],
            layouts: [
                {
                    name: 'dumb-layout',
                    fields: [
                    ]
                },
                {
                    name: 'contact-edit',
                    fields: [
                        {
                            name: 'name',
                            layoutOnlyProp: true
                        },
                        {
                            name: 'date'
                        }
                    ]
                }
            ]
        };

        let fields = metadataProvider.getFields(schema, 'contact', 'contact-edit');
        assert.strictEqual(fields.length, 2);
        assert.strictEqual(fields[0].layoutOnlyProp, true);
        assert.strictEqual(fields[0].type, 'string');
    });
    describe('Non-existing layout', function () {
        let schema = {
            entities: [
                {
                    name: 'contact',
                    fields: [
                        {
                            name: 'name',
                            type: 'string',
                            displayName: 'Name'
                        },
                        {
                            name: 'date',
                            type: 'date',
                            displayName: 'Date'
                        }
                    ]
                }
            ],
            layouts: [
            ]
        };
        assert.throws(() => metadataProvider.getFields(schema, 'contact', 'contact-edit'), /Could not find layout/);
    });

    describe('Non-existing entity', () => {
        it('Basic usage', () => {
            let schema = {
                entities: [],
                layouts: []
            };
            assert.throws(() => metadataProvider.getFields(schema, 'contact', 'contact-edit'), /Could not find entity/);
        });
    });
});
