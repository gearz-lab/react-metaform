import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form';



class AutoFormInternal extends Component {

    render() {
        const {
            fields: { firstName, lastName, email, sex, favoriteColor, employed, notes },
            handleSubmit,
            resetForm,
            submitting,
            metadata,
            componentFactory
        } = this.props;

        return (<form onSubmit={handleSubmit}>
                {
                    this.props.fieldMetadata.map((f, i) => {
                        
                        let fieldProps = Object.assign(f, this.props.fields[f.name]);
                        return this.props.componentFactory.buildFieldComponent(fieldProps)
                    })
                }
            </form>
        )
    }
}

AutoFormInternal.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    componentFactory: PropTypes.object.isRequired
};

export default reduxForm({
    form: 'simple'
})(AutoFormInternal);