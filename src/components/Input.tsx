import React from 'react';
import { useController, Control } from 'react-hook-form';

interface InputProps {
    name: string;
    control: Control<any>;
    label?: string;
    placeholder?: string;
    type?: string;
    icon?: React.ReactElement;
    disabled?: boolean;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    showError?: boolean;
    showSuccess?: boolean;
}

const Input: React.FC<InputProps> = ({
    name,
    control,
    label,
    placeholder,
    type,
    icon,
    disabled = false,
    required = false,
    minLength,
    maxLength,
    showError,
    showSuccess,
}) => {
    const {
        field,
        fieldState: { error },
    } = useController({
        name,
        control,
        rules: {
            required: required ? `${label} is required` : false,
            minLength: minLength ? { value: minLength, message: `Minimum length is ${minLength}` } : undefined,
            maxLength: maxLength ? { value: maxLength, message: `Maximum length is ${maxLength}` } : undefined,
        },
    });

    return (
        <div className="relative w-full group mb-6">
            {label && (
                <label
                    htmlFor={name}
                    className="absolute top-0 left-0 h-full pl-2 text-sm text-gray-500 transform transition-all 
          flex items-center group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 
          peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full 
          group-focus-within:pl-0 peer-valid:pl-0"
                >
                    {label}
                </label>
            )}
            <div className="relative flex items-center">
                {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">{icon}</span>}
                <input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    {...field}
                    className={`w-full h-10  pl-10 pr-4 text-sm bg-gray-100 outline-none peer placeholder-transparent`}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : undefined}
                />
            </div>
            {error && showError && (
                <span id={`${name}-error`} className="text-red-600 text-sm mt-1 block">
                    {error.message}
                </span>
            )}
            {showSuccess && !error && (
                <span className="text-green-600 text-sm mt-1 block">Looks good!</span>
            )}
        </div>
    );
};

export default Input;
