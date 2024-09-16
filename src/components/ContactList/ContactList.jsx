import { selectNameFilter } from "../../redux/filtersSlice";
import { selectContacts } from "../../redux/contactsSlice";
import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const query = useSelector(selectNameFilter);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(query.toLowerCase())
  );

  //   всередині ліста мепаємо початковий масив контактів, малюємо лішку з ключем
  // в Contact пропсом кидаємо ітерований обʼєкт масиву
  // onDelete просто передається далі в Contact
  return (
    <div>
      {contacts.length === 0 ? (
        <p className={css.warning}>You have no contacts yet!</p>
      ) : filteredContacts.length === 0 ? (
        <p className={css.warning}>
          There are no contacts matching your query!
        </p>
      ) : (
        <ul className={css.list}>
          {filteredContacts.map(contact => (
            <li
              key={contact.id}
              className={`${css.item} animate__animated animate__fadeInUp`}
            >
              <Contact contact={contact} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
