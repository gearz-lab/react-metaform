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
                    entityName: 'phone'
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
                    name: 'date'
                },
                {
                    name: 'phone',
                    layout: 'phone-edit'
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