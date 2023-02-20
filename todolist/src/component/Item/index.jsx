import React, { Component } from "react";
import './index.css'

export default class Item extends Component {
    render() {
        return (
            <li className="todoItem">
                <input type="checkbox" />
                <span>xxxxxxxx</span>
                <button>删除</button>
            </li>
        )
    }
}