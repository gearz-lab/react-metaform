import chai from 'chai';
import metadataProvider from '../src/lib/metadataProvider.js';
const assert = chai.assert;

describe('MetadataProvider', function () {
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
                    fields: []
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
            layouts: []
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

    describe('getProcessedSchema', ()=> {
        it('Basic usage', () => {
            let schema = require('./assets/metadataProviderTestData/completeData');

            let processedSchema = metadataProvider.getProcessedSchema(schema, 'contact', 'contact-edit');
            assert.equal(processedSchema.groups.length, 1);
            assert.equal(processedSchema.groups[0].rows.length, 1);
            assert.equal(processedSchema.groups[0].rows[0].fields.length, 1);

            let field = processedSchema.groups[0].rows[0].fields[0];
            assert.equal(field.name, 'name');
            assert.equal(field.type, 'string');
            assert.equal(field.displayName, 'Name');
        });

        it('Missing layouts', () => {
            let schema = require('./assets/metadataProviderTestData/missingLayouts');

            let processedSchema = metadataProvider.getProcessedSchema(schema, 'contact');
            assert.equal(processedSchema.groups.length, 1);
            assert.equal(processedSchema.groups[0].rows.length, 1);
            assert.equal(processedSchema.groups[0].rows[0].fields.length, 3);

            assert.equal(processedSchema.groups[0].rows[0].fields[0].name, 'type');
            assert.equal(processedSchema.groups[0].rows[0].fields[1].name, 'name');
            assert.equal(processedSchema.groups[0].rows[0].fields[2].name, 'date');
        });
    });
});
