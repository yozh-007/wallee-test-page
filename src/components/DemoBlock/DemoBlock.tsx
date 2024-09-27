import styles from './DemoBlock.module.scss';

interface DemoBlockProps {
  demoTitle?: string;
  demoButtonText?: string;
  onButtonClick: () => void;
}

export const DemoBlock = ({
  demoTitle = 'Demo title',
  demoButtonText = 'Press me!',
  onButtonClick,
}: DemoBlockProps) => {
  return (
    <div className={styles.demoBlock}>
      <h2 className={styles.app__demoTitle}>{demoTitle}</h2>
      <div className={styles.app__demoPanel}>
        <button
          className={styles.app__demoButton}
          type={'button'}
          onClick={onButtonClick}
        >
          {demoButtonText}
        </button>
      </div>
    </div>
  );
};
