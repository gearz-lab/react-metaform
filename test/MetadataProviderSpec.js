import chai from 'chai';
import metadataProvider from '../src/lib/metadataProvider.js';
const assert = chai.assert;

describe('MetadataProvider', function() {

    describe('getFields', function() {

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
                        ]
                    },
                    {
                      name: 'phone',
                      fields: [
                          {
                              name: 'number',
                              type: 'string'
                          }
                      ]
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
                    },
                    {
                        name: 'phone-edit',
                        fields: [
                            {
                                name: 'number'
                            }
                        ]
                    }
                ]
            };

            let fields = metadataProvider.getFields(schema, 'contact', 'contact-edit');

            assert.strictEqual(fields.length, 2);
            assert.strictEqual(fields[0].name, 'name');
            assert.strictEqual(fields[0].type, 'string');
            assert.strictEqual(fields[1].name, 'phone.number');
            assert.strictEqual(fields[1].type, 'string');
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
                            }
                        ]
                    }
                ],
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
                layouts: [
                ]
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

});
