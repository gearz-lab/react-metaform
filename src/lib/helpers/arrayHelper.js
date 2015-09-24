class ArrayHelper {
    move(array, old_index, new_index) {
        if (new_index >= array.length) {
            new_index = array.length - 1;
        }
        array.splice(new_index, 0, array.splice(old_index, 1)[0]);
        return array;
    }
}

export default new ArrayHelper();