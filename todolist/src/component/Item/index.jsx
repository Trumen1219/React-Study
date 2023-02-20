import React, { Component } from "react";
import './index.css'

export default class Item extends Component {
    render() {
        const {name,done} = this.props
        return (
            <li className="todoItem">
                <input type="checkbox" defaultChecked={done}/>
                <span>{name}</span>
                <button className="clear">删除</button>
            </li>
        )
    }
}