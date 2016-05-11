import React, { Component, PropTypes } from 'react'
import AutoFormInternal from './AutoFormInternal';
import metadataProvider from './lib/metadataProvider';
import metadataValidator from './lib/metadataValidator';

class AutoForm extends Component {

    render() {

        let {entity, layout} = metadataProvider.getEntityAndLayout(this.props.schema, this.props.entityName, this.props.layoutName);
        let componentFactory = this.props.componentFactory;
        let fieldMetadata = metadataProvider.getFields(this.props.schema, entity, layout, f => {
            f.componentFactory = componentFactory;
        });
        let fields = metadataProvider.getReduxFormFields(fieldMetadata);
        let validate = (values) => {
            return metadataValidator.validate(fieldMetadata, values);
        }

        return <AutoFormInternal
            fields={fields}
            fieldMetadata={fieldMetadata}
            entity={entity}
            layout={layout}
            validate={validate}
            componentFactory={componentFactory}
            onSubmit={(values) => console.log(arguments)}
            onSubmitSuccess={() => console.log('submit success')}
            onSubmitFail={() => console.log('submit fail')}
             />
    }

}

AutoForm.propTypes = {
    componentFactory: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    entityName: PropTypes.string.isRequired,
    layoutName: PropTypes.string.isRequired
};

export default AutoForm;