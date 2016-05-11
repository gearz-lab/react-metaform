import React, {Component, PropTypes} from 'react'
import {reduxForm} from 'redux-form';
import metadataEvaluator from './lib/metadataEvaluator';
import perf from 'react-addons-perf';
import { ButtonToolbar, Button } from 'react-bootstrap';


class AutoFormInternal extends Component {

    render() {

        let {
            componentFactory,
            fields,
            fieldMetadata,
            layout,
            handleSubmit,
            submitting
        } = this.props;

        let model = this.props.values;
        let fieldMetadataEvaluated = metadataEvaluator.evaluate(fieldMetadata, model, '', fields);

        let groupComponent = componentFactory.buildGroupComponent({
            component: layout.component,
            layout: layout,
            fields: fieldMetadataEvaluated,
            componentFactory: componentFactory
        });

        // <button type="submit" disabled={submitting}>
        //     {submitting ? <i/> : <i/>} Submit
        // </button>

        return (
            <div className="meta-form">
                <form onSubmit={handleSubmit}>
                    { groupComponent }
                    <ButtonToolbar>
                        <Button type="submit" bsStyle="primary" disabled={submitting}>Submit</Button>
                        <Button disabled={submitting}>Cancel</Button>
                    </ButtonToolbar>
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