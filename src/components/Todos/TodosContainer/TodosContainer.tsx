import classes from './TodosContainer.module.css';

const TodosContainer: React.FC = (props) => {
    return (
        <div className={classes.container}>
            {props.children}
        </div>
    );
}

export default TodosContainer;