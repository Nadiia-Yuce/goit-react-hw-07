import { FaAddressBook } from "react-icons/fa";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import "./App.css";

export default function App() {
  return (
    <div>
      <div className="titleWrap">
        <FaAddressBook size={35} color="#62453C" />
        <h1>Contactbook</h1>
      </div>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}
