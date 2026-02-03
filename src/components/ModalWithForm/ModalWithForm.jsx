import closeIcon from "../../assets/x.svg";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  name,
  buttonText = "Save",
  onClose,
  isOpen,
  onSubmit,
}) {
  return (
    <div onClick={onClose} className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div onClick={(e) => e.stopPropagation()} className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close">
          <img onClick={onClose} src={closeIcon} alt="close icon" />
        </button>
        <form onSubmit={onSubmit} className="modal__form" name={name}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
