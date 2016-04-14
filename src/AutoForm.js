import React, { Component, PropTypes } from 'react'
import AutoFormInternal from './AutoFormInternal';

class AutoForm extends Component {

    render() {
        return <AutoFormInternal componentFactory={this.props.componentFactory} />
    }
}

AutoForm.propTypes = {
    componentFactory: PropTypes.object.isRequired,
    schema: PropTypes.object.isRequired,
    entityName: PropTypes.string.isRequired
};

export default AutoForm;