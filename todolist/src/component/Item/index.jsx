import React, { Component } from "react";
import './index.css'
import PropTypes from 'prop-types'

export default class Item extends Component {
    static propTypes = {
        handlerChangeCheck: PropTypes.func.isRequired,
        handlerDelete: PropTypes.func.isRequired
    }
    state = { mouse: false }
    handlerMouse = (flag) => {
        return () => {
            this.setState({ mouse: flag })
        }
    }
    handlerChange = (id) => {
        return (event) => {
            this.props.handlerChangeCheck(id, event.target.checked)
        }
    }
    deleteItem = (id) => {
        return ()=>{
            //注意使用的符号
            if(window.confirm(`你确定删除吗？`)){
                this.props.handlerDelete(id)
            }
        }
    }
    render() {
        const { name, id, done} = this.props
        const { mouse } = this.state
        return (
            <li className="todoItem" style={{ backgroundColor: mouse ? '#ddd' : 'white' }} onMouseEnter={this.handlerMouse(true)} onMouseLeave={this.handlerMouse(false)}>
                <div className="wrapper">
                    <input type="checkbox" onChange={this.handlerChange(id)} checked={done} />
                    <span>{name}</span>
                </div>
                <button className="clear" onClick={this.deleteItem(id)} style={{ display: mouse ? 'block' : 'none' }}>删除</button>
            </li>
        )
    }
}