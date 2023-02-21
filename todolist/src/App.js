import React,{Component} from 'react';
import Header from '../src/component/Header';
import Footer from '../src/component/Footer';
import List from '../src/component/List';
import './App.css';

export default class App extends Component{
  state = {
    todos:[
      {id:'001',done:false,name:'洗碗'},
      {id:'002',done:false,name:'擦碗'}
    ]
  }
  handlerAdd=(todoObj)=>{
    const {todos} = this.state
    const newObj = [todoObj,...todos]
    this.setState({todos:newObj})
  }
  render(){
    const {todos} = this.state
    return (
      <div className="App">
        <Header handlerAdd={this.handlerAdd}/>
        <List todos={todos}/>
        <Footer/>
      </div>
    )
  }
}