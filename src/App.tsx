import React from 'react';
import styles from './App.module.scss';

import { CommonContextProvider } from './CommonContext.tsx';

import { DemoBlock } from './components/DemoBlock/DemoBlock.tsx';
import { ComponentsRenderer } from './components/ComponentsRenderer/ComponentsRenderer.tsx';

function App() {
  const [showPanel, setShowPanel] = React.useState(false);

  if (!showPanel) {
    return (
      <div className={styles.app}>
        <div className={styles.app__container}>
          <DemoBlock
            demoTitle="Start here..."
            demoButtonText={'Get components'}
            onButtonClick={() => setShowPanel(true)}
          />
        </div>
      </div>
    );
  }

  return (
    <CommonContextProvider>
      <div className={styles.app}>
        <div className={styles.app__container}>
          <ComponentsRenderer />
        </div>
      </div>
    </CommonContextProvider>
  );
}

export default App;
