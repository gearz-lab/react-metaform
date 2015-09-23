import React from 'react';
import _ from 'underscore';
import componentFactory from '../lib/ComponentFactory';

var MetaFormGroup = React.createClass({
    propTypes: {
        layout: React.PropTypes.object.isRequired,
        componentProps: React.PropTypes.array.isRequired
    },
    render: function () {
        let _this = this;

        let components = this.props.layout.fields
            ? this.props.layout.fields.map(field => {
            return {
                data: field,
                length: this.props.layout.fields.length,
                component: componentFactory.buildComponent(_.find(_this.props.componentProps, cp => cp.name === field.name) )
            }
        })
            : this.props.layout.groups.map(group => {
            return {
                data: group,
                length: this.props.layout.groups.length,
                component: <MetaFormGroup layout={group} componentProps={_this.props.componentProps}/>
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