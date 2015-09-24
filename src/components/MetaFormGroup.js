import React from 'react';
import _ from 'underscore';
import componentFactory from '../lib/ComponentFactory';

var MetaFormGroup = React.createClass({
    propTypes: {
        layout: React.PropTypes.object.isRequired,
        fields: React.PropTypes.array.isRequired
    },
    render: function () {
        let _this = this;

        // the passed in layout can contain either fields or groups.
        // in case it contains 'fields', we're gonna render each of the fields.
        // in case it contains 'groups', we're gonna render render each group, passing the fields as a parameter

        let components = this.props.layout.fields
            ? this.props.layout.fields.map(field => {
            let layoutFieldInProps = _.find(_this.props.fields, cp => cp.name === field.name);
            return {
                data: layoutFieldInProps,
                length: this.props.layout.fields.length,
                component: componentFactory.buildComponent(layoutFieldInProps)
            }
        })
            : this.props.layout.groups.map(group => {
            return {
                data: group,
                length: this.props.layout.groups.length,
                component: <MetaFormGroup layout={group} fields={_this.props.fields}/>
            }
        });

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

        var layoutHeader = this.props.layout.title
            ? <header className="meta-form-title"><span>{this.props.layout.title}</span></header>
            : null;

        return <section>
            <div className='row'>
                {layoutHeader}
                {content}
            </div>
        </section>;
    }
});

export default MetaFormGroup;