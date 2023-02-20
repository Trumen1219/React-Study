import React, { Component } from "react";
import './index.css'

export default class Footer extends Component {
    render() {
        return (
            <div className="todoFooter">
                <input type="checkbox" />
                <span>1/3</span>
                <button>清除已完成选项</button>
            </div>
        )
    }
}