import React, { Component } from "react";
import {nanoid} from 'nanoid'
import './index.css'
export default class Header extends Component {
    add = (event) => {
        if (event.keyCode === 13) return
        const { todoList } = this.props
        const newTodo = { id: nanoid(), name: event.target.value, done: false }
        return { ...todoList, newTodo }
    }
    render() {
        return (
            <input type="text" placeholder="请输入你的任务，并回车以创建" className="headerInput" onKeyUp={this.add} />
        )
    }
}