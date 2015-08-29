import React from 'react';

const FormGroup = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.node,
        displayName: React.PropTypes.string
    },

    render: function() {
        return (
            <div className="form-group">
                <label className="control-label label-class">{this.props.displayName}</label>
                {this.props.children}
            </div>
        );
    }
});

export default FormGroup;