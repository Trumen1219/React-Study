import React, { Component } from "react";
import Item from "../Item";
export default class List extends Component {
    render() {
        return (
            <div>
                <Item></Item>
                <Item></Item>
                <Item></Item>
            </div>
        )
    }
}