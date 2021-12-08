import classes from './ShowButton.module.css';

const ShowButton: React.FC<{ type: 'down' | 'up' ; clickHandler: () => void}> = (props) => {

    let icon = <i className='fas fa-arrow-circle-down'></i>;

    if (props.type === 'up') {
        icon = <i className='fas fa-arrow-circle-up'></i>
    }

    return (
        <button className={classes.button} onClick={props.clickHandler}>
           {icon} 
        </button>
    );
}

export default ShowButton;
