import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/operations";
import { selectError } from "../../redux/auth/selectors";
import styles from "./LoginPage.module.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçersiz e-posta adresi!")
    .required("E-posta alanı zorunludur!"),
  password: Yup.string()
    .min(7, "Şifre en az 7 karakter olmalıdır!")
    .required("Şifre alanı zorunludur!"),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const reduxError = useSelector(selectError); // Yanlış şifre/eposta hatalarını yakalamak için

  const handleSubmit = (values, actions) => {
    // values objesi şunları içerir: { email, password }
    dispatch(loginUser(values));
    actions.resetForm();
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Hesabınıza Giriş Yapın</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
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
                Giriş Yap
              </button>

              {/* Sunucudan gelebilecek hatalar (Örn: 400 Bad Request / 404 Not Found) */}
              {reduxError && <p className={styles.apiError}>{reduxError}</p>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
