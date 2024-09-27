import cn from 'classnames';
import checkboxChecked from './assets/checkboxChecked.svg';
import styles from './CheckboxListItem.module.scss';

export interface CheckboxListItemProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  value: string;
  checked: boolean;
  onClick: (value: string, checked: boolean) => void;
}

export function CheckboxListItem({
  title,
  subtitle,
  imageUrl,
  value,
  checked,
  onClick,
}: CheckboxListItemProps) {
  return (
    <label className={styles.checkboxListItem} htmlFor={value}>
      <input
        className={styles.checkboxListItem__checkboxHidden}
        id={value}
        type="checkbox"
        checked={checked}
        onChange={e => {
          e.stopPropagation();
          onClick(value, !checked);
        }}
      />
      <span className={styles.checkboxListItem__checkBoxFake}>
        <span
          className={cn(
            styles.checkboxListItem__checkBoxFakeIcon,
            styles.checkboxListItem__checkBoxFakeIcon_default,
            {
              [styles.checkboxListItem__checkBoxFakeIcon_hide]: checked,
            },
          )}
        />
        <img
          className={cn(
            styles.checkboxListItem__checkBoxFakeIcon,
            styles.checkboxListItem__checkBoxFakeIcon_active,
            {
              [styles.checkboxListItem__checkBoxFakeIcon_show]: checked,
            },
          )}
          src={checkboxChecked}
          alt={'Checkbox checked icon'}
        />
      </span>
      <span className={styles.checkboxListItem__content}>
        <span className={styles.checkboxListItem__title}>{title}</span>
        <span className={styles.checkboxListItem__subtitle}>{subtitle}</span>
      </span>
      <span className={styles.checkboxListItem__image}>
        {imageUrl && <img src={imageUrl} alt={`${title} - icon`} />}
      </span>
    </label>
  );
}
