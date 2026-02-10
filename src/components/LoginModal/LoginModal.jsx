import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "../ModalWithForm/ModalWithForm.css";

const LoginModal = ({ handleSignIn, isOpen, onClose }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { errors, isValid, isSubmitted } = useFormWithValidation(data);

  function handleSubmit(evt) {
    evt.preventDefault();
    handleSignIn(data);
  }

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <label htmlFor="email" className="modal__label">
        Email*
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
        Password*
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
    </ModalWithForm>
  );
};

export default LoginModal;
