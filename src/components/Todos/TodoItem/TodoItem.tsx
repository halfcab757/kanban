import { Fragment, useState, useContext } from 'react';

import classes from './TodoItem.module.css';
import Tip from '../Tip/Tip';
import Button from '../../UI/Button/Button';
import CloseButton from '../../UI/CloseButton/CloseButton';
import { TodosContext } from '../../../store/todos-context';

const TodoItem: React.FC<{ title: string; status: string; id: string }> = (
  props
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [doneText, setDoneText] = useState('DONE?'); // const [isDeleting, setIsDeleting] = useState(false);
  const [tipText, setTipText] = useState('INVISIBLE');
  const todosCtx = useContext(TodosContext);

  const changeTipText = (text: string) => {
    setTipText(text);
  };

  const resetTipText = () => {
    setTipText('INVISIBLE');
  };

  const toggleEditHandler = () => {
    if (!isEditing) {
      setTipText('MOVE TO DOING');
    }
    setIsEditing((prevState) => {
      return !prevState;
    });
  };

  const toggleDoneText = () => {
    console.log('toggling text');
    if (doneText === 'DONE?') {
      setDoneText('DONE!');
    }

    if (doneText === 'DONE!') {
      setDoneText('DONE?');
    }
  };

  let editActions = (
    <div className={classes.actions}>
      <Button
        tipText=""
        onEnter={changeTipText.bind(null, 'MOVE TO DOING')}
        onLeave={resetTipText}
        type="button"
        color="green"
        size="regular"
        clickHandler={todosCtx.moveItem.bind(null, props.id, 'DOING')}
      >
        MOVE TO DOING
      </Button>
      <Button
        tipText=""
        onEnter={changeTipText.bind(null, 'MOVE TO DONE')}
        onLeave={resetTipText}
        type="button"
        color="green"
        size="regular"
        clickHandler={todosCtx.moveItem.bind(null, props.id, 'DONE')}
      >
        MOVE TO DONE
      </Button>
      {/* <button onMouseOver={toggleDoneText} onMouseLeave={toggleDoneText}>{doneText}</button> */}
      <Button
        tipText=""
        onEnter={changeTipText.bind(null, 'DELETE')}
        onLeave={resetTipText}
        type="button"
        color="red"
        size="regular"
        // clickHandler={todosCtx.deleteTodo.bind(null, props.id)}
        clickHandler={todosCtx.startDeleteHandler.bind(
          null,
          props.id,
          props.title
        )}
      >
        DELETE TO DO
      </Button>
      {/* <Button type="button" color="red" size='regular' clickHandler={toggleEditHandler}>
        CANCEL EDITING
      </Button> */}
    </div>
  );

  if (props.status === 'DOING') {
    editActions = (
      <div className={classes.actions}>
        <Button
          tipText=""
          onEnter={() => {}}
          onLeave={() => {}}
          type="button"
          color="red"
          size="regular"
          clickHandler={todosCtx.moveItem.bind(null, props.id, 'NEW')}
        >
          ONE BACK
        </Button>
        <Button
          tipText="MOVE TO DOING"
          onEnter={() => {}}
          onLeave={() => {}}
          type="button"
          color="green"
          size="regular"
          clickHandler={todosCtx.moveItem.bind(null, props.id, 'DONE')}
        >
          MOVE TO DONE
        </Button>
        <Button
          tipText=""
          onEnter={() => {}}
          onLeave={() => {}}
          type="button"
          color="red"
          size="regular"
          clickHandler={todosCtx.startDeleteHandler.bind(
            null,
            props.id,
            props.title
          )}
        >
          DELETE TO DO
        </Button>
        {/* <Button type="button" color="red" size='regular' clickHandler={toggleEditHandler}>
          CANCEL EDITING
        </Button> */}
      </div>
    );
  }

  if (props.status === 'DONE') {
    editActions = (
      <div className={classes.actions}>
        <Button
          tipText=""
          onEnter={() => {}}
          onLeave={() => {}}
          type="button"
          color="green"
          size="regular"
          clickHandler={todosCtx.moveItem.bind(null, props.id, 'DOING')}
        >
          ONE BACK
        </Button>
        <Button
          tipText=""
          onEnter={() => {}}
          onLeave={() => {}}
          type="button"
          color="red"
          size="regular"
          clickHandler={todosCtx.moveItem.bind(null, props.id, 'NEW')}
        >
          TWO BACK
        </Button>
        <Button
          tipText=""
          onEnter={changeTipText.bind(null, 'DELETE')}
          onLeave={resetTipText}
          type="button"
          color="red"
          size="regular"
          // clickHandler={todosCtx.deleteTodo.bind(null, props.id)}
          clickHandler={todosCtx.startDeleteHandler.bind(
            null,
            props.id,
            props.title
          )}
        >
          DELETE TO DO
        </Button>
      </div>
    );
  }

  return (
    <li>
      <div className={classes.item} id={props.id}>
        <h3>{props.title}</h3>
        {!isEditing && (
          <div className={classes.actions}>
            <Button
              tipText=""
              onEnter={changeTipText.bind(null, 'EDIT THIS ITEM')}
              onLeave={resetTipText}
              type="button"
              color="green"
              size="small"
              clickHandler={toggleEditHandler}
            >
              Edit
            </Button>
            {/* <Tip text={tipText} /> */}
          </div>
        )}
        
        {/* {isEditing && <Tip text={tipText} />} */}
        {/* show tip like on asana */}
        {isEditing && (
          <CloseButton
            clickHandler={toggleEditHandler}
            onEnter={changeTipText.bind(null, 'CANCEL EDITING')}
            onLeave={resetTipText}
          />
        )}
        {isEditing && editActions}
      </div>
    </li>
  );
};

export default TodoItem;
