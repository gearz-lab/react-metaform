import React from 'react';
import MetaFormGroup from './MetaFormGroup.js';
import metadataProvider from '../lib/metadataProvider.js';
import MetaFormStateManager from './MetaFormStateManager.js';
import Button from 'react-bootstrap/lib/Button.js';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar.js';
import ValidationSummary from './ValidationSummary.js';
import objectHelper from '../lib/helpers/objectHelper.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';
import _ from 'underscore';

var MetaForm = React.createClass({

    propTypes: {
        title: React.PropTypes.string,
        schema: React.PropTypes.object.isRequired,
        entityName: React.PropTypes.string.isRequired,
        layoutName: React.PropTypes.string.isRequired,
        fields: React.PropTypes.object,
        model: React.PropTypes.object,
        showBottomBar: React.PropTypes.bool,
        // the onSave handler receives the model as a parameter
        onSave: React.PropTypes.func
    },

    getInitialState: function () {
        let model = this.props.model ? this.props.model : {};

        this.metaformStateManager = new MetaFormStateManager(
            this.props.schema,
            this.props.entityName,
            this.props.layoutName,
            model,
            () => this.state,
            (state) => this.setState(state));

        return this.metaformStateManager.getInitialState();
    },

    resetState: function () {
        this.replaceState(this.getInitialState());
    },


    handleValidationSummaryDismiss: function () {
        let newState = _.extend({}, this.state);
        newState.validationSummary.open = false;
        this.setState(newState);
    },

    /**
     * Handles the save button
     */
    handleSave: function() {
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

        let bottomBar = null;
        if (this.props.showBottomBar === undefined || this.props.showBottomBar === true) {
            bottomBar = <div>
                <ValidationSummary open={_this.state.validationSummary.open}
                                   messages={_this.state.validationSummary.messages}
                                   onDismiss={_this.handleValidationSummaryDismiss}/>

                <div className='meta-form-bottom-bar'>
                    <ButtonToolbar className='pull-right'>
                        <Button bsStyle='danger' onClick={_this.handleSave}><Glyphicon glyph="floppy-disk" /><span style={{marginLeft:6}}>Save</span></Button>
                        <Button>Cancel</Button>
                    </ButtonToolbar>
                </div>
            </div>;
        }

        return (
            <div className="meta-form">
                {title}
                <MetaFormGroup layout={this.state.layout} componentProps={_this.state.componentProps}/>
                {bottomBar}
            </div>
        );
    }
});

export default MetaForm;
