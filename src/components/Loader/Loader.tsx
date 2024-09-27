import ripple from './assets/ripple.svg';
import styles from './Loader.module.scss';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <img src={ripple} alt="Loader animation" />
    </div>
  );
};
