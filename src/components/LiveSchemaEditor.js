import React from 'react/addons.js';
import CodeEditor from './editors/CodeEditor.js';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';
import TextBox from './editors/TextBox.js';
import Metaform from './MetaForm.js';
import metadataProvider from '../lib/metadataProvider.js';
import Alert from 'react-bootstrap/lib/Alert.js';
import CheckBox from './editors/CheckBox.js';
import Lookup from './editors/Lookup.js';
import DefaultComponentFactory from '../lib/DefaultComponentFactory.js';
import liveSchemaEditorPresetProvider from './LiveSchemaEditorPresetProvider.js';
import _ from 'underscore';

let presetsConfig = liveSchemaEditorPresetProvider.getPresets();
const LiveSchemaEditor = React.createClass({

    getInitialState: function () {
        let initialPreset = 'textbox';
        let presetConfig = _.find(presetsConfig, p => p.value == initialPreset);
        if (!presetConfig) {
            throw Error(`Could not find the given preset`);
        }

        return {
            schema: {},
            entityName: presetConfig.entityName,
            layoutName: presetConfig.layoutName,
            model: {},
            title: presetConfig.title,
            autoUpdate: false,
            presets: presetsConfig,
            selectedPreset: initialPreset,
            text: presetConfig.code
        };
    },

    onPresetChange: function (event) {
        let preset = event.value;
        let updatedState;
        if (!preset) {
            updatedState = React.addons.update(this.state, {selectedPreset: {$set: preset}});
            this.setState(updatedState);
            return;
        }
        let presetConfig = _.find(presetsConfig, p => p.value == preset);
        if (!presetConfig) {
            throw new Error(`Could not find the given preset`);
        }
        updatedState = _.extend({}, this.state);
        updatedState.selectedPreset = preset;
        updatedState.title = presetConfig.title;
        updatedState.entityName = presetConfig.entityName;
        updatedState.layoutName = presetConfig.layoutName;
        updatedState.text = presetConfig.code;
        this.metaFormCache = null;
        this.setState(updatedState, () => {
            this.resetMetaform();
        });
    },

    onAutoUpdateChange: function (event) {
        let updatedState = React.addons.update(this.state, {autoUpdate: {$set: event.value}});
        this.setState(updatedState);
    },

    onCodeChange: function (event) {
        let updatedState = React.addons.update(this.state, {text: {$set: event.value}});
        this.setState(updatedState, () => {
            if(this.state.autoUpdate) {
                this.resetMetaform();
            }
        });
    },

    onMainEntityNameChanged: function (event) {
        let updatedState = React.addons.update(this.state, {entityName: {$set: event.value}});
        this.setState(updatedState);
    },

    onMainLayoutNameChanged: function (event) {
        let updatedState = React.addons.update(this.state, {layoutName: {$set: event.value}});
        this.setState(updatedState);
    },

    onFormTitleChanged: function (event) {
        let updatedState = React.addons.update(this.state, {title: {$set: event.value}});
        this.setState(updatedState);
    },

    onUpdateClick: function () {
        this.metaFormCache = null;
        this.forceUpdate(() => this.resetMetaform());
    },

    resetMetaform: function () {
        if (this.refs.mf) {
            this.refs.mf.resetState();
        }
    },

    /**
     * Returns the schema object based on the text
     */
    buildMetaform: function () {

        try {

            if (this.state.autoUpdate || !this.metaFormCache) {

                let schema = eval('(' + this.state.text + ')');

                // the only reason why I'm getting this here, is so it's going to trigger an exception
                // when the entityName and/or the layoutName is not valid
                let schemaAndLayout = metadataProvider.getEntityAndLayout(schema, this.state.entityName, this.state.layoutName);

                let metaForm = <Metaform
                    schema={schema}
                    ref="mf"
                    entityName={this.state.entityName}
                    layoutName={this.state.layoutName}
                    componentFactory={DefaultComponentFactory}
                    model={this.state.model}
                    title={this.state.title}
                    schema={schema}
                    entityName={this.state.entityName}
                    layoutName={this.state.layoutName}
                    />;
                this.metaFormCache = metaForm;
                return metaForm;
            }
            else {
                return this.metaFormCache;
            }

        }
        catch (ex) {
            return <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
                <h4>Oh snap! The schema is not valid.</h4>

                <p>Detailed information: <b>{ex.message}</b></p>

                <p>
                    <span>Change the schema</span>
                    <span> or </span>
                    <Button onClick={() => this.forceUpdate()}>try again</Button>
                </p>
            </Alert>
        }
    },

    render: function () {
        let _this = this;
        return <div className="live-schema-editor">
            <div className='row'>
                <div className="col-md-12">
                    <h2>React-metaform demo</h2>
                </div>
                <div className="col-md-5">

                    <div className='row'>
                        <div className="col-md-12">
                            <span className="pull-right">Check the <a target="blank" href="https://github.com/gearz-lab/react-metaform/blob/master/docs-md/Metadata.md">metadata documentation</a>.</span>
                            <Lookup name="presets" displayName="Presets" options={this.state.presets}
                                    onChange={this.onPresetChange} value={this.state.selectedPreset}/>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <TextBox displayName="Main entity name" value={this.state.entityName}
                                     onChange={this.onMainEntityNameChanged}/>
                        </div>
                        <div className="col-md-6">
                            <TextBox displayName="Main layout name" value={this.state.layoutName}
                                     onChange={this.onMainLayoutNameChanged}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <TextBox displayName="Form title" value={this.state.title}
                                     onChange={this.onFormTitleChanged}/>
                        </div>
                    </div>

                    <CodeEditor
                        displayName="Schema"
                        onChange={this.onCodeChange}
                        name="liveSchemaEditor"
                        value={this.state.text}
                        />

                    <div className="row">
                        <div className="col-md-7">
                            <CheckBox name="toggle-auto-update" displayName="Auto update form"
                                      onChange={this.onAutoUpdateChange}
                                      value={this.state.autoUpdate}/>
                        </div>
                        <div className="col-md-5">
                            <span className="pull-right">
                                <Button onClick={this.onUpdateClick} disabled={this.state.autoUpdate}><Glyphicon glyph="refresh" /><span style={{marginLeft:6}}>Update form</span></Button>
                            </span>
                        </div>
                    </div>

                </div>
                <div className="col-md-7">
                    <div className="live-schema-editor-mount-node">
                        {this.buildMetaform()}
                    </div>
                </div>
            </div>
        </div>;
    }
});

export default LiveSchemaEditor;
