export default {
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
                    entityName: 'phone',
                    displayName: 'Phone'
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
};