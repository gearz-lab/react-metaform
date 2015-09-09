class ConsoleHelper {

    /**
     * Logs a string
     * @param message
     */
    log(message) {
        console.log(message);
    }

    /**
     * Logs an object
     * @param object
     */
    logObject(object) {
        console.log(JSON.stringify(object, null, 4));
    }
}

export default new ConsoleHelper();