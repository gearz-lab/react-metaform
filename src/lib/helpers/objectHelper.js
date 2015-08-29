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
}

export default new ObjectHelper();