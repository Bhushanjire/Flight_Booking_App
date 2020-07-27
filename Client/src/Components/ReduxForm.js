import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Input } from '@material-ui/core';

const onSubmit = (values) => {
    console.log('Submit', values);
}

const required = v => {
    if (!v || v === '') {
        return 'This field is required';
    }
    return undefined;
}

const renderInput = ({ input, meta }) => { 
    console.log('input',input);
    console.log('meta',meta);

    
    return (<input {...input}  errorMessage={meta.error} />)
}

let ReduxForm = (props) => {
    let { handleSubmit, meta } = props;
    console.log('Props', meta);
    return (
        <>
            <h4>Redux form works</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email ID</label>
                    <Field name="emailId" component={renderInput}  type="text" validate={required} />
                </div>
                <div>
                    <label>Password</label>
                    <Field name="password" component={renderInput} type="password" validate={required} />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </>
    )
}

ReduxForm = reduxForm({
    form: 'Login',
    onSubmit
})(ReduxForm);


// NOTE: If the ()() syntax seems confusing, you can always break it down into two steps:
//createReduxForm = reduxForm({ form: 'Login' })
// evaluate it for ContactForm component
//ReduxForm = createReduxForm(ReduxForm)

export default ReduxForm;