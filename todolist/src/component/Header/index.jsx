import React, {Component} from "react";
import './index.css'
export default class Header extends Component{
    handlerAdd(event){
        return {
            id:nanoid(),
            name:event.target.value,
            done:false
        }
    }
    render(){
        return <input className="headerInput" type="text" placeholder="请输入任务，回车以添加到列表中" />
    }
}