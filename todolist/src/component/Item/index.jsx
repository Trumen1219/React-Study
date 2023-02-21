import React, { Component } from "react";
import './index.css'

export default class Item extends Component {
    state = {mouse : false}
    handlerMouse=(flag)=>{
        return ()=>{
            this.setState({mouse: flag})
        }
    }
    render() {
        const {name,done} = this.props
        const { mouse } = this.state
        return (
            <li className="todoItem" style={{ backgroundColor: mouse ? '#ddd' : 'white'}} onMouseEnter={this.handlerMouse(true)} onMouseLeave={this.handlerMouse(false)}>
                <div className="wrapper">
                <input type="checkbox" defaultChecked={done}/>
                <span>{name}</span>
                </div>
                <button className="clear" style={{display : mouse ? 'block' : 'none'}}>删除</button>
            </li>
        )
    }
}