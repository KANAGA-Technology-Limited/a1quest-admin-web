import styles from './style.module.css';

const LoadingIndicator = ({
  text,
  size = 30,
  align = 'flex-start',
}: {
  text?: string;
  size?: number;
  align?: 'flex-start' | 'flex-end' | 'center';
}) => {
  return (
    <div
      className={styles.container}
      style={{
        alignItems: align,
      }}
    >
      <div
        className={styles.loader}
        style={{
          height: size,
          width: size,
        }}
      />
      {text && <span>{text}</span>}
    </div>
  );
};

export default LoadingIndicator;
