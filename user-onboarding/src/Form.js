import React from "react";
import {Form, Field, Formik, withFormik, yupToFormErrors} from 'formik';
import * as Yup from 'yup';

const UserForm = ({errors, values})  => {
    return (
        <div>
            <Formik>
            <Form>
                <div>
                    {errors.fullname && <p>{errors.fullname}</p>}
                <Field 
                    name="fullname" 
                    type="text" 
                    placeholder="Full Name"/>
                </div>
                <Field 
                    name="email" 
                    type="text" 
                    placeholder="Email address"/>
            
                <Field 
                    name="password" 
                    type="password" 
                    placeholder="Enter Your Password"/>
                <label>
                    Terms of Service
                <Field
                    type="checkbox"
                    name="tos"/>
                     {/* checked={values.tos} */}
                <span className="checkmark"></span>
                </label>                

                <button 
                className="button" 
                type="submit">
                </button>
            </Form>
            </Formik>
        </div>
    );
};

const FormikLogin = withFormik({
    mapPropsToValues({fullname, email, password, tos}) {
    return {
        fullname: fullname || '',
        email: email || '',
        password: password || '',
        tos: tos || false
    };
    },

    validationSchema: Yup.object().shape({
        fullname: Yup.string()
            .min(1)
            .required(),
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
            .required()
            .min(8)
    })
})


export default UserForm;