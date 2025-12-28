import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FaPhoneAlt } from 'react-icons/fa';

import styles from './Contact.module.css';
import { deleteContact } from '../../../../redux/contactsSlice';

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));
  };

  return (
    <li className={styles.item}>
      <div className={styles.info}>
        <div className={styles.nameRow}>
          <p className={styles.name}>{contact.name}</p>
          <span className={styles.badge}>Contact</span>
        </div>
        <div className={styles.numberRow}>
          <FaPhoneAlt color="rgba(234, 240, 255, 0.65)" />
          <p className={styles.number}>{contact.number}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDelete}
        className={styles.deleteBtn}
        aria-label={`Delete ${contact.name}`}
      >
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;
