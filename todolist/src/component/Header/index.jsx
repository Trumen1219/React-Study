import React, {Component} from "react";
import './index.css'
export default class Header extends Component{
    render(){
        return <input className="headerInput" type="text" placeholder="请输入任务，回车以添加到列表中" />
    }
}