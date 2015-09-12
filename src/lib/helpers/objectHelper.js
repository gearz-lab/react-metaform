import _ from 'underscore';
class ObjectHelper {

    /**
     * Evaluates the given expression for the given object. Returns the given defaultValue if there's an error
     * @param expression
     * @param object
     * @param defaultValue
     * @returns {*}
     */
    safeRead(expression, object, defaultValue) {
        try {
            return expression(object);
        }
        catch(ex) {
            return defaultValue;
        }
    }

    /**
     * Sets a value on the given path starting from model
     * @param model
     * @param path
     * @param val
     */
    setValue(model, path, val) {
        var fields = path.split('.');
        var result = model;
        for (var i = 0, n = fields.length; i < n && result !== undefined; i++) {
            var field = fields[i];
            if (i === n - 1) {
                result[field] = val;
            } else {
                if (typeof result[field] === 'undefined' || !_.isObject(result[field])) {
                    result[field] = {};
                }
                result = result[field];
            }
        }
    }
}

export default new ObjectHelper();