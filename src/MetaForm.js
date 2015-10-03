import React from 'react';
import Alert from 'react-bootstrap/lib/Alert.js';
import MetaFormGroup from './components/groupComponents/MetaFormGroup.js';
import metadataProvider from './lib/metadataProvider.js';
import MetaFormStateManager from './components/MetaFormStateManager.js';
import Button from 'react-bootstrap/lib/Button.js';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar.js';
import ValidationSummary from './components/ValidationSummary.js';
import objectHelper from './lib/helpers/objectHelper.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';

import _ from 'underscore';

var MetaForm = React.createClass({

    propTypes: {
        title: React.PropTypes.string,
        schema: React.PropTypes.object.isRequired,
        entityName: React.PropTypes.string.isRequired,
        layoutName: React.PropTypes.string.isRequired,
        fields: React.PropTypes.object,
        componentFactory: React.PropTypes.object.isRequired,
        model: React.PropTypes.object,
        showBottomBar: React.PropTypes.bool,
        // the onSave handler receives the model as a parameter
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        onModelChange: React.PropTypes.func
    },

    getInitialState: function () {
        let model = this.props.model ? this.props.model : {};

        try {
            this.metaformStateManager = new MetaFormStateManager(
                this.props.schema,
                this.props.entityName,
                this.props.layoutName,
                model,
                () => this.state,
                (state) => this.setState(state),
                (model) => this.handleModelChange(model),
                this.props.componentFactory
            );

            return this.metaformStateManager.getInitialState();
        }
        catch (ex) {
            return {
                error: ex
            }
        }
    },

    componentWillReceiveProps: function (nextProps) {
        // I'm not sure if this is the best approach. But what I'm looking for here is to find
        // a way to update the state.componentProps when the MetaForm is rendered with a different model
        if(!this.state.error) {
            if (nextProps.model) {
                this.metaformStateManager.updateComponentProps(nextProps.model);
            }
        }
    },

    resetState: function (next) {
        let newState;
        try {
            newState = this.getInitialState();
        }
        catch(ex) {
            newState = { error: ex };
        }
        this.replaceState(newState, next);
    },


    handleValidationSummaryDismiss: function () {
        let newState = _.extend({}, this.state);
        newState.validationSummary.open = false;
        this.setState(newState);
    },

    handleModelChange: function (model) {
        if (this.props.onModelChange) {
            this.props.onModelChange(model);
        }
    },

    /**
     * Handles the save button
     */
    handleSave: function () {
        if (this.state.validationSummary.messages.length) {
            // if the validation summary has any message, the 'save' button won't
            // do anything. Actually the 'handleSave' method shouldn't even
            // be called in this case, but anyways...
            return;
        }
        if (this.props.onSave) {
            this.props.onSave(this.state.model);
        }
    },

    /**
     * Handles the cancel button
     */
    handleCancel: function () {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    },

    render: function () {
        // the model is cloned for security reasons, to make it hard for the components to
        // interfere with the MetaForm model. It could even be cloned once per property,
        // but that would impact performance.
        let _this = this;

        let title = null;
        if (this.props.title) {
            title = <div>
                <h3>{_this.props.title}</h3>

            </div>;
        }

        if(this.state.error) {
            return <Alert bsStyle='danger'>
                <h4>Oh snap! The schema is not valid.</h4>
                <p>Detailed information:
                    <b>{this.state.error}</b>
                </p>
            </Alert>
        }

        let bottomBar = null;
        if (this.props.showBottomBar === undefined || this.props.showBottomBar === true) {
            bottomBar = <div>
                <ValidationSummary open={_this.state.validationSummary.open}
                                   messages={_this.state.validationSummary.messages}
                                   onDismiss={_this.handleValidationSummaryDismiss}/>

                <div className='meta-form-bottom-bar'>
                    <ButtonToolbar className='pull-right'>
                        <Button bsStyle='danger' onClick={_this.handleSave}><Glyphicon glyph="floppy-disk"/><span
                            className="glyphicon-text">Save</span></Button>
                        <Button onClick={_this.handleCancel}>Cancel</Button>
                    </ButtonToolbar>
                </div>
            </div>;
        }

        let groupComponent = this.props.componentFactory.buildGroupComponent({
            component: this.state.layout.component,
            layout: this.state.layout,
            fields: this.state.componentProps,
            componentFactory: this.props.componentFactory
        });

        return (
            <div className="meta-form">
                {title}
                {groupComponent}
                {bottomBar}
            </div>
        );
    }
});

export default MetaForm;
