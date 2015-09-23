import React from 'react';
import Button from 'react-bootstrap/lib/Button.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';

let GlyphButton = React.createClass({
    propTypes: {
        bsStyle: React.PropTypes.string.isRequired,
        text: React.PropTypes.string,
        glyph: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func
    },
    handleSave: function () {
        if (this.props.onClick) {
            this.props.onClick();
        }
    },
    render: function () {
        let text = this.props.text ? <span style={{marginLeft:6}}>{this.props.text}</span> : null;
        return <Button
            bsStyle={this.props.bsStyle}
            onClick={this.handleSave}>
            <Glyphicon glyph={this.props.glyph}/>
            {text}
        </Button>;
    }
});

export default GlyphButton;