import React, { Component } from "react";
import './index.css'
export default class Item extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="left">
                    <input type="checkbox" />
                    <span>xxxx</span>
                </div>
                <button className="deleteButton">删除</button>
            </div>
        )
    }
}