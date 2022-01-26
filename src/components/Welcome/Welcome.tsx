import Modal from '../UI/Modal/Modal';
import Button from '../UI/Button/Button';

import classes from './Welcome.module.css';

const Welcome: React.FC<{onClose: () => void;}> = (props) => {
  return (
    <Modal background='#F0F4FD' onClose={props.onClose}>
      <div className={classes.welcome}>
        <h2>Thanks for taking a look at my Kanban web app!</h2>
        <p>
          I built it mostly in December 2021 to practice React in combination with
          TypeScript.
        </p>
        <p>
          You will find my contact in the "About this app" section as well as the according code on my github-profile.
        </p>
        <p>
           I would like to hear your feedback!
        </p>
        <p>
          Kind regards
          <br />
          Martin
        </p>
        <Button type='button' clickHandler={props.onClose} tipText='GO TO WEB APP' action='CONFIRM'></Button>
      </div>
    </Modal>
  );
};

export default Welcome;
