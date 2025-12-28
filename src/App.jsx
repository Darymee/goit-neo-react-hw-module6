import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactForm/ContactList/ContactList';
import SearchBox from './components/SearchBox/SearchBox';

import styles from './App.module.css';
import { selectContacts } from './redux/contactsSlice';

function App() {
  const contacts = useSelector(selectContacts);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Phonebook</h1>
            <p className={styles.subtitle}>Add, find and manage your contacts</p>
          </div>
        </header>

        <main className={styles.grid}>
          <section className={styles.leftCol}>
            <h2 className={styles.sectionTitle}>New contact</h2>
            <ContactForm />
          </section>

          <section className={styles.rightCol}>
            <h2 className={styles.sectionTitle}>Contacts</h2>

            {contacts.length > 0 ? (
              <>
                <SearchBox />
                <ContactList />
              </>
            ) : (
              <p className={styles.empty}>
                No contacts yet. Add your first contact on the left.
              </p>
            )}
          </section>
        </main>

        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </div>
  );
}

export default App;
