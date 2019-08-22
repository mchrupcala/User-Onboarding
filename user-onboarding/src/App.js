import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserForm from "./Form";
import formik from "formik";
import * as Yup from 'yup';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <UserForm />
    </div>
  );
}

export default App;
