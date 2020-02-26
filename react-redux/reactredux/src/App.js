import React from "react";
import { combineReducers } from "redux";
import { createStore } from "redux";
import "./App.css";

//Action Type Definitions

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

//Initial State Definition
const initialFilter = "SHOW_ALL";

const initialTodos = {
  visibilityFilter: "SHOW_ALL",
  todos: [
    {
      text: "Pay Utility Bill",
      completed: true
    },
    {
      text: "Initiate Vendor Discussion",
      completed: false
    }
  ]
};

//Action Creator Definitions

function addTodo(text) {
  return { type: ADD_TODO, text };
}

function toggleTodo(index) {
  return { type: TOGGLE_TODO, index };
}

function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

//Reducer Definitions to handle ADD_TODO and TOGGLE_TODO actions
function todos(state = initialTodos, action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
          id: state.length
        }
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }
        return todo;
      });

    default:
      return state;
  }
}
//Reducer Definitions to handle SET_VISIBILITY_FILTER actions
function visibilityFilter(state = initialFilter, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
});

//App.js

let store = createStore(todoApp, window.STATE_FROM_SERVER);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: todoApp.todos,
      todos: [this.todos]
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(e) {
    let curr = e.target.value;
    this.setState({
      input: [curr],
      todos:[[this.state.todos], curr],
    });
  }
  handleClick(e) {
    let store = createStore(todoApp, window.STATE_FROM_SERVER);
let cur = e.target.value;
    this.setState({
      input: [cur],
      todos:[cur, [this.state.todos]],
    });
  }
  render() {
 
    var st = this.state;
 
    const listItems = st.todos.map((todo) =>
    <li key={todo}>{todo}</li>);
    return (
      <div className="App">
       
        <input
          onChange={e => this.handleChange(e)}
          type="text"
          value={this.state.input}
        />
        <button value={this.state.todos} onClick={e => this.handleClick(e)}>Add ToDo</button>

        <p>{this.state.input}</p>
     <ol>{listItems}</ol>
      </div>
    );
  }
}

export default App;
