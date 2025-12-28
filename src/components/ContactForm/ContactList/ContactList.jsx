import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Contact from './Contact/Contact';
import styles from './ContactList.module.css';
import { selectContacts } from '../../../redux/contactsSlice';
import { selectNameFilter } from '../../../redux/filtersSlice';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectNameFilter);

  const filteredContacts = useMemo(() => {
    const normalized = filter.trim().toLowerCase();
    if (!normalized) return contacts;
    return contacts.filter(c => c.name.toLowerCase().includes(normalized));
  }, [contacts, filter]);

  return (
    <ul className={styles.list}>
      {filteredContacts.map(contact => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </ul>
  );
};

export default ContactList;
