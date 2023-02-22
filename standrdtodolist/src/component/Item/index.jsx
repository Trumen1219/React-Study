import React, { Component } from "react";
import './index.css'
export default class Item extends Component {
    render() {
        const { name, done } = this.props
        return (
            <div className="wrapper">
                <div className="left">
                    <input type="checkbox" defaultChecked={done} />
                    <span>{name}</span>
                </div>
                <button className="deleteButton">删除</button>
            </div>
        )
    }
}