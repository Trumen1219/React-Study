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
  handlerAdd = () => {

  }
  render() {
    const { todoList } = this.state
    return (
      <div className="App">
        <Header todoList={todoList} handlerAdd={this.handlerAdd}></Header>
        <List todoList={todoList}></List>
        <Footer></Footer>
      </div>
    );
  }
}
