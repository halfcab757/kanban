import classes from './Welcome.module.css';

import Modal from '../UI/Modal/Modal';
// import Button from '../UI/Button/Button';

const Welcome: React.FC<{onClose: () => void;}> = (props) => {
  return (
    <Modal background='#F0F4FD' onClose={props.onClose}>
      <div className={classes.welcome}>
        <h2 className={classes.welcome__title}>Thanks for taking a look at my Kanban web app!</h2>
        <p className={classes.welcome__content}>
          I built it in December 2021 to practice React in combination with
          TypeScript.
        </p>
        <p>
          You find a link to my code for this web app as well as my contact in the "About this app" section
        </p>
        <p>
            I hope you like this app and I would be happy to receive your feedback!
        </p>
        <p>
          Kind regards
          <br />
          Martin Hodsman
        </p>
      </div>
      <button className={classes.welcome__button} onClick={props.onClose}>GO TO WEB APP</button>
    </Modal>
  );
};

export default Welcome;
