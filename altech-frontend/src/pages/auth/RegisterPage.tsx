import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
}

// Schema de validare
const schema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .matches(/^[A-Za-z]+$/, 'Only letters are allowed'),
  lastName: yup
    .string()
    .required('Last name is required')
    .matches(/^[A-Za-z]+$/, 'Only letters are allowed'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must include an uppercase letter')
    .matches(/[0-9]/, 'Password must include a number')
    .matches(/[!@#$%^&*]/, 'Password must include a special character'),
  repeatPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      await axios.post('http://127.0.0.1:8000/auth/register/', {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        password: data.password,
      });
      alert('Account created successfully!');
      navigate('/login');
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert('Registration failed: ' + JSON.stringify(error.response?.data));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <div>
        <label>First Name:</label>
        <input type="text" {...register('firstName')} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" {...register('lastName')} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label>Repeat Password:</label>
        <input type="password" {...register('repeatPassword')} />
        {errors.repeatPassword && <p>{errors.repeatPassword.message}</p>}
      </div>
      <button type="submit" style={{ marginTop: '1rem' }}>
        Create Account
      </button>
    </form>
  );
};

export default RegisterPage;