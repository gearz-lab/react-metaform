import React, { Component, PropTypes } from 'react';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import psjon from '../../package.json';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class LiveSchemaEditor extends Component {

    render() {
        return <div className="live-schema-editor">
            <GitHubForkRibbon href="https://github.com/gearz-lab/react-metaform"
                target="_blank"
                position="right"
                color="black">
                Fork me on GitHub
            </GitHubForkRibbon>
            <div className='row'>
                <div className="col-md-12">
                    <h2>Redux-autoform demo {psjon.version}</h2>
                </div>
                <div className="col-md-5">
                    <div className='row'>
                        <div className="col-md-12">
                            <span className="pull-right">Check the <a target="blank"
                                href="https://github.com/gearz-lab/react-metaform/blob/master/docs-md/Documentation.md#metadata">metadata
                                documentation</a>.
                            </span>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Select</ControlLabel>
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="select">select</option>
                                    <option value="other">...</option>
                                </FormControl>
                            </FormGroup>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                </div>
            </div>
        </div>
    }
}

LiveSchemaEditor.propTypes = {
};

export default LiveSchemaEditor;