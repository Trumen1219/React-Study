import React, { Component } from "react";
import './index.css'
export default class Item extends Component {
    state = {
        mouse: false
    }

    handlerEnter = (flag) => {
        return () => {
            this.setState({ mouse: flag })
        }
    }

    handlerLeave = (flag) => {
        return () => {
            this.setState({ mouse: flag })
        }
    }

    deleteCurrent = (id) => {
        return () => {
            if (window.confirm(`确定吗？`)) {
                this.props.handlerDelete(id)
            }
        }
    }

    changeChecked = (id) => {
        return (event)=>{
            this.props.handlerChangeDone(id,event.target.checked)
        }
    }
    render() {
        const { name, done, id } = this.props
        const { mouse } = this.state
        return (
            <div className="wrapper" onMouseEnter={this.handlerEnter(true)} onMouseLeave={this.handlerLeave(false)} style={{ backgroundColor: mouse ? '#ddd' : 'white' }}>
                <div className="left">
                    <input type="checkbox" checked={done} onChange={this.changeChecked(id)} />
                    <span>{name}</span>
                </div>
                <button onClick={this.deleteCurrent(id)} className="deleteButton" style={{ display: mouse ? 'block' : 'none' }}>删除</button>
            </div>
        )
    }
}