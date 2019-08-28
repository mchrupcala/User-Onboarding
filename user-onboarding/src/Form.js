import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ errors, status, values, touched }) => {
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
        <br />
          <Field name="fullname" type="text" placeholder="Full Name" />
          {touched.fullname && errors.fullname && (
            <p className="error">{errors.fullname}</p>
            )}
        <br />
        <Field name="email" type="email" placeholder="Email address" />
         {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
        )}
        <br />

        <Field
          name="password"
          type="password"
          placeholder="Enter Your Password"
        />
            {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
        )}
        <br />

        <label>
          Terms of Service
          <Field type="checkbox" name="tos" checked={values.tos} />
          <span className="checkmark" />
        </label>
        <br />

        <button className="button" type="submit">
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
    </div>
  );
};

const FormikLogin = withFormik({
  mapPropsToValues({ fullname, email, password, tos }) {
    return {
      fullname: fullname || "",
      email: email || "",
      password: password || "",
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    fullname: Yup.string()
        .required("Please enter your name.")
        .min(1),
    email: Yup.string()
      .email("Please enter your email address.")
      .required("Please enter your email address."),
    password: Yup.string()
      .min(8)
      .required("Please enter your password.")
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        console.log(res);
        setStatus(res.data);
        // setStatus(res.data)
      })
      .catch(err => {
        console.log(err.response);
      });
    // console.log(values);
  }
})(UserForm);

export default FormikLogin;