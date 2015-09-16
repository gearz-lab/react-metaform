MetaFormStateManager
===

Manages the state of the MetaForm. The only reason why this class is separate is so it's easier to test, without dealing
with markup.

constructor
---

getInitialState
---

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

Example output:

    {
        "validationSummary": {
            "open": false,
            "messages": []
        },
        "fields": [
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
                "displayName": "Phone",
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
                        ],
                        "componentProps": {
                            "longDistanceCode": {
                                "name": "longDistanceCode",
                                "type": "int",
                                "key": "phone.carrier.longDistanceCode"
                            }
                        }
                    }
                ]
            }
        ],
        "entity": {
            "name": "contact",
            "fields": [
                {
                    "name": "name",
                    "type": "string",
                    "displayName": "Name"
                },
                {
                    "name": "date",
                    "type": "date",
                    "displayName": "Date"
                },
                {
                    "name": "phone",
                    "type": "entity",
                    "entityName": "phone",
                    "displayName": "Phone"
                }
            ],
            "layouts": [
                {
                    "name": "contact-edit",
                    "fields": [
                        {
                            "name": "name"
                        },
                        {
                            "name": "date"
                        },
                        {
                            "name": "phone",
                            "layoutName": "phone-edit"
                        }
                    ]
                }
            ]
        },
        "layout": {
            "name": "contact-edit",
            "fields": [
                {
                    "name": "name"
                },
                {
                    "name": "date"
                },
                {
                    "name": "phone",
                    "layoutName": "phone-edit"
                }
            ]
        },
        "model": {},
        "componentProps": {
            "name": {
                "name": "name",
                "type": "string",
                "displayName": "Name",
                "key": "name"
            },
            "date": {
                "name": "date",
                "type": "date",
                "displayName": "Date",
                "key": "date"
            },
            "phone": {
                "name": "phone",
                "type": "entity",
                "entityName": "phone",
                "displayName": "Phone",
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
                        ],
                        "componentProps": {
                            "longDistanceCode": {
                                "name": "longDistanceCode",
                                "type": "int",
                                "key": "phone.carrier.longDistanceCode"
                            }
                        }
                    }
                ],
                "componentProps": {
                    "number": {
                        "name": "number",
                        "type": "string",
                        "key": "phone.number"
                    },
                    "carrier": {
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
                        ],
                        "componentProps": {
                            "longDistanceCode": {
                                "name": "longDistanceCode",
                                "type": "int",
                                "key": "phone.carrier.longDistanceCode"
                            }
                        }
                    }
                }
            }
        }
    }