import React, {Component} from "react";
import './index.css'
export default class Footer extends Component{
    render(){
        return (
            <div className="wrapper">
                <div className="left">
                    <input type="checkbox" />
                    <span>1/2</span>
                </div>
                <button className="cleanDone">清除已完成任务</button>
            </div>
        )
    }
}