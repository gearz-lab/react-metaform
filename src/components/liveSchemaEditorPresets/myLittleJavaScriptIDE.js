export default
{
    "entities": [{
        "name": "code",
        "fields": [{
            "name": "filename",
            "type": "string",
            "displayName": "File name"
        }, {
            "name": "code",
            "type": "string",
            "displayName": "Code",
            "component": "codeeditor",
            "height": "200px",
            "mode": "javascript"
        }]
    }],
    "layouts": [{
        "name": "code-edit",
        "fields": [{
            "name": "filename"
        }, {
            "name": "code"
        }]
    }]
}