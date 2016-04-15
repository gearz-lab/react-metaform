export default {
    getFields(fields) {
        if (!fields) throw Error('\'fields\' should be truthy');
        return fields.map(f => {
           return f.name;
        });
    }
}