import { useState } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function validate(values) {
    const errors = {};
    // Name validation
    if (!values.name) {
      errors.name = "Name is required.";
    } else if (values.name.length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }
    // Image URL validation
    if (!values.imageUrl) {
      errors.imageUrl = "Image URL is required.";
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(values.imageUrl)) {
      errors.imageUrl = "Enter a valid image URL (jpg, jpeg, png, gif).";
    }
    return errors;
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    const validationErrors = validate(newValues);
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  }

  function handleSubmit() {
    setIsSubmitted(true);
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
    return Object.keys(validationErrors).length === 0;
  }

  function resetForm() {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
    setIsSubmitted(false);
  }

  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    resetForm,
    isSubmitted,
    handleSubmit,
  };
}
