import React from 'react'
import TodoCard from './TodoStyles'
import TodoService from '../../services/TodoService'

export default function Todo({ id, name, description, done, updateTodos }) {
  const service = new TodoService()
  const toggleTodo = () => {
    service.updateTodo(id, !done)
    .then(() => {
      updateTodos()
    })
  }
  const deleteTodo = () => {
    service.deleteTodo(id)
    .then(() => {
      updateTodos()
    })
  }
  return (
    <TodoCard done={done} >
      <h3>Todo Name: {name}</h3>
      <p>Todo Description: {description}</p>
      <button onClick={toggleTodo}>{done ? 'Refresh todo' : 'Finish todo'}</button>
      <button onClick={deleteTodo}>🗑</button>
    </TodoCard>
  )
}