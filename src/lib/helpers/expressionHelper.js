import formato from 'formato';

/**
 * Utility class for expressions
 */
class ExpressionHelper {
    format() {
        return formato.format(...arguments);
    }

    unformat() {
        return formato.unformat(...arguments);
    }
}

export default new ExpressionHelper();