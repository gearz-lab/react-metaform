import React from 'react';
import FormControls from 'react-bootstrap/lib/FormControls';

const Label = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.node,
        displayName: React.PropTypes.string
    },

    /**
     * Returns the style due to the visible state
     */
        _getVisibleStyle() {
        var invisible = this.props.invisible;
        if(invisible) {
            return 'hide';
        }
        return '';
    },

    render: function() {
        // metadata
        let props = {
            value: this.props.value,
            label: this.props.displayName,
            groupClassName: `group-class ${this._getVisibleStyle()} ${this.props.groupClassName}`,
            labelClassName: `label-class ${this.props.labelClassName}`
        };

        return (
            <FormControls.Static {...props } />
        );
    }
});

export default Label;