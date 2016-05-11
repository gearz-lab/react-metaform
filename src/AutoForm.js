import React, { Component, PropTypes } from 'react'
import AutoFormInternal from './AutoFormInternal';
import metadataProvider from './lib/metadataProvider';
import metadataValidator from './lib/metadataValidator';

class AutoForm extends Component {

    render() {

        let {
            schema,
            entityName,
            layoutName,
            componentFactory,
            onSubmit,
            onSubmitFail,
            onSubmitSuccess
        } = this.props;

        let {entity, layout} = metadataProvider.getEntityAndLayout(schema, entityName, layoutName);
        let fieldMetadata = metadataProvider.getFields(schema, entity, layout, f => {
            f.componentFactory = componentFactory;
        });
        let fields = metadataProvider.getReduxFormFields(fieldMetadata);
        let validate = (values) => {
            return metadataValidator.validate(fieldMetadata, values) || {};
        }

        return <AutoFormInternal
            fields={fields}
            fieldMetadata={fieldMetadata}
            entity={entity}
            layout={layout}
            validate={validate}
            componentFactory={componentFactory}
            onSubmit={onSubmit}
            onSubmitSuccess={onSubmitSuccess}
            onSubmitFail={onSubmitFail}
            />
    }

}

AutoForm.propTypes = {
    componentFactory: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    entityName: PropTypes.string.isRequired,
    layoutName: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitSuccess: PropTypes.func,
    onSubmitFail: PropTypes.func
};

export default AutoForm;