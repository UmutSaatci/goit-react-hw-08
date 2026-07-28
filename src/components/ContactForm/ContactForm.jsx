import { useDispatch } from "react-redux";
import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { addContacts } from "../../redux/operations";

export const ContactForm = () => {
  const dispatch = useDispatch();

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("İsim alanı zorunludur!"),
    number: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Telefon alanı zorunludur!"),
  });
  const initialValues = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    // values nesnesinin içinden name ve number değerlerini çıkartıyoruz
    const { name, number } = values;

    // Daha önce düzeltmiş olduğumuz tek nesne alan operasyonu tetikliyoruz
    dispatch(addContacts({ name, number }));

    // Formu sıfırlamak için (Formik kuralı)
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.formContainer}>
        <div className={css.inputGroup}>
          <label htmlFor="name-input" className={css.formLabel}>
            Name
          </label>
          <Field
            type="text"
            name="name"
            id="name-input"
            className={css.formInput}
          />
          <ErrorMessage
            name="name"
            component="span"
            className={css.errorMessage}
          />
        </div>

        <div className={css.inputGroup}>
          <label htmlFor="number-input" className={css.formLabel}>
            Number
          </label>
          <Field
            type="text"
            name="number"
            id="number-input"
            className={css.formInput}
          />
          <ErrorMessage
            name="number"
            component="span"
            className={css.errorMessage}
          />
        </div>

        <button type="submit" className={css.submitBtn}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};
