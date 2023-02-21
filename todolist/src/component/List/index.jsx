import React, { Component } from "react";
import Item from '../Item/index'
import './index.css'

export default class List extends Component {
    render() {
        const { todos } = this.props
        return (
            <ul className="todoList">
                {
                    todos.map((todo) => {
                        return <Item key={todo.id} {...todo} handlerAdd={this.handlerAdd}/>
                    })
                }
            </ul>
        )
    }
}