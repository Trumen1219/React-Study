import React, { Component } from "react";
export default class Item extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="left">
                    <input type="checkbox" />
                    <span>xxxx</span>
                </div>
                <button>删除</button>
            </div>
        )
    }
}