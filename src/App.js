import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List';
import uniqid from 'uniqid';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskText: "",
      editing: [],
      taskTextArray: [],
      focusHere: "add-item-input-box"

    };
    this.handleTaskInput = this.handleTaskInput.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleTaskTextArrayInput = this.handleTaskTextArrayInput.bind(this);
    this.handleAcceptChangesButton = this.handleAcceptChangesButton.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  deleteItem = (e) => {
    console.log(e.target);
    this.setState((prevState) => ({
      tasks:
        (prevState.tasks.filter((currentItem, currentIndex) => {
          if ( e.target.id == ("delete-"+currentIndex) ) {
            return false;
          }
          else {
            return true;
          }
        })),
      editing:
        (prevState.editing.filter((currentItem, currentIndex) => {
          if ( e.target.id == ("delete-"+currentIndex)) {
            return false;
          }
          else {
            return true;
          }
        })),
      taskTextArray:
        (prevState.taskTextArray.filter((currentItem, currentIndex) => {
        if ( e.target.id == ("delete-"+currentIndex)) {
          return false;
        }
        else {
          return true;
        }
      })),

    }));
  }
  handleAcceptChangesButton = (e) => {
    this.setState((prevState) => ({
      /* need to change editing to no.. need to update tasks array.. need to update taskTextArray..
         update focusHere to add-item-input-box to "".... 
      */
      tasks:
        (prevState.tasks.map((task, currentIndex) => {
          if ("edit-"+currentIndex == e.target.id) {
            return prevState.taskTextArray[currentIndex];
          }
          else {
            return task;
          }
        })),
      editing:
        (prevState.editing.map((editItem, currentIndex) => {
          if ("edit-"+currentIndex == e.target.id) {
            return "not-editing";
          }
          else {
            return editItem;
          }
        })),

    }));
  }
  handleTaskTextArrayInput(e) {
    this.setState((prevState) => ({
      taskTextArray:
        (prevState.taskTextArray.map((taskText, currentIndex) => {
          if (("box-"+currentIndex) == e.target.id) {
            return e.target.value;
          }
          else {
            return taskText;
          }
        })),
      focusHere: e.target.id

    }));
  }
  handleTaskInput(e) {
    this.setState({
      taskText: e.target.value,
      focusHere: "add-item-input-box"
    })
  }
  addTask(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      tasks: prevState.tasks.concat(this.state.taskText),
      editing: prevState.editing.concat("not-editing"),
      taskText: "",
      taskTextArray: prevState.taskTextArray.concat(this.state.taskText),
      focusHere: "add-item-input-box"
    }));
  }
  handleEditButton(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      editing: 
        (prevState.editing.map((task, currentIndex) => {
          if (("edit-"+currentIndex) == e.target.id) {
            return "editing";
          }
          else {
            return task;
          }
        })),
    }));

  }
  render() {
    const { 
      tasks, 
      taskText, 
      editing, 
      taskTextArray,  
      focusHere, 
    } = this.state;
    console.log(this.state);
    return(
      <div className="mt-4 ml-4 col-7">
        <form role="form">
          <div className="input-group">
            <label htmlFor="add-item-input-box" />
            <input 
              type="text" 
              className="form-control" 
              id="add-item-input-box" 
              placeholder="Add Item" 
              onChange={this.handleTaskInput.bind(this)}
              value={taskText}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" id="addItem" onClick={this.addTask.bind(this)}>Submit</button>
            </div>
          </div>
        </form>
        <List 
          tasks={tasks} 
          handleEditButton={this.handleEditButton.bind(this)} 
          editing={editing}
          taskTextArray={taskTextArray} 
          handleTaskTextArrayInput={this.handleTaskTextArrayInput.bind(this)} 
          focusHere={focusHere} 
          handleAcceptChangesButton={this.handleAcceptChangesButton.bind(this)}
          deleteItem={this.deleteItem.bind(this)}
        />
      </div>
    );
  }
}

export default App;
