import lensImg from './assets/lenth.svg';
import styles from './CheckboxListSearch.module.scss';

export function CheckboxListSearch({
  value,
  placeholder = 'Search...',
  onChange,
}: {
  value: string;
  placeholder?: string;
  onChange: (searchString: string) => void;
}) {
  return (
    <div className={styles.checkboxListSearch}>
      <input
        className={styles.checkboxListSearch__input}
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <span className={styles.checkboxListSearch__lenth}>
        <img src={lensImg} alt={`${placeholder} - icon`} />
      </span>
    </div>
  );
}
