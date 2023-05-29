//Options.jsx

import styles from './CSS/Options.module.css';

export default function Options({ title, allbts, clickme, selectedCategory }) {
  const optionbts = allbts.map(x => {
    return x === selectedCategory ? (
      <button
        className={styles.buttonSelected}
        key={x}
        onClick={() => {
          clickme(x);
        }}>
        {x}
      </button>
    ) : (
      <button
        className={styles.button}
        key={x}
        onClick={() => {
          clickme(x);
        }}>
        {x}
      </button>
    );
  });

  return (
    <div className={styles.options}>
      <h5>{title}</h5>
      <div className={styles.buttonZone}>{optionbts}</div>
    </div>
  );
}
