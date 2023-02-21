import React, { Component } from "react";
import './index.css'
import PropTypes from 'prop-types'

export default class Footer extends Component {
    static propTypes = {
        handlerAllCheck: PropTypes.func.isRequired
    }
    allChecked = (event) => {
        this.props.handlerAllCheck(event.target.checked)
    }
    cleanAll = (event) => {
        this.props.cleanAllCheck(event.target.checked)
    }
    render() {
        const { todos } = this.props
        const doneCount = todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0), 0)
        const total = todos.length
        return (
            <div className="todoFooter">
                <div className="Wrapper">
                    <input type="checkbox" onChange={this.allChecked} checked={doneCount === total ? true : false}/>
                    <span>{ doneCount }/{ total }</span>
                </div>
                <button onClick={this.cleanAll} className="allClear">清除已完成选项</button>
            </div>
        )
    }
}