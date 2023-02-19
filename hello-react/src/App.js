// import logo from './logo.svg';
import {Component} from "react";
import './App.css';
import Welcome from './component/Welcome'
import Hello from './component/Hello'
export default class App extends Component{
  render(){
    return (
      <div>
        <Welcome />
        <Hello/>
      </div>
    )
  }
}