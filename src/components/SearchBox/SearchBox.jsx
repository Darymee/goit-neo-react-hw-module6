import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchBox.module.css';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';

const SearchBox = () => {
  const dispatch = useDispatch();
  const value = useSelector(selectNameFilter);

  const handleChange = e => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="search" className={styles.label}>
        Find contacts by name
      </label>

      <input
        id="search"
        name="search"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type to search..."
        className={styles.input}
        autoComplete="off"
      />

      <div className={styles.hint}>Search is case-insensitive</div>
    </div>
  );
};

export default SearchBox;
