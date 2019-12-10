import React from 'react'
import PageTitle from '../../fontStyles/PageTitle'
import FormWrapper from './CreateTodoStyles';
import TodoService from '../../services/TodoService';
import Todo from '../Todo/Todo';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.todoService = new TodoService();
  }

  state = {
    name: '',
    description: '',
    show: false,
    todos: null
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value })
  }

  handleSubmit = (e) => {
    const { name, description } = this.state;
    e.preventDefault();
    this.todoService.createTodo({name, description})
      .then(
        () => {
          this.setState({...this.state, name: '', description: ''})
          this.updateTodos()
        },
        (error) => console.error(error))
  }

  displayTodos = () => {
    const { todos } = this.state;
    // <Todo key={i} name={todo.name} description={todo.description} done={todo.done} />
    return todos.map((todo, i) => <Todo key={i} {...todo} updateTodos={this.updateTodos} />)
  }

  componentDidMount() {
    this.updateTodos()
  }
  
  updateTodos = () => {
    this.todoService.fetchTodos()
      .then(
        (todos) => {
          this.setState({ ...this.state, todos })
        },
        (error) => {
          const { message } = error;
          console.error(message)
        }
      )
  }
  toggleShow = () => {
    const { show } = this.state;
    this.setState({...this.state, show: !show})
  }

  render() {
    const { loggedInUser } = this.props;
    const { name, description, show, todos } = this.state;
    return (
      <div>
        <PageTitle color="black">{`Todo List from ${loggedInUser.username} (${todos ? todos.length : 0})`}</PageTitle>
        
        <div className="container">
          <div>
            <img src={loggedInUser.picture} alt=""/>
          </div>
          <button className="show-button" onClick={this.toggleShow}>{show ? 'Hide form' : 'Show form'}</button>
          <FormWrapper onSubmit={this.handleSubmit} show={show}>
            <p>Create todo:</p>
            <div>
              <label>Todo Name:</label><input type="text" name="name" onChange={this.handleChange} value={name} />
            </div>
            <div>
              <label htmlFor="description">Description:</label> <input type="text" name="description" onChange={this.handleChange} value={description} />
            </div>
            <input type="submit" value="Create" className="submit-button" />
          </FormWrapper>
        </div>
        <div className="todos-container">
          {todos && this.displayTodos()}
          {!todos && <p>Loading...</p> }
        </div>
      </div>
    )
  }
}

export default TodoList;