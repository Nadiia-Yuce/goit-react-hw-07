import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";
import { FaPhone, FaUser } from "react-icons/fa";
import css from "./Contact.module.css";
import clsx from "clsx";

export default function Contact({ contact: { name, number, id } }) {
  //локальний стан для коректного відображення анімації
  const [isRemoving, setIsRemoving] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = () => {
    setIsRemoving(true);

    setTimeout(() => {
      dispatch(deleteContact(id));
    }, 500);
  };

  return (
    <div
      // записуємо клас за умовою видалення
      className={clsx(
        css.card,
        "animate__animated",
        isRemoving && "animate__fadeOut"
      )}
    >
      <div className={css.wrap}>
        <FaUser size={16} color="rgb(97, 76, 150)" />
        <p className={css.text}>{name}</p>
      </div>
      <div className={css.wrap}>
        <FaPhone size={16} color="rgb(97, 76, 150)" />
        {/* Клікабельний номер */}
        <a className={`${css.text} ${css.tel}`} href={`tel: ${number}`}>
          {number}
        </a>
      </div>
      <button type="button" className={css.delete} onClick={handleRemove}>
        Delete
      </button>
    </div>
  );
}
