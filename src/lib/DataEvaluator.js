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

}

export default new DataEvaluator();