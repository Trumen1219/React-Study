import React, { Component } from "react";
import{nanoid}from'nanoid'
import './index.css'

export default class Header extends Component {
    handlerKeyUp=(event)=> {
        const {keyCode,target} = event
        if(keyCode!==13) return
        if(target.value.trim() === ''){
            alert('请输入')
            return
        }
        this.props.handlerAdd({
            id: nanoid(),
            name: target.value,
            done: false
        })
        target.value = ''
    }
    render() {
        return <input className="headerInput" onKeyUp={this.handlerKeyUp} type="text" placeholder="请输入任务，回车以添加到列表中" />
    }
}