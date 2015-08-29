import React from 'react';
import FormGroup from './FormGroup.js';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import GearzMixin from '../mixins/GearzMixin.js';

const DatePicker = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired
    },

    mixins: [GearzMixin],

    handleChange(date){
        this.props.onChange({name: this.props.name, value: date});
    },

    render: function() {

        let props = {
            value: this.props.value,
            displayName: this.props.displayName,
            onChange: this.handleChange,
            groupClassName: `${this.getVisibleStyle()} ${this.props.groupClassName}`
        };

        return (
            <FormGroup {...props}>
                <DateTimePicker {...props} />
            </FormGroup>
        );
    }
});

export default DatePicker;