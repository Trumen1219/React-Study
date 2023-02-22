import React, { Component } from "react";
import './index.css'
export default class Footer extends Component {
    deleteDone = () => {
        this.props.handlerDoneDelete()
    }
    allChecked = (event)=>{
        this.props.handlerAllChecked(event.target.checked)
    }
    render() {
        const { todoList } = this.props
        const number = todoList.reduce((pre, current) => {
            return pre + (current.done  ? 1 : 0)
        }, 0)
        const total = todoList.length
        return (
            <div className="wrapper">
                <div className="left">
                    <input type="checkbox" onChange = {this.allChecked} checked={number === total}/>
                    <span>{number}/{total}</span>
                </div>
                <button onClick={this.deleteDone} className="cleanDone">清除已完成任务</button>
            </div>
        )
    }
}