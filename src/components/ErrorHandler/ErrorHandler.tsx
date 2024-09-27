import { QueryResponseProps } from '../../types.ts';
import styles from './ErrorHandler.module.scss';

export const ErrorHandler = ({ error }: Pick<QueryResponseProps, 'error'>) => {
  console.log(error?.message);

  return (
    <div role="alert" className={styles.errorHandler}>
      <h4 className={styles.errorHandler__title}>Something went wrong:</h4>
      <pre className={styles.errorHandler__description}>{error?.message}</pre>
      <button onClick={resetErrorHandle}>Try again</button>
    </div>
  );

  function resetErrorHandle() {
    window.location.reload();
  }
};
