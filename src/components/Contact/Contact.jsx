import { deleteContact } from "../../redux/contactsSlice";
import { FaPhone, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState } from "react";
import css from "./Contact.module.css";
import clsx from "clsx";

export default function Contact({ contact: { name, number, id } }) {
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
        {/* <p className={css.text}>{number}</p> */}
        <a className={`${css.text} ${css.tel}`} href={`tel: ${number}`}>
          {number}
        </a>
      </div>
      {/* при події onClick викликається коллбек onDelete, якому передається поточне значеня id, по якому має видалятися обʼєкт */}
      {/* атрибут id ф-ї onDelete піднімається до початкової ф-ї removeContact в App  */}
      <button type="button" className={css.delete} onClick={handleRemove}>
        Delete
      </button>
    </div>
  );
}
