import React from 'react';
import styles from './App.module.scss';
import { useCommonContext } from './CommonContext.tsx';
import isEmpty from 'lodash.isempty';
import { ComponentsRenderer } from './components/ComponentsRenderer/ComponentsRenderer.tsx';

function App() {
  const [showPanel, setShowPanel] = React.useState(false);
  // @ts-ignore
  const { isPending, error, commonPageSchema } = useCommonContext();

  return (
    <div className={styles.app}>
      {isEmpty(commonPageSchema) && !showPanel ? (
        <div className={styles.app__container}>
          <h2 className={styles.app__demoTitle}>Start here...</h2>
          <div className={styles.app__demoPanel}>
            <button className={styles.app__demoButton} onClick={onClick}>
              Get components
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.app__container}>
          {isPending && isEmpty(commonPageSchema) && <p>Loading...</p>}
          {error && <p>{`An error has occurred: ${error.message}`}</p>}
          {!isEmpty(commonPageSchema) && <ComponentsRenderer />}
        </div>
      )}
    </div>
  );

  function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setShowPanel(true);
  }
}

export default App;
