import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../redux/auth/operations";
import { selectError } from "../../redux/auth/selectors";
import styles from "./RegistrationPage.module.css";

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "İsim en az 3 karakter olmalıdır!")
    .required("İsim alanı zorunludur!"),
  email: Yup.string()
    .email("Geçersiz e-posta adresi!")
    .required("E-posta alanı zorunludur!"),
  password: Yup.string()
    .min(7, "Şifre en az 7 karakter olmalıdır!")
    .required("Şifre alanı zorunludur!"),
});

export default function RegistrationPage() {
  const dispatch = useDispatch();
  const reduxError = useSelector(selectError);

  const handleSubmit = (values, actions) => {
    dispatch(signupUser(values));
    actions.resetForm();
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Yeni Hesap Oluştur</h1>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={RegistrationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <label className={styles.label}>
                İsim
                <Field
                  type="text"
                  name="name"
                  placeholder="Adrian Cross"
                  className={styles.input}
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={styles.errorText}
                />
              </label>

              <label className={styles.label}>
                E-posta
                <Field
                  type="email"
                  name="email"
                  placeholder="across@mail.com"
                  className={styles.input}
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={styles.errorText}
                />
              </label>

              <label className={styles.label}>
                Şifre
                <Field
                  type="password"
                  name="password"
                  placeholder="******"
                  className={styles.input}
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className={styles.errorText}
                />
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                Kayıt Ol
              </button>

              {/* Sunucudan gelebilecek hata mesajı */}
              {reduxError && <p className={styles.apiError}>{reduxError}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
