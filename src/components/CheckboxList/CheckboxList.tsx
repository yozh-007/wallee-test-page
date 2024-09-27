import styles from './CheckboxList.module.scss';

export function CheckboxList(props: any) {
  return <ul className={styles.checkboxList}>{props.children}</ul>;
}
