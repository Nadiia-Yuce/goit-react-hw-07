import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "./redux/contactsOps";
import { selectError, selectLoading } from "./redux/contactsSlice";
import { FaAddressBook } from "react-icons/fa";
import { Grid } from "react-loader-spinner";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import RequestError from "./components/RequestError/RequestError";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const isLoading = useSelector(selectLoading);

  //HTTP запит (діспатчиться операція)
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <div className="titleWrap">
        <FaAddressBook size={35} color="#62453C" />
        <h1>Contactbook</h1>
      </div>
      <ContactForm />
      <SearchBox />
      {isLoading && (
        <div className="loader">
          <Grid color="rgb(124, 111, 156)" />
        </div>
      )}
      {error && <RequestError />}
      <ContactList />
    </div>
  );
}
