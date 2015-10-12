import React from 'react/addons.js';
import CodeEditor from './CodeEditor.js';
import Routes from '../Router.js';
// Bootstrap
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';
import Alert from 'react-bootstrap/lib/Alert.js';
import Tabs from 'react-bootstrap/lib/Tabs.js';
import Tab from 'react-bootstrap/lib/Tab.js';

import TextBox from '../../src/components/fieldComponents/TextBox.js';
import Metaform from './../../src/MetaForm.js';
import metadataProvider from '../../src/lib/metadataProvider.js';
import CheckBox from '../../src/components/fieldComponents/CheckBox.js';
import Lookup from '../../src/components/fieldComponents/Lookup.js';
import DefaultComponentFactory from '../../src/DefaultComponentFactory.js';
import liveSchemaEditorPresetProvider from './LiveSchemaEditorPresetProvider.js';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import designerSchema from './LiveSchemaDesignerSchema.js';
import _ from 'underscore';
import psjon from '../../package.json';


const LiveSchemaEditor = React.createClass({

    getInitialState: function () {

        return {
            schema: {},
            model: {}
        };
    },

    handleSchemaChange: function (schema) {
        let updatedState = React.addons.update(this.state, {schema: {$set: schema}});
        this.setState(updatedState, () => {
            this.resetMetaform();
        });
    },

    handleEntityNameChanged: function (event) {
        let updatedState = React.addons.update(this.state, {entityName: {$set: event.value}});
        this.setState(updatedState);
    },

    handleLayoutNameChanged: function (event) {
        let updatedState = React.addons.update(this.state, {layoutName: {$set: event.value}});
        this.setState(updatedState);
    },

    resetMetaform: function (next) {
        if (this.refs.mf) {
            this.refs.mf.resetState(next);
        }
    },

    render: function () {
        let _this = this;
        return <div className="live-schema-editor">

            <GitHubForkRibbon href="https://github.com/gearz-lab/react-metaform"
                              target="_blank"
                              position="right"
                              color="black">
                Fork me on GitHub
            </GitHubForkRibbon>

            <div className='row'>
                <div className="col-md-12">
                    <h2>React-metaform designer demo {psjon.version}</h2>
                </div>
                <div className="col-md-5">

                    <div className='row'>
                        <div className="col-md-12">
                            <span className="pull-right">Check the <a target="blank"
                                                                      href="https://github.com/gearz-lab/react-metaform/blob/master/docs-md/Documentation.md#metadata">metadata
                                documentation</a>.</span>
                        </div>
                    </div>

                    <Metaform
                        schema={designerSchema}
                        entityName='schema'
                        layoutName='schema-edit'
                        componentFactory={DefaultComponentFactory}
                        model={this.state.schema}
                        title='Schema designer'
                        showBottomBar={false}
                        onModelChange={this.handleSchemaChange}
                        />

                </div>
                <div className="col-md-7">

                    <row>
                        <div className="col-md-6">
                            <TextBox name="entity-name" displayName="Entity name" value={this.state.entityName} onChange={this.handleEntityNameChanged}/>
                        </div>
                        <div className="col-md-6">
                            <TextBox name="layout-name" displayName="Layout name" value={this.state.layoutName} onChange={this.handleLayoutNameChanged}/>
                        </div>
                    </row>
                    <row>
                        <div className="col-md-12">
                            <div className="live-schema-editor-mount-node">
                                {this.buildMetaform()}
                            </div>
                        </div>
                    </row>

                </div>
            </div>
        </div>;
    },

    /**
     * Returns the schema object based on the text
     */
    buildMetaform: function () {

        try {

            // the only reason why I'm getting this here, is so it's going to trigger an exception
            // when the entityName and/or the layoutName is not valid
            metadataProvider.getEntityAndLayout(this.state.schema, this.state.entityName, this.state.layoutName);

            let metaForm = <Metaform
                schema={this.state.schema}
                ref="mf"
                entityName={this.state.entityName}
                layoutName={this.state.layoutName}
                componentFactory={DefaultComponentFactory}
                model={this.state.model}
                title='Something'
                />;
            return metaForm;
        }
        catch (ex) {
            return <Alert bsStyle='danger'>
                <h4>Oh snap! The schema is not valid.</h4>

                <p>Detailed information:
                    <b>{ex.message}</b>
                </p>
            </Alert>
        }
    }
});

export default LiveSchemaEditor;
