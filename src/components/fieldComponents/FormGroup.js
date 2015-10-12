import React from 'react';

const FormGroup = React.createClass({

    propTypes: {
        displayName: React.PropTypes.string,
        invalid: React.PropTypes.object
    },

    getDefaultProps: function() {
        return {
            hasFeedbackIcon: true,
            feedback: 'error'
        };
    },

    /**
     * Returns the style due to the valid state
     */
     getFeedbackClasses: function() {
        if (this.props.invalid) {
            if (this.props.invalid.value === undefined || this.props.invalid.value === null) {
                throw new Error('invalid prop should have a value property');
            }
            if (this.props.invalid.value && (this.props.feedback === true || this.props.feedback === 'error')) {
                return 'has-feedback has-error';
            }
        }

        if (this.props.feedback === true || this.props.feedback === 'success')
            return 'has-feedback has-success';

        return '';
    },

    render: function () {
        return (
            <div className={`form-group ${this.getFeedbackClasses()}`}>
                <label className="control-label label-class">{this.props.displayName}</label>
                {this.props.children}
            </div>
        );
    }
});

export default FormGroup;