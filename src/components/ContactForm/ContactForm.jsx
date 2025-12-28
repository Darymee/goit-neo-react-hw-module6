import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import styles from './ContactForm.module.css';
import { addContact, selectContacts } from '../../redux/contactsSlice';
import { normalizeName, normalizeNumber } from '../../utils/contactValidation';
import { toastErrorStyles, toastSuccessStyles } from '../../utils/toastStyles';

const yupField = label =>
  Yup.string()
    .trim()
    .min(3, 'Мінімум 3 символи')
    .max(50, 'Максимум 50 символів')
    .required(`Поле ${label} обовʼязкове`);

const validationSchema = Yup.object({
  name: yupField('Name').matches(/[A-Za-zА-Яа-яЁёІіЇїЄє]/, 'Тільки букви'),
  number: Yup.string()
    .trim()
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Невірний формат номера')
    .required("Поле Number обовʼязкове"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const nameTrim = values.name.trim();
    const numberTrim = values.number.trim();

    const nameN = normalizeName(nameTrim);
    const numberN = normalizeNumber(numberTrim);

    const nameExists = contacts.some(c => normalizeName(c.name) === nameN);
    if (nameExists) {
      toast.error(`Контакт з ім'ям "${nameTrim}" вже існує.`, {
        style: toastErrorStyles,
      });
      return;
    }

    const numberExists = contacts.some(
      c => normalizeNumber(c.number) === numberN
    );
    if (numberExists) {
      toast.error(`Номер "${numberTrim}" вже використовується іншим контактом.`, {
        style: toastErrorStyles,
      });
      return;
    }

    dispatch(addContact({ name: nameTrim, number: numberTrim }));
    actions.resetForm();

    toast.success(`Контакт "${nameTrim}" успішно збережен.`, {
      style: toastSuccessStyles,
    });
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className={styles.form} autoComplete="off">
          <div className={styles.fieldGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <Field
              id="name"
              name="name"
              type="text"
              className={styles.input}
              placeholder="Enter name"
            />
            <ErrorMessage name="name" component="div" className={styles.error} />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="number" className={styles.label}>
              Number
            </label>
            <Field
              id="number"
              name="number"
              type="tel"
              className={styles.input}
              placeholder="123-45-67"
            />
            <ErrorMessage
              name="number"
              component="div"
              className={styles.error}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting || !dirty || !isValid}
            >
              Add contact
            </button>
            <span className={styles.hint}>Format: 123-45-67</span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
