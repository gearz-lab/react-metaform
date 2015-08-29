export default {
    entities: [{
        "name": "contact",
        "fields": [{
            "name": "type",
            "type": "string",
            "displayName": "Type",
            "component": "lookup",
            "options": [{
                "value": "one",
                "text": "Person"
            }, {
                "value": "two",
                "text": "Company"
            }]
        }, {
            "name": "name",
            "type": "string",
            "displayName": "Name"
        }, {
            "name": "date",
            "type": "date",
            "displayName": "Date or birth"
        }],
        layouts: [
            {
                name: "contact-edit",
                groups: [
                    {
                        rows: [
                            {
                                fields: [
                                    {name: "name"}
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }]
};