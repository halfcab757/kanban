import classes from './Navigation.module.css';

const Navigation: React.FC<{
  showHandler: () => void;
  hideHandler: () => void;
  shown: boolean;
}> = (props) => {
  const homeLinkClasses = `${classes.navigation__link} ${
    !props.shown && classes['navigation__link--active']
  }`;
  const aboutLinkClasses = `${classes.navigation__link} ${
    props.shown && classes['navigation__link--active']
  }`;

  return (
    <div className={classes.navigation}>
      <div className={classes.navigation__links}>
        <span className={homeLinkClasses} onClick={props.hideHandler}>
          GET THINGS DONE
        </span>
        <span className={aboutLinkClasses} onClick={props.showHandler}>
          ABOUT THIS APP
        </span>
      </div>
    </div>
  );
};

export default Navigation;
