import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

const ValidationSummary = React.createClass({
    propTypes: {
        open: React.PropTypes.bool,
        messages: React.PropTypes.array,
        onDismiss: React.PropTypes.func
    },
    handleAlertDismiss() {
        if (this.props.onDismiss) {
            this.props.onDismiss();
        }
    },
    render: function () {
        let content = null;
        if (this.props.messages.length > 0) {
            content = (
                <Alert bsStyle='danger'>
                    <h4>Validation errors:</h4>
                    <ul>
                        {
                            this.props.messages.map((error, i) => <li key={`error-${i}`}>{error}</li>)
                        }
                    </ul>
                </Alert>
            );
        }
        else {
            content = <div><Glyphicon glyph='ok'/><span> No validation errors.</span></div>;
        }
        return <div className="validation-summary">
            {content}
        </div>;
    }
});

export default ValidationSummary;