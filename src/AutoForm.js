import React, { Component, PropTypes } from 'react'
import AutoFormInternal from './AutoFormInternal';
import metadataProvider from './lib/metadataProvider';
import reduxFormHelper from './lib/helpers/reduxFormHelper';

class AutoForm extends Component {

    render() {

        let {entity, layout} = metadataProvider.getEntityAndLayout(this.props.schema, this.props.entityName, this.props.layoutName);
        let fieldMetadata = metadataProvider.getFields(this.props.schema, entity, layout);
        let fields = reduxFormHelper.getFields(fieldMetadata);

        return <AutoFormInternal fields={fields} fieldMetadata={fieldMetadata} entity={entity} layout={layout} componentFactory={this.props.componentFactory} />
    }
}

AutoForm.propTypes = {
    componentFactory: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    entityName: PropTypes.string.isRequired,
    layoutName: PropTypes.string.isRequired
};

export default AutoForm;