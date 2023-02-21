import React, { Component } from 'react';
import Header from '../src/component/Header';
import Footer from '../src/component/Footer';
import List from '../src/component/List';
import './App.css';

export default class App extends Component {
  state = {
    todos: [
      { id: '001', done: false, name: '洗碗' },
      { id: '002', done: false, name: '擦碗' }
    ]
  }
  handlerAdd = (todoObj) => {
    const { todos } = this.state
    const newObj = [todoObj, ...todos]
    this.setState({ todos: newObj })
  }
  handlerChangeCheck = (id, done) => {
    const { todos } = this.state
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done: done }
      }
      else {
        return todo
      }
    })
    this.setState({ todos: newTodos })
  }
  handlerDelete = (id) => {
    //注意该不该有符号！
      const { todos } = this.state
      const newtodos = todos.filter((todo)=>{
        return todo.id !== id
      })
      this.setState({todos: newtodos})
  }
  handlerAllCheck=(done)=>{
    const { todos } = this.state
    const newtodos = todos.map((todo)=>{
      return {...todo,done:done}
    })
    this.setState({todos: newtodos})
  }
  cleanAllCheck=()=>{
    const {todos} = this.state
    const newtodos = todos.filter((todo)=>{
      return !todo.done
    })
    this.setState({todos: newtodos})
  }
  render() {
    const { todos } = this.state
    return (
      <div className="App">
        <Header handlerAdd={this.handlerAdd} />
        <List todos={todos} handlerChangeCheck={this.handlerChangeCheck} handlerDelete={this.handlerDelete} />
        <Footer todos={todos} handlerAllCheck={this.handlerAllCheck} cleanAllCheck={this.cleanAllCheck}/>
      </div>
    )
  }
}