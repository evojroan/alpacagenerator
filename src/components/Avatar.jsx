import styles from './CSS/Avatar.module.css';
import { useEffect } from 'react';

export default function Avatar({ appearance }) {
  //<img> draw Alpaca
  function drawAlpaca(data) {
    return Object.entries(data).map(([key, value], index) =>
      value === 'None' || value === '' ? (
        ''
      ) : (
        <img
          key={index}
          className={styles[key.toLocaleLowerCase()]}
          src={require(`images/${key.toLocaleLowerCase()}/${value.toLocaleLowerCase()}.png`)}
          alt={key}
          id={key.toLocaleLowerCase() + value.toLocaleLowerCase()}
        />
      )
    );
  }

  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const parts = [
      'Backgrounds',
      'Ears',
      'Neck',
      'Nose',
      'Hair',
      'Leg',
      'Eyes',
      'Mouth',
      'Accessories'
    ];
    const images = {};
    let loadedCount = 0;

    parts.forEach(part => {
      if (appearance[part] && appearance[part] !== 'None') {
        images[part] = new Image();

        images[part].onload = () => {
          loadedCount++;
          if (loadedCount === parts.length) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            parts.forEach(part => {
              if (images[part]) {
                context.drawImage(images[part], 0, 0);
              }
            });
          }
        };

        import(
          `../images/${part.toLowerCase()}/${appearance[
            part
          ].toLowerCase()}.png`
        ).then(module => {
          images[part].src = module.default;
        });
      } else {
        loadedCount++;
      }
    });
  }, [appearance]);

  return (
    <div className={styles.avatar}>
      <canvas
        className={styles.canvas}
        height='720'
        width='720'
        id='canvas'></canvas>
    </div>
  );
}
