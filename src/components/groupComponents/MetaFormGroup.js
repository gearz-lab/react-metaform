import React from 'react';
import _ from 'underscore';
import Alert from 'react-bootstrap/lib/Alert.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';

var MetaFormGroup = React.createClass({
    propTypes: {
        component: React.PropTypes.string,
        layout: React.PropTypes.object.isRequired,
        fields: React.PropTypes.array.isRequired,
        componentFactory: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            collapsed: false
        }
    },

    handleCollapse: function () {
        let newState = _.extend({}, this.state);
        newState.collapsed = !newState.collapsed;
        this.setState(newState);
    },

    render: function () {
        let _this = this;
        // the passed in layout can contain either fields or groups.
        // in case it contains 'fields', we're gonna render each of the fields.
        // in case it contains 'groups', we're gonna render render each group, passing the fields as a parameter
        try {
            let components;
            if (this.props.layout.fields) {
                components = this.props.layout.fields.map(field => {
                    let layoutFieldInProps = _.find(_this.props.fields, cp => cp.name === field.name);
                    return {
                        data: layoutFieldInProps,
                        length: this.props.layout.fields.length,
                        component: this.props.componentFactory.buildFieldComponent(layoutFieldInProps)
                    }
                });
            }
            else if (this.props.layout.groups) {
                components = this.props.layout.groups.map(group => {
                    return {
                        data: group,
                        length: this.props.layout.groups.length,
                        component: this.props.componentFactory.buildGroupComponent({
                            component: group.component,
                            layout: group,
                            fields: _this.props.fields,
                            componentFactory: this.props.componentFactory
                        })
                    }
                });
            }
            else {
                throw Error('A layout must either have fields or groups');
            }

            let content = components.map(component => {
                if (_this.props.layout.orientation != 'horizontal') {
                    return <div className='col-md-12'>
                        { component.component }
                    </div>;
                }
                else {
                    let colSpan = component.data.colSpan ? component.data.colSpan : Math.floor(12 / component.length);
                    return <div className={`col-md-${colSpan}`}>
                        { component.component }
                    </div>
                }
            });

            var header = this.props.layout.title
                ? <header className="metaform-group-header">
                <Glyphicon glyph={this.state.collapsed ? "triangle-top" : "triangle-bottom"}
                           onClick={this.handleCollapse}/>
                <span className="metaform-group-title">{this.props.layout.title}</span>
            </header>
                : null;

            return <section>
                <div className='row'>
                    <div className="metaform-group">
                        { header }
                        <div className="metaform-group-content" style={{ display: this.state.collapsed ? 'none' : '' }}>
                            {content}
                        </div>
                    </div>
                </div>
            </section>;
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

export default MetaFormGroup;