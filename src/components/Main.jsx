//Main.jsx
import Avatar from './Avatar.jsx';
import Options from './Options.jsx';
import { useState } from 'react';
import styles from './CSS/Main.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

export default function Main() {
  const allItems = {
    Hair: ['Default', 'Curls', 'Short', 'Bang', 'Elegant', 'Quiff'],
    Ears: ['Default', 'Tilt-backward', 'Tilt-forward'],
    Eyes: ['Default', 'Angry', 'Naughty', 'Panda', 'Smart', 'Star'],
    Mouth: ['Default', 'Astonished', 'Eating', 'Laugh', 'Tongue'],
    Neck: ['Default', 'Thick', 'Bend-backward', 'Bend-forward'],
    Leg: [
      'Default',
      'Bubble-tea',
      'Cookie',
      'Game-console',
      'Tilt-backward',
      'Tilt-forward'
    ],
    Nose: ['Nose'],
    Accessories: ['None', 'Earings', 'Flower', 'Glasses', 'Headphone'],
    Backgrounds: [
      'Blue50',
      'Blue60',
      'Blue70',
      'DarkBlue30',
      'DarkBlue50',
      'DarkBlue70',
      'Green50',
      'Green60',
      'Green70',
      'Grey40',
      'Grey70',
      'Grey80',
      'Red50',
      'Red60',
      'Red70',
      'Yellow50',
      'Yellow60',
      'Yellow70'
    ]
  };

  const randomItem = {};
  Object.keys(allItems).forEach(
    key =>
      (randomItem[key] =
        allItems[key][Math.floor(Math.random() * allItems[key].length)])
  );

  const allItemsNoNose = { ...allItems };
  delete allItemsNoNose.Nose;

  const [selectedCategory, setSelectedCategory] = useState('Hair');

  const [acspage, setAcspage] = useState(allItems.Hair);

  const [alpaca, setAlpaca] = useState({
    Hair: 'Default',
    Ears: 'Default',
    Eyes: 'Default',

    Leg: 'Default',
    Mouth: 'Default',
    Nose: 'Nose',
    Neck: 'Default',
    Accessories: '',
    Backgrounds: 'Blue50'
  });

  function pageHandler(value) {
    setAcspage(allItems[value]);
    setSelectedCategory(value);
  }

  function acsHandler(value) {
    setAlpaca(prevState => ({
      ...prevState,
      [selectedCategory]: value
    }));
  }

  function randomnize() {
    setAlpaca(randomItem);
  }

  function handleDownload() {
    const canvas = document.getElementById('canvas');
    const anchor = document.createElement('a');
    anchor.href = canvas.toDataURL('image/png');
    anchor.download = 'AlpacaImage.png';
    anchor.click();
  }

  return (
    <div className={styles.main}>
      <div className={styles.mainLayout}>
        <h1> Alpaca Generator</h1>
        <div className={styles.mainContent}>
          <div className={styles.mainLeft}>
            <Avatar appearance={alpaca} />
            <div className={styles.mainLeftDown}>
              <button
                onClick={randomnize}
                className={styles.btleft}>
                {' '}
                <FontAwesomeIcon icon={faShuffle} /> Random
              </button>
              <button
                onClick={handleDownload}
                className={styles.btleft}>
                <FontAwesomeIcon icon={faFileArrowDown} /> Download
              </button>
            </div>

            <div className={styles.aboutMe}>
              <h6>About Me</h6>
              <p>Roan, front end engineer</p>
              <p>
                <a
                  href='https://github.com/evojroan'
                  rel='noreferrer'
                  target='_blank'>
                  GitHub
                </a>
              </p>
              <p>
                <a
                  href='https://medium.com/@roan6903'
                  rel='noreferrer'
                  target='_blank'>
                  Medium
                </a>
              </p>
            </div>
          </div>
          <div className={styles.mainRight}>
            <Options
              title={'Accessorize the Alpaca!'}
              allbts={Object.keys(allItemsNoNose)}
              clickme={pageHandler}
              selectedCategory={selectedCategory}
            />
            <Options
              title={'Style'}
              allbts={acspage}
              clickme={acsHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
