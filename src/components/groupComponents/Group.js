import React from 'react';
import _ from 'underscore';
import Alert from 'react-bootstrap/lib/Alert.js';

var Group = React.createClass({
    propTypes: {
        component: React.PropTypes.string,
        layout: React.PropTypes.object.isRequired,
        fields: React.PropTypes.array.isRequired,
        componentFactory: React.PropTypes.object.isRequired
    },

    render: function () {

        let { layout, fields, componentFactory } = this.props;

        // the passed in layout can contain either fields or groups.
        // in case it contains 'fields', we're gonna render each of the fields.
        // in case it contains 'groups', we're gonna render render each group, passing the fields as a parameter
        try {
            let components;
            if (layout.fields) {
                components = layout.fields.map(field => {
                    let fieldMetadata = _.find(fields, cp => cp.name === field.name);
                    return {
                        data: fieldMetadata,
                        length: layout.fields.length,
                        component: componentFactory.buildFieldComponent(fieldMetadata)
                    }
                });
            }
            else if (layout.groups) {
                components = this.props.layout.groups.map(group => {
                    return {
                        data: group,
                        length: layout.groups.length,
                        component: componentFactory.buildGroupComponent({
                            component: group.component,
                            layout: group,
                            fields: fields,
                            componentFactory: componentFactory
                        })
                    }
                });
            }
            else {
                throw Error('A layout must either have fields or groups');
            }


            let content = components.map(component => {

                let colClass;
                if (layout.orientation != 'horizontal') {
                    colClass = 'col-md-12';
                } else {
                    let colSpan = component.data.colSpan ? component.data.colSpan : Math.floor(12 / component.length);
                    colClass = `col-md-${colSpan}`;
                }

                return <div className={colClass} key={component.data.key + '-wrapper'}>
                    { component.component }
                </div>;
            });

            var header = layout.title
                ? <header className="metaform-group-header">
                <span className="metaform-group-title">{layout.title}
                </span>
            </header>
                : null;

            return <section>
                <div className='row'>
                    <div className="metaform-group">
                        { header }
                        <div className="metaform-group-content">
                            {content}
                        </div>
                    </div>
                </div>
            </section>;
        }
        catch (ex) {
            return <Alert bsStyle='danger'>
                <h4>Could not render the MetaFormGroup component. The schema is not valid.</h4>

                <p>Detailed information:
                    <b>{ex.message}</b>
                </p>
            </Alert>
        }
    }
});

export default Group;