import React from 'react/addons.js';
import CodeEditor from './CodeEditor.js';
// Bootstrap
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';
import Alert from 'react-bootstrap/lib/Alert.js';
import Tabs from 'react-bootstrap/lib/Tabs.js';
import Tab from 'react-bootstrap/lib/Tab.js';

import TextBox from './editors/TextBox.js';
import Metaform from './../MetaForm.js';
import metadataProvider from '../lib/metadataProvider.js';
import CheckBox from './editors/CheckBox.js';
import Lookup from './editors/Lookup.js';
import DefaultComponentFactory from '../DefaultComponentFactory.js';
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
            autoUpdate: true,
            presets: presetsConfig,
            selectedPreset: initialPreset,
            text: presetConfig.code,
            // the selected key in the right tab
            formTabKey: 1
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
        updatedState.formTabKey = 1;
        updatedState.model = {};
        this.metaFormCache = null;
        this.setState(updatedState, () => {
            this.resetMetaform();
        });
    },

    onSelectedTabChange: function (key) {
        this.setState({formTabKey: key});
    },

    onAutoUpdateChange: function (event) {

        let setAutoupdateState = (e) => {
            let updatedState = React.addons.update(this.state, {autoUpdate: {$set: e.value}});
            this.setState(updatedState);
        };

        if (!this.state.autoUpdate) {
            // if the autoUpdate option was not checked, let's update the form before setting the autoUpdate state
            this.metaFormCache = null;
            this.forceUpdate(() => {
                this.resetMetaform(() => {
                    setAutoupdateState(event);
                });
            });
        }
        else {
            // ... otherwise, let's just change the autoupdate state
            setAutoupdateState(event);
        }
    },

    onCodeChange: function (event) {
        let updatedState = React.addons.update(this.state, {text: {$set: event.value}});
        this.setState(updatedState, () => {
            if (this.state.autoUpdate) {
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

    resetMetaform: function (next) {
        if (this.refs.mf) {
            this.refs.mf.resetState(next);
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
                    <h2>React-metaform demo v0.2.8</h2>
                </div>
                <div className="col-md-5">

                    <div className='row'>
                        <div className="col-md-12">
                            <span className="pull-right">Check the <a target="blank"
                                                                      href="https://github.com/gearz-lab/react-metaform/blob/master/docs-md/Documentation.md#metadata">metadata
                                documentation</a>.</span>
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
                        value={this.state.text ? this.state.text : ''}
                        />


                </div>
                <div className="col-md-7">

                    <Tabs activeKey={this.state.formTabKey} onSelect={this.onSelectedTabChange} animation={false}>
                        <Tab eventKey={1} title="Form">

                            <div className="tab-wrapper">

                                <div className="row">
                                    <div className="col-md-5">
                                        <Button onClick={this.onUpdateClick}
                                                disabled={this.state.autoUpdate}><Glyphicon
                                            glyph="refresh"/><span style={{marginLeft:6}}>Update form</span></Button>

                                    </div>
                                    <div className="col-md-7">
                                        <span className="pull-right">
<CheckBox name="toggle-auto-update" displayName="Auto update form (toggle off if you experience errors)"
          onChange={this.onAutoUpdateChange}
          value={this.state.autoUpdate}/>
                                        </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="live-schema-editor-mount-node">
                                            {this.buildMetaform()}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Tab>
                        <Tab eventKey={2} title="Model">
                            <div className="tab-wrapper">

                                <CodeEditor
                                    displayName="Model preview (read-only)"
                                    name="model_preview"
                                    readOnly={true}
                                    value={this.state.model ? JSON.stringify(this.state.model, null, 2) : ''}
                                    />
                            </div>

                        </Tab>
                    </Tabs>


                </div>
            </div>
        </div>;
    }
});

export default LiveSchemaEditor;
