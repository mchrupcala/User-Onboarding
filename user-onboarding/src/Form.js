import React, {useState, useEffect} from "react";
import {Form, Field, withFormik} from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const UserForm = ({errors, status, values, touched, isSubmitting})  => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status) {
          setUsers([...users, status]);
        }
      }, [status]);

    return (
        <div>
            {/* <Formik> */}
            <Form>
                <br></br>
                <div>
                {touched.fullname && errors.fullname && <p className="error">{errors.fullname}</p>}
                    <Field 
                        name="fullname" 
                        type="text" 
                        placeholder="Full Name"/>
                </div>
                <br></br>
                <Field 
                    name="email" 
                    type="text" 
                    placeholder="Email address"/>
                <br></br>

                <Field 
                    name="password" 
                    type="password" 
                    placeholder="Enter Your Password"/>
                <br></br>

                <label>
                    Terms of Service
                <Field
                    type="checkbox"
                    name="tos"/>
                     {/* checked={values.tos} */}
                <span className="checkmark"></span>
                </label>  
                <br></br>              

                <button 
                className="button" 
                type="submit"
                disabled={isSubmitting}>
                    Click to Submit
                </button>
            </Form>

                {users.map(item => (
                    <ul key={item.id}>
                        <li>Name: {item.fullname}</li>
                        <li>Email: {item.email}</li>
                        <li>Password: {item.password}</li>
                    </ul>
                ))}

            {/* </Formik> */}
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
            .required("Name is required."),
        email: Yup.string()
            .email("Email is required.")
            .required("Email is required."),
        password: Yup.string()
            .required("Password is required.")
            .min(8)
    }), 

    handleSubmit(values, {setSubmitting}) {
        axios
            .post('https://reqres.in/api/users', values) 
            .then(res => {
                console.log(res);
                console.log("hey");
                setSubmitting(false);
                // setStatus(res.data)
            })
            .catch(err => {
                console.log(err.response);
                setSubmitting(false);
            });
        // console.log(values);
    }
})(UserForm);


export default FormikLogin;