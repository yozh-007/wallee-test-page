import React from 'react';
import styles from './CheckboxList.module.scss';

export function CheckboxList({ children }: React.PropsWithChildren) {
  return <ul className={styles.checkboxList}>{children}</ul>;
}
