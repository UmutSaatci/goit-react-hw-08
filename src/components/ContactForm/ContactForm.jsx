import { useDispatch, useSelector } from "react-redux";
import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import { addContacts } from "../../redux/contacts/operations";
// Rehberdeki mevcut kişileri seçmek için kullandığınız selector
import { selectContacts } from "../../redux/contacts/selectors";

export const ContactForm = () => {
  const dispatch = useDispatch();
  // 1. Redux state içindeki mevcut tüm kişileri çekiyoruz
  const contacts = useSelector(selectContacts);

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
    const { name, number } = values;

    // 2. Mükerrer Kayıt Kontrolü: İsim ve numara birebir eşleşiyor mu?
    // (Küçük/büyük harf duyarlılığını kaldırmak ve boşlukları temizlemek için trim ve toLowerCase kullanıyoruz)
    const isDuplicate = contacts.some(
      (contact) =>
        contact.name.trim().toLowerCase() === name.trim().toLowerCase() &&
        contact.number.trim() === number.trim(),
    );

    // 3. Eğer aynı isim ve numara varsa kaydetme ve hata toast'u fırlat
    if (isDuplicate) {
      toast.error(
        `"${name}" ismi ve "${number}" numarası rehberde zaten kayıtlı!`,
      );
      return; // Fonksiyonu burada kes, dispatch işlemine geçme
    }

    // 4. Eşleşme yoksa asenkron ekleme operasyonunu güvenle tetikle
    dispatch(addContacts({ name, number }))
      .unwrap()
      .then(() => {
        toast.success(`${name} başarıyla rehbere eklendi!`);
        actions.resetForm();
      })
      .catch(() => {
        toast.error("Kişi eklenirken bir hata meydana geldi.");
      });
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
            İsim
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
            Telefon
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
          Kişi Ekle
        </button>
      </Form>
    </Formik>
  );
};
