import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactForm.module.css";

export default function ContactForm() {
  const dispatch = useDispatch();

  //початкові значення для обовʼязкового пропсу initialValues в Formik. Беруться з атрибуту name в інпутах
  const initialValues = { name: "", number: "" };

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  //бібліотека для валідації "yup"; схема валідації полів; передається пропсом в Formik
  //помилки валідації візуалізуємо через компонент ErrorMessage, який додаємо до кожного філда
  const contactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short! Minimum 3 letters.")
      .max(50, "Too long! Maximum 50 letters.")
      .required("Required!"),
    number: Yup.string()
      .min(3, "Too short! Minimum 3 digits.")
      .max(50, "Too long! Maximum 50 digits.")
      .required("Required!"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={contactSchema}
    >
      {/* отримання доступу до стану форми за допомогою властивостей, які Formik
      надає в межах render-функції або в children пропсі (ще можна отримати values-значення полів) */}
      {({ isValid, dirty }) => (
        <Form className={`${css.form} animate__animated animate__fadeInDown`}>
          <div className={css.formGroup}>
            <label htmlFor="name" className={css.formLabel}>
              Name
            </label>
            <Field name="name" id="name" className={css.formInput} />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="number" className={css.formLabel}>
              Number
            </label>
            <Field name="number" id="number" className={css.formInput} />
            <ErrorMessage
              name="number"
              component="span"
              className={css.error}
            />
          </div>

          <button
            type="submit"
            className={css.formBtn}
            disabled={!isValid || !dirty}
          >
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}
