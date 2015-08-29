class DataEvaluator {

    evaluate(metadata, model) {
        if(!model) {
            return undefined;
        }
        if(model.hasOwnProperty(metadata.name)) {
            return model[metadata.name];
        }
        return undefined;
    }

    setValue(value, metadata, model) {
        if(model && metadata) {
            model[metadata.name] = value;
        }
    }
}

export default new DataEvaluator();