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
import JsBeautify from 'js-beautify';

import _ from 'underscore';

let jsBeautify = JsBeautify.js_beautify;

// presets
let presetsConfig = [];
// basic
import basic from './liveSchemaEditorPresets/basic.js';
presetsConfig.push({value: 'basic', text: 'Basic', title:'Edit contact', entityName:'contact', layoutName: 'contact-edit', code: jsBeautify(JSON.stringify(basic)) });
// myLittleIde
import myLittleIde from './liveSchemaEditorPresets/myLittleJavaScriptIDE.js';
presetsConfig.push({value: 'myLittleIde', text: 'My Little JavaScript IDE', title:'My Little JavaScript IDE', entityName:'code', layoutName: 'code-edit', code: jsBeautify(JSON.stringify(myLittleIde)) });



const LiveSchemaEditor = React.createClass({

    getInitialState: function() {
        let initialPreset = 'basic';
        let presetConfig = _.find(presetsConfig, p => p.value == initialPreset);
        if(!presetConfig) {
            throw new Error(`Could not find the given preset`);
        }
        return {
              schema: {},
              entityName: presetConfig.entityName,
              layoutName: presetConfig.layoutName,
              model: {},
              title: presetConfig.title,
              autoUpdateMetaform: true,
              presets: presetsConfig,
              selectedPreset: 'basic',
              text: presetConfig.code
            };
    },

    onPresetChange: function(event) {
        let preset = event.value;
        let updatedState;
        if(!preset) {
            updatedState = React.addons.update(this.state, { selectedPreset: {$set: preset} });
            this.setState(updatedState);
            return;
        }
        let presetConfig = _.find(presetsConfig, p => p.value == preset);
        if(!presetConfig) {
            throw new Error(`Could not find the given preset`);
        }
        updatedState = _.extend({}, this.state);
        updatedState.selectedPreset = preset;
        updatedState.title = presetConfig.title;
        updatedState.entityName = presetConfig.entityName;
        updatedState.layoutName = presetConfig.layoutName;
        updatedState.text = presetConfig.code;
        this.setState(updatedState, () => { this.resetMetaform(); });
    },

    onCodeChange: function(event) {
        let updatedState = React.addons.update(this.state, { text: {$set: event.value} });
        this.setState(updatedState);
        if(this.state.autoUpdateMetaform) {
            this.resetMetaform();
        }
    },

    onMainEntityNameChanged: function(event) {
        let updatedState = React.addons.update(this.state, { entityName: {$set: event.value} });
        this.setState(updatedState);
    },

    onMainLayoutNameChanged: function(event) {
        let updatedState = React.addons.update(this.state, { layoutName: {$set: event.value} });
        this.setState(updatedState);
    },

    onFormTitleChanged: function(event) {
        let updatedState = React.addons.update(this.state, { title: {$set: event.value} });
        this.setState(updatedState);
    },

    resetMetaform: function() {
        if(this.refs.mf) {
            this.refs.mf.resetState();
        }
    },

    /**
     * Returns the schema object based on the text
     */
    buildMetaform: function() {
        try {
            let schema = eval('(' + this.state.text + ')');
            let fields = metadataProvider.getFields(schema, this.state.entityName, this.state.layoutName);
            return <Metaform
                schema={schema}
                ref="mf"
                entityName={this.state.entityName}
                layoutName= {this.state.layoutName}
                model={this.state.model}
                title={this.state.title}/>;
        }
        catch(ex) {
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

    render: function() {
        let _this = this;
        return <div className="live-schema-editor">
            <div className='row'>
                <div className="col-md-12">
                    <h2>Gearz schema live editor</h2>
                    </div>
                <div className="col-md-4">

                    <div className='row'>
                        <div className="col-md-12">
                            <Lookup name="presets" displayName="Presets" options={this.state.presets} onChange={this.onPresetChange} value={this.state.selectedPreset}/>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <TextBox displayName="Main entity name" value={this.state.entityName} onChange={this.onMainEntityNameChanged} />
                        </div>
                        <div className="col-md-6">
                            <TextBox displayName="Main layout name" value={this.state.layoutName} onChange={this.onMainLayoutNameChanged}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <TextBox displayName="Form title" value={this.state.title} onChange={this.onFormTitleChanged}/>
                        </div>
                    </div>

                    <CodeEditor
                        displayName="Schema"
                        onChange={this.onCodeChange}
                        name="liveSchemaEditor"
                        value={this.state.text}
                        />

                    </div>
                <div className="col-md-8">
                    <div className="live-schema-editor-mount-node" >
                        {this.buildMetaform()}
                    </div>
                </div>
                </div>:
            </div>;
    }
});

export default LiveSchemaEditor;
