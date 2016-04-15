import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form';
import metadataEvaluator from './lib/MetadataEvaluator';

class AutoFormInternal extends Component {

    render() {

        let {
            componentFactory,
            fields,
            fieldMetadata,
            layout,
            handleSubmit
        } = this.props;
        
        let model = this.props.values;

        let fieldMetadataEvaluated = metadataEvaluator.evaluate(fieldMetadata, model);
        let fieldMetadataFinal = fieldMetadataEvaluated.map(f => Object.assign({}, f, fields[f.name]));
        
        

        let groupComponent = componentFactory.buildGroupComponent({
            component: layout.component,
            layout: layout,
            fields: fieldMetadataFinal,
            componentFactory: componentFactory
        });
        
        console.log(fields);
        console.log(fieldMetadataEvaluated);
        
        if(window) {
            window.fields = fieldMetadataFinal;
        }

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