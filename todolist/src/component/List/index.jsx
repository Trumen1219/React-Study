import React, { Component } from "react";
import Item from '../Item/index'
import './index.css'
import PropTypes from 'prop-types'
export default class List extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        handlerChangeCheck: PropTypes.func.isRequired,
        handlerDelete: PropTypes.func.isRequired
    }
    render() {
        const { todos, handlerChangeCheck, handlerDelete} = this.props
        return (
            <ul className="todoList">
                {
                    todos.map((todo) => {
                        return <Item key={todo.id} {...todo} handlerDelete={handlerDelete} handlerAdd={this.handlerAdd} handlerChangeCheck={handlerChangeCheck} />
                    })
                }
            </ul>
        )
    }
}