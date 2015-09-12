export default
{
    "entities": [
        {
            "name": "contact",
            "fields": [
                {
                    "name": "type",
                    "type": "string",
                    "displayName": "Type",
                    "component": "lookup",
                    "options": [
                        {
                            "value": "one",
                            "text": "Person"
                        },
                        {
                            "value": "two",
                            "text": "Company"
                        }
                    ]
                },
                {
                    "name": "name",
                    "type": "string",
                    "displayName": "Name"
                },
                {
                    "name": "date",
                    "type": "date",
                    "displayName": "Date or birth"
                },
                {
                    "name": "phone",
                    "type": "array",
                    "arrayType": "entity",
                    "entityName": "phone",
                    "layoutName": "phone-edit"
                }
            ],
            "layouts": [{
                "name": "contact-edit",
                "title": "Contact information",
                "orientation": "vertical",
                "groups": [
                    {
                        "fields": [
                            {
                                "name": "type"
                            },
                            {
                                "name": "name"
                            },
                            {
                                "name": "date"
                            },
                            {
                                "name": "phone"
                            }]
                    }
                ]
            }]
        },
        {
            name: "phone",
            fields: [
                {
                    name: "longDistanceCode",
                    type: "string",
                    displayName: "Long distance code"
                },
                {
                    name: 'number',
                    type: 'string',
                    displayName: 'Number'
                }
            ],
            layouts: [
                {
                    name: 'phone-edit',
                    fields: [
                        {
                            name: 'longDistanceCode'
                        },
                        {
                            name: 'number'
                        }
                    ]
                }
            ]
        }
    ]
}