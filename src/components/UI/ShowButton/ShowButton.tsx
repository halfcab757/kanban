import classes from './ShowButton.module.css';

const ShowButton: React.FC<{ type: 'down' | 'up' | 'clean' ; clickHandler: () => void}> = (props) => {

    let icon = <i className='fas fa-arrow-circle-down'></i>;

    if (props.type === 'up') {
        icon = <i className='fas fa-arrow-circle-up'></i>;
    }

    if (props.type === 'clean') {
        icon = <i className="fas fa-trash-alt"></i>;
    }

    return (
        <button className={classes.button} onClick={props.clickHandler}>
           {icon} 
        </button>
    );
}

export default ShowButton;
