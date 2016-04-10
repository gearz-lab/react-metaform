import React, {Component} from 'react';
import {reduxForm} from 'redux-form';

class ContactForm extends Component {
    render() {
        const {fields: {firstName, lastName, email}, handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="First Name" className="form-control" {...firstName}/>
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Last Name" className="form-control" {...lastName}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Email" className="form-control" {...email}/>
                </div>
                <button className="btn btn-default" type="submit">Submit</button>
            </form>
        );
    }
}

ContactForm = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'contact',                           // a unique name for this form
    fields: ['firstName', 'lastName', 'email'] // all the fields in your form
})(ContactForm);

export default ContactForm;