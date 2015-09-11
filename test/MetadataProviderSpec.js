import chai from 'chai';
import metadataProvider from '../src/lib/metadataProvider.js';
import console from '../src/lib/helpers/consoleHelpers.js';
const assert = chai.assert;

describe('MetadataProvider', function () {

    describe('getFields', function () {

        it('Should merge fields', function () {

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
                    }
                ]
            };

            let fields = metadataProvider.getFields(schema, 'contact', 'contact-edit');
            assert.strictEqual(fields.length, 2);
            assert.strictEqual(fields[0].layoutOnlyProp, true);
            assert.strictEqual(fields[0].type, 'string');

        });

        it('Should work with nested properties', function () {

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
                                name: 'phone',
                                type: 'entity',
                                entityName: 'phone',
                                layout: 'phone-edit'
                            }
                        ],
                        layouts: [
                            {
                                name: 'contact-edit',
                                fields: [
                                    {
                                        name: 'name'
                                    },
                                    {
                                        name: 'phone'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'phone',
                        fields: [
                            {
                                name: 'number',
                                type: 'string'
                            },
                            {
                                name: 'longDistanceCode',
                                type: 'int'
                            }
                        ],
                        layouts: [
                            {
                                name: 'phone-edit',
                                fields: [
                                    {
                                        name: 'number'
                                    },
                                    {
                                        name: 'longDistanceCode'
                                    }
                                ]
                            }
                        ]
                    }
                ],

            };

            let fields = metadataProvider.getFields(schema, 'contact', 'contact-edit');

            assert.strictEqual(fields.length, 2);
            assert.strictEqual(fields[0].name, 'name');
            assert.strictEqual(fields[0].type, 'string');
            assert.strictEqual(fields[1].name, 'phone');
            assert.strictEqual(fields[1].type, 'entity');

            assert.strictEqual(fields[1].fields.length, 2);
            assert.strictEqual(fields[1].fields[0].name, 'number');
            assert.strictEqual(fields[1].fields[0].type, 'string');
            assert.strictEqual(fields[1].fields[1].name, 'longDistanceCode');
            assert.strictEqual(fields[1].fields[1].type, 'int');
        });

        it('Should merge fields with nested layouts', function () {

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
                            }],
                        layouts: [
                            {
                                name: 'contact-edit',
                                groups: [
                                    {
                                        groups: [
                                            {
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
                                    }
                                ]
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

        it('Non-existing layout', function () {

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

        it('Basic usage', () => {
            let schema = {
                entities: [],
                layouts: []
            };
            assert.throws(() => metadataProvider.getFields(schema, 'contact', 'contact-edit'), /Could not find entity/);
        });

    });

    describe('processLayout', function () {
        it('Should merge fields', function () {

            let schema = require('./assets/metadataProviderTestData/completeWithNestedEntity');
            let layoutProcessed = metadataProvider.processLayout(schema, 'contact', 'contact-edit');

            console.logObject(layoutProcessed);

            assert.equal(layoutProcessed.fields.length, 3);
            assert.equal(layoutProcessed.fields[0].name, 'name');
            assert.equal(layoutProcessed.fields[1].name, 'date');
            assert.equal(layoutProcessed.fields[2].name, 'phone');
        });
    });
})
;
