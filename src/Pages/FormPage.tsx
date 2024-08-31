// components/Form.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../components/Input';
import { FiSearch, FiCheck } from 'react-icons/fi';

const schema = yup.object().shape({
    username: yup.string().required('Username is required').min(4, 'Minimum length is 4').max(20, 'Maximum length is 20'),
    email: yup.string().required('Email is required').email('Invalid email address'),
});

const Form: React.FC = () => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
                name="username"
                control={control}
                label="Username"
                placeholder="Enter your username"
                required
                minLength={4}
                maxLength={20}
                showError
                showSuccess={isValid && !!watch('username')}
                icon={<FiSearch />}
            />
            <Input
                name="email"
                control={control}
                label="Email"
                placeholder="Enter your email"
                type="email"
                required
                showError
                showSuccess={isValid && !!watch('email')}
                icon={<FiCheck />}
            />
            <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" disabled={!isValid}>
                Submit
            </button>
        </form>
    );
};

export default Form;
