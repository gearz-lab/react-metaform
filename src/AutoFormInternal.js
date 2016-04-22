import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form';
import metadataEvaluator from './lib/metadataEvaluator';
import perf from 'react-addons-perf';

class AutoFormInternal extends Component {

    render() {

        let {
            componentFactory,
            fields,
            fieldMetadata,
            layout,
            handleSubmit
        } = this.props;
        
        let date = new Date().getTime();
        //perf.start();
        let model = this.props.values;
        let fieldMetadataEvaluated = metadataEvaluator.evaluate(fieldMetadata, model, '', fields);
     
        let groupComponent = componentFactory.buildGroupComponent({
            component: layout.component,
            layout: layout,
            fields: fieldMetadataEvaluated,
            componentFactory: componentFactory
        });
        let diff = new Date().getTime() - date;
        console.log(diff);
        //perf.stop();
        //let measurements = perf.getLastMeasurements();
        //perf.printInclusive(measurements);

        return (
            <div className="meta-form">
                <form onSubmit={handleSubmit}>
                    { groupComponent }
                </form>
            </div>
        )
    }
}

AutoFormInternal.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    componentFactory: PropTypes.object.isRequired,
    entity: PropTypes.object.isRequired,
    layout: PropTypes.object
};

export default reduxForm({
    form: 'simple'
})(AutoFormInternal);