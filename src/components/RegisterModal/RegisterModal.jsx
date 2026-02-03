import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

const RegisterModal = ({ handleRegistration, isOpen, onClose }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { resetForm, errors, isValid, isSubmitted } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegistration(data);
  }

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
      className={`modal ${isOpen ? "modal__opened" : ""}`}
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          name="email"
          className={`modal__input${
            isSubmitted && errors.email ? " modal__input_invalid" : ""
          }`}
          id="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          autoComplete="off"
        />
        {isSubmitted && errors.email && (
          <span className="modal__error modal__error_visible">
            {errors.email}
          </span>
        )}
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          name="password"
          className={`modal__input${
            isSubmitted && errors.password ? " modal__input_invalid" : ""
          }`}
          id="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          autoComplete="off"
        />
        {isSubmitted && errors.password && (
          <span className="modal__error modal__error_visible">
            {errors.password}
          </span>
        )}
      </label>
      <label htmlFor="name" className="modal__label">
        Name*{" "}
        <input
          name="name"
          className={`modal__input${
            isSubmitted && errors.name ? " modal__input_invalid" : ""
          }`}
          id="register-name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          autoComplete="off"
        />
        {isSubmitted && errors.name && (
          <span className="modal__error modal__error_visible">
            {errors.name}
          </span>
        )}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL*{" "}
        <input
          name="avatar"
          className={`modal__input${
            isSubmitted && errors.imageUrl ? " modal__input_invalid" : ""
          }`}
          id="avatar"
          placeholder="Avatar URL"
          value={data.avatar}
          onChange={handleChange}
          autoComplete="off"
        />
        {isSubmitted && errors.imageUrl && (
          <span className="modal__error modal__error_visible">
            {errors.imageUrl}
          </span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
