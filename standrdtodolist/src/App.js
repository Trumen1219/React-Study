import React, { Component } from 'react';
import Header from './component/Header';
import List from './component/List';
import Footer from './component/Footer';
import './App.css';

export default class App extends Component {
  state = {
    todoList: [
      {
        id: '001',
        name: '写作业',
        done: false
      },
      {
        id: '002',
        name: '吃饭',
        done: false
      }
    ]
  }
  handlerAdd = (todo) => {
    const { todoList } = this.state
    //注意这里是数组
    const newTodo = [todo, ...todoList]
    this.setState({ todoList: newTodo })
  }

  handlerDelete = (id) => {
    const { todoList } = this.state
    const newTodo = todoList.filter((todo) => {
      return todo.id !== id
    })
    this.setState({ todoList: newTodo })
  }

  handlerDoneDelete=()=>{
    const { todoList } = this.state
    const newTodo = todoList.filter((todo)=>{
      return todo.done === false
    })
    this.setState({todoList: newTodo})
  }

  handlerChangeDone=(id,done)=>{
    const { todoList } = this.state
    const newTodo = todoList.map((todo)=>{
      if(todo.id === id){
        return {...todo,done: done}
      }
      else{
        return todo
      }
    }) 
    this.setState({todoList: newTodo})
  }

  handlerAllChecked=(flag)=>{
    const {todoList} = this.state
    const newTodo = todoList.map((todo)=>{
        return {...todo, done:flag}
    })
    this.setState({todoList: newTodo})
  }

  render() {
    const { todoList } = this.state
    return (
      <div className="App">
        <Header todoList={todoList} handlerAdd={this.handlerAdd}></Header>
        <List todoList={todoList} handlerDelete={this.handlerDelete} handlerChangeDone={this.handlerChangeDone}></List>
        <Footer todoList={todoList} handlerDoneDelete={this.handlerDoneDelete} handlerAllChecked={this.handlerAllChecked}></Footer>
      </div>
    );
  }
}
