import React from 'react';
import { Input } from '../input';
import { Field, FieldDescription, FieldLabel } from '../field';

const FormInput = ({ label, id, error, className = '', ...props }) => {
  return (
    <Field>
      <FieldLabel className={``} htmlFor={id}>
        {label}
      </FieldLabel>
      <Input
        id={id}
        {...props}
        className={`${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
        }${className}`}
      />
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </Field>
  );
};

export default FormInput;
