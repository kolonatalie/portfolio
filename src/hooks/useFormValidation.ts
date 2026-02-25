import { useState } from 'react';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (input: HTMLInputElement | HTMLTextAreaElement) => {
    let message = '';

    if (input.validity.valueMissing) {
      message = `${input.name} is required`;
    } else if (input.validity.typeMismatch || input.validity.patternMismatch) {
      message = input.type === 'email'
        ? 'Please enter a valid email (e.g. name@example.com)'
        : 'Please match the required format';
    }

    setErrors(prev => ({
      ...prev,
      [input.id]: message
    }));

    return input.validity.valid;
  };

  const clearError = (id: string) => {
    setErrors(prev => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  return { errors, validate, clearError };
};