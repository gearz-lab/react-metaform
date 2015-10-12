export default {
    entities: [
        {
            name: "schema",
            fields: [
                {
                    name: "entities",
                    displayName: "Entities",
                    type: "array",
                    arrayType: "entity",
                    entityType: "entity",
                    layoutName: "entity-edit"
                }
            ],
            layouts: [
                {
                    name: "schema-edit",
                    fields: [
                        {
                            name: "entities"
                        }
                    ]
                }
            ]
        },
        {
            name: "entity",
            fields: [
                {
                    name: "name",
                    type: "string",
                    displayName: "Name"

                },
                {
                    name: "fields",
                    displayName: "Fields",
                    type: "array",
                    arrayType: "entity",
                    entityType: "field",
                    layoutName: "field-edit",
                    addText: "Add field",
                    component: "ArrayGridContainer",
                    _itemDisplayName: m => `${m.name} (${m.type})`
                }
            ],
            layouts: [{
                name: "entity-edit",
                title: "Entity",
                fields: [
                    {
                        name: "name"
                    },
                    {
                        name: "fields"
                    }
                ]
            }]
        },
        {
            name: "field",
            fields: [
                // basic fields
                {
                    name: "name",
                    type: "string",
                    displayName: "Name"
                },
                {
                    name: "displayName",
                    type: "string",
                    displayName: "Display name"
                },
                {
                    name: "type",
                    type: "string",
                    displayName: "Type",
                    component: "Lookup",
                    options: [
                        {
                            value: "string",
                            text: "String"
                        },
                        {
                            value: "int",
                            text: "Integer"
                        },
                        {
                            value: "float",
                            text: "Float"
                        },
                        {
                            value: "bool",
                            text: "Boolean"
                        },
                        {
                            value: "date",
                            text: "Date"
                        },
                        {
                            value: "entity",
                            text: "Entity"
                        },
                        {
                            value: "array",
                            text: "Array"
                        }
                    ]
                },
                // Other fields
                {
                    name: "addonBefore",
                    displayName: "addonBefore",
                    type: "string"
                }
            ],
            layouts: [{
                name: "field-edit",
                title: "Field",
                groups: [
                    {
                        orientation: "horizontal",
                        fields: [
                            {
                                name: "name"
                            },
                            {
                                name: "displayName"
                            },
                            {
                                name: "type"
                            }
                        ]
                    },
                    {
                        title: "Other metadata",
                        component: "SelectiveMetaFormGroup",
                        fields: [
                            {
                                name: "addonBefore"
                            }
                        ]
                    }
                ]
            }]
        }
    ]
};