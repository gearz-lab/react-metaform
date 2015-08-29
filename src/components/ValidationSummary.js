import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Glyphicon from 'react-bootstrap/lib/Glyphicon'

const ValidationSummary = React.createClass({
    propTypes: {
        open: React.PropTypes.bool,
        messages: React.PropTypes.array,
        onDismiss: React.PropTypes.node
    },
    handleAlertDismiss() {
        if(this.props.onDismiss) {
            this.props.onDismiss();
        }
    },
    render: function() {
        if(this.props.messages.length > 0) {
            return (<Alert bsStyle='danger' >
                <h4>Validation errors:</h4>
                <ul>
                    {
                        this.props.messages.map(error => <li>{error}</li>)
                    }
                </ul>
            </Alert>);
        }
        return (<div>
            <Glyphicon glyph='ok' /><span> No validation errors.</span>
        </div>);
    }
});

export default ValidationSummary;