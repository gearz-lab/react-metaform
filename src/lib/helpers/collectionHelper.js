import _ from 'underscore';
class CollectionHelper {

    /**
     * Converts the given array into an object, using the given key property
     * @param array
     * @param key
     * @returns {Object}
     */
    toObject(array, key) {
        if(!key) {
            key = 'name';
        }
        return _.object(_.map(array, function(item) {
                return [item[key], item]
            }));
    }
}

export default new CollectionHelper();