import React, { Component } from "react";
import Item from "../Item";
export default class List extends Component {
    render() {
        const { todoList, handlerChangeDone} = this.props
        const { handlerDelete } = this.props
        return (
            <ul className="todo-main">
                {
                    todoList.map((todo) => {
                        return <Item key={todo.id} {...todo} handlerDelete={handlerDelete} handlerChangeDone={handlerChangeDone}/>
                    })
                }
            </ul>
        )
    }
}