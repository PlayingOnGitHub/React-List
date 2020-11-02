import React from 'react';
import uniqid from 'uniqid';

const ShowEditingBox = (props) => {
    const { id, value, handleTaskTextArrayInput, focusHere } = props;
    React.useEffect(() => {
        if (focusHere == id) {
            document.getElementById(id).focus();
        }
    })
    return(
        <input
            type="text" 
            id={id} 
            onChange={handleTaskTextArrayInput}
            value={value} 
         />
    )
}

const ShowTask = (props) => {
    return(
        <div>
            {props.task}
        </div>
    )
}

const List = (props) => {
    const { tasks, editing, taskTextArray, handleTaskTextArrayInput, focusHere, deleteItem } = props;
    function showActionItem(currentIndex) {
        if (editing[currentIndex] === "editing") {
            return(
                <a href="#" onClick={props.handleAcceptChangesButton}>
                    <i className="far fa-check-square" id={"edit-"+currentIndex}></i>
                </a>
            )
        }
        else {
            return(
                <a href="#" onClick={props.handleEditButton}>
                    <i className="fas fa-edit" id={"edit-"+currentIndex}></i>
                </a>
            )
        }
    }
    function ShowOrEditTask(currentIndex) {
        if ( editing[currentIndex] == "editing" ) {
            return(
                <ShowEditingBox 
                    id={"box-"+currentIndex} 
                    handleTaskTextArrayInput={handleTaskTextArrayInput} 
                    value={taskTextArray[currentIndex]} 
                    focusHere={focusHere}
                />
            )
        }
        else {
            return(
                <ShowTask task={tasks[currentIndex]} />
            )
        }
    }
    return(
        <ul className="list-group">
            {
                tasks.map((task, currentIndex) => {
                    return (
                            <li 
                                key={uniqid()} 
                                className="
                                    list-group-item 
                                    d-flex 
                                    justify-content-between 
                                    align-items-center
                                "
                            >
                                <div>
                                    {ShowOrEditTask(currentIndex)}
                                </div>
                                <span>
                                    {showActionItem(currentIndex)}
                                    <a href="#" className="ml-1">
                                        <i 
                                            className="far fa-trash-alt" 
                                            id={"delete-"+currentIndex}
                                            onClick={deleteItem}
                                        >
                                        </i>
                                    </a>
                                </span>
                            </li>
                    )
                })
            }
            {

            }
        </ul>
    )
}

export default List;
