import React, { Component } from "react";
import {nanoid} from 'nanoid'
import './index.css'
export default class Header extends Component {
    add = (event) => {
        if (event.keyCode !== 13) return
        if( event.target.value.trim() === ''){
            alert('请不要输入空值')
            return
        }
        this.props.handlerAdd({ id: nanoid(), name: event.target.value, done: false })
        event.target.value = ''
    }
    render() {
        return (
            <input type="text" placeholder="请输入你的任务，并回车以创建" className="headerInput" onKeyUp={this.add} />
        )
    }
}