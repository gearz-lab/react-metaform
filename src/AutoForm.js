import React, { Component, PropTypes } from 'react'
import AutoFormInternal from './AutoFormInternal';
import metadataProvider from './lib/metadataProvider';

class AutoForm extends Component {

    render() {
        
        let {entity, layout} = metadataProvider.getEntityAndLayout(this.props.schema, this.props.entityName, this.props.layoutName);
        let componentFactory = this.props.componentFactory;
        let fieldMetadata = metadataProvider.getFields(this.props.schema, entity, layout, f => {
            f.componentFactory = componentFactory;
        });
        let fields = metadataProvider.getReduxFormFields(fieldMetadata);

        return <AutoFormInternal fields={fields} fieldMetadata={fieldMetadata} entity={entity} layout={layout} componentFactory={componentFactory} />
    }
    
}

AutoForm.propTypes = {
    componentFactory: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    entityName: PropTypes.string.isRequired,
    layoutName: PropTypes.string.isRequired
};

export default AutoForm;