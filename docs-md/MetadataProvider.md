<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [MetadataProvider
](#metadataprovider)
  - [getFields(schema, entity, layout)
](#getfieldsschema-entity-layout)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

MetadataProvider
===

Processes metadata

getFields(schema, entity, layout)
---

Gets the processed metadata for the given `entity` and `layout` considering the given `schema`.

Processing:

    - Adds a `key` property to each field. The `key` is hierarchical, meaning a property called `number` on a property called `phone` will have the key `phone.number`.

Example schema:

    {
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
                    },
                    {
                        name: 'phone',
                        type: 'entity',
                        entityName: 'phone'
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
                                name: 'date'
                            },
                            {
                                name: 'phone',
                                layoutName: 'phone-edit'
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
                        name: 'carrier',
                        type: 'entity',
                        entityName: 'carrier'
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
                                name: 'carrier',
                                layoutName: 'carrier-edit'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'carrier',
                fields: [
                    {
                        name: 'longDistanceCode',
                        type: 'int'
                    }
                ],
                layouts: [
                    {
                        name: 'carrier-edit',
                        fields: [
                            {
                                name: 'longDistanceCode'
                            }
                        ]
                    }
                ]
            }
        ]
    }
    
Example output for `getFields(schema, 'contact', 'contact-edit')`:

    [
        {
            "name": "name",
            "type": "string",
            "displayName": "Name",
            "key": "name"
        },
        {
            "name": "date",
            "type": "date",
            "displayName": "Date",
            "key": "date"
        },
        {
            "name": "phone",
            "type": "entity",
            "entityName": "phone",
            "layoutName": "phone-edit",
            "key": "phone",
            "layout": {
                "fields": [
                    {
                        "name": "number"
                    },
                    {
                        "name": "carrier"
                    }
                ]
            },
            "fields": [
                {
                    "name": "number",
                    "type": "string",
                    "key": "phone.number"
                },
                {
                    "name": "carrier",
                    "type": "entity",
                    "entityName": "carrier",
                    "layoutName": "carrier-edit",
                    "key": "phone.carrier",
                    "layout": {
                        "fields": [
                            {
                                "name": "longDistanceCode"
                            }
                        ]
                    },
                    "fields": [
                        {
                            "name": "longDistanceCode",
                            "type": "int",
                            "key": "phone.carrier.longDistanceCode"
                        }
                    ]
                }
            ]
        }
    ]