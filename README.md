# TodoList

1. 目标功能界面

2. 界面模块拆分


3. 主页 index.html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <title>React App</title>
</head>

<body>
  <div id="root"></div>
</body>

</html>

4. 静态页面搭建

index.js
import React from "react";
import ReactDDOM from "react-dom";
import App from "./App";

ReactDDOM.render(<App />, document.getElementById("root"));


App.jsx
import React, { Component } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";
import './App.css'

export default class App extends Component {
  render() {
    return (
      <div className="todo-container">
        <div className="todo-warp">
          <Header />
          <List />
          <Footer />
        </div>
      </div>
    );
  }
}


App.css
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}


Header/index.js
import React, { Component } from 'react'
import './index.css'

export default class Header extends Component {
  render() {
    return (
      <div className="todo-header">
        <input type="text" placeholder="请输入你的任务名称，按回车键确认"/>
      </div>
    )
  }
}



Header/index.css
/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}


List/index.jsx
import React, { Component } from 'react'
import Item from '../Item'
import './index.css'

export default class List extends Component {
  render() {
    return (
      <ul className="todo-main">
        <Item />
      </ul>
    )
  }
}



List/index.css
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}


Item/index.jsx
import React, { Component } from 'react'
import './index.css'

export default class Item extends Component {
  render() {
    return (
      <li>
        <label>
          <input type="checkbox"/>
          <span>xxxxx</span>
        </label>
        <button className="btn btn-danger" style={{display:'none'}}>删除</button>
      </li>
    )
  }
}



Item/index.css
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}



Footer/index.jsx
import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {
  render() {
    return (
      <div className="todo-footer">
      <label>
        <input type="checkbox"/>
      </label>
      <span>
        <span>已完成0</span> / 全部2
      </span>
      <button className="btn btn-danger">清除已完成任务</button>
    </div>
    )
  }
}



Footer/index.css
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}


页面效果

5. 动态组件
5.1 动态初始化页面

状态驱动组件

考虑两个问题  要将状态放在哪？ 状态的存储形式是什么？


可以将状态放在需要使用状态的 父组件 App中，这样Header和List都可以通过props拿到状态数据


状态的存储形式采用对象数组


// 初始化状态
state = {
  todos: [
    { id: '001', name: '吃饭', done: true },
    { id: '002', name: '睡觉', done: true },
    { id: '003', name: '敲代码', done: false },
  ]
}
复制代码
App.jsx
在App.jsx组件中定义状态state，通过标签属性传递给子组件List的props中
export default class App extends Component {
  // 初始化状态
  state = {
    todos: [
      { id: '001', name: '吃饭', done: true },
      { id: '002', name: '睡觉', done: true },
      { id: '003', name: '敲代码', done: false },
    ]
  }
  render() {
    const  {todos} = this.state
    return (
      <div className="todo-container">
        <div className="todo-warp">
          <Header />
          <List todos={todos} />
          <Footer />
        </div>
      </div>
    )
  }
}


List/index.jsx
子组件通过this.props得到父组件传递过来的状态
通过循环遍历todos得到一个个todo，将他们传递给Item子组件
通过标签属性的形式，父组件List传递状态到子组件Item中
指定key 再展开todo传递给子组件
export default class List extends Component {
  render() {
    const {todos} = this.props
    return (
      <ul className="todo-main">
        {
          todos.map((todo) => {
            return <Item key={todo.id} {...todo}/>
          })
        }
      </ul>
    )
  }
}


Item/index.jsx
子组件通过this.props得到父组件传递过来的每个todo的状态
动态渲染props中获取的状态 name 和 done
export default class Item extends Component {
  render() {
    const { name, done } = this.props
    return (
      <li>
        <label>
          <input type="checkbox" defaultChecked={done}/>
          <span>{name}</span>
        </label>
        <button className="btn btn-danger" style={{display:'none'}}>删除</button>
      </li>
    )
  }
}


5.2 动态添加todo
子组件要向父组件 传递 得到的输入值
可以通过调用函数， 传递参数的形式 来传递状态
App.jsx
状态在父组件中，修改状态的操作就定义在父组件中
在父组件中定义一个addTodo函数，然后通过标签传递给子组件
addTodo函数接受一个参数，这个参数就是要接受的子组件的数据
通过这个参数，将子组件的数据传给父组件
export default class App extends Component {
  // 用于添加一个todo，接受的参数是todo对象
  addTodo = (todoObj) => {
    // 获取原todos
    const { todos } = this.state
    // 追加一个todo
    const newTodos = [todoObj, ...todos]
    // 更新状态
    this.setState({ todos: newTodos })
  }
  render() {
    const  {todos} = this.state
    return (
      <div className="todo-container">
        <div className="todo-warp">
          <Header addTodo={this.addTodo} />
          <List todos={todos} />
          <Footer />
        </div>
      </div>
    );
  }
}


Header/index.js
生成唯一id的库
uuid
nanoid
npm install nanoid

父组件通过标签属性传递了一个函数给子组件，子组件可以通过this.props来调用函数
函数的参数，就是子组件要传递给父组件的数据
export default class Header extends Component {
  handleKeyUp = (event) => {
    const {keyCode, target} = event
    if (keyCode !== 13) return
    if (target.value.trim() === '') {
      alert('输入不能为空')
      return
    }
    this.props.addTodo({
      id: nanoid(),
      name: target.value,
      done: false
    })
    target.value = ''
  }
  render() {
    return (
      <div className="todo-header">
        <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
      </div>
    )
  }
}



5.3 鼠标悬浮高亮
定义一个mouse状态，用来 标识鼠标移入移出
通过mouse状态的改变，来改变style样式（背景颜色+删除按钮显示与隐藏）
Item/index.js
export default class Item extends Component {
  // 标识鼠标移入移出
  state = {
    mouse: false
  }
  // 鼠标移入移出的回调
  handleMouse = (flag) => {
    return () => {
      this.setState({mouse: flag})
    }
  }
  render() {
    const { name, done } = this.props
    const {mouse} = this.state
    return (
      <li
        style={{ backgroundColor: mouse ? '#ddd' : 'white' }}
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}
      >
        <label>
          <input type="checkbox" defaultChecked={done}/>
          <span>{name}</span>
        </label>
        <button className="btn btn-danger" style={{display: mouse?'block':'none'}}>删除</button>
      </li>
    )
  }
}



5.4 勾选 改变 状态
勾选前面的选中框，要改变到state中的数据
根据选中的框所属的todo的id找到数据，根据更改后done的值更新相应的done的值
App.jsx
在父组件中定义一个更新todo的函数，然后传递给子组件
根据拿到的id和done的值，来更新状态state中相应id数据的值
export default class App extends Component {
  // 用于更新一个todo
  updateTodo = (id, done) => {
    const { todos } = this.state
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {...todo, done: done}
      } else {
        return todo
      }
    })
    this.setState({todos: newTodos})
  }
  
  render() {
    const  {todos} = this.state
    return (
      <div className="todo-container">
        <div className="todo-warp">
          <Header addTodo={this.addTodo} />
          <List todos={todos} updateTodo={this.updateTodo}/>
          <Footer />
        </div>
      </div>
    );
  }
}


List/index.jsx
中转 从父组件App中传过来的函数，继续传给它的子组件Item，完成祖孙组件中的通信
export default class List extends Component {
  render() {
    const {todos, updateTodo} = this.props
    return (
      <ul className="todo-main">
        {
          todos.map((todo) => {
            return <Item key={todo.id} {...todo} updateTodo={updateTodo}/>
          })
        }
      </ul>
    )
  }
}


Item/index.jsx
通过List中转终于拿到祖先组件App中的函数updateTodo
组件中定义onChange事件的回调函数handleCheck ，【高阶函数+柯里化】
在回调函数中返回传递过来的函数并传入参数
export default class Item extends Component {
  // 勾选、取消勾选todo的回调
  handleCheck = (id) => {
    return (event) => {
      this.props.updateTodo(id, event.target.checked)
    }
  }

  render() {
    const { id, name, done } = this.props
    const {mouse} = this.state
    return (
      <li
        style={{ backgroundColor: mouse ? '#ddd' : 'white' }}
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}
      >
        <label>
          <input type="checkbox" defaultChecked={done} onChange={ this.handleCheck(id) }/>
          <span>{name}</span>
        </label>
        <button className="btn btn-danger" style={{display:mouse?'block':'none'}}>删除</button>
      </li>
    )
  }
}


5.5 对props进行限制

类型及必要性设置

自行安装 prop-types 库 npm i prop-types

import PropTypes from 'prop-types'
export default class Header extends Component {
  // 对接收的props进行类型以及必要性的限制
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }
}
复制代码
import PropTypes from 'prop-types'
export default class List extends Component {
  // 对接收的props进行类型以及必要性的限制
  static propTypes = {
      todos: PropTypes.array.isRequired,
      updateTodo: PropTypes.func.isRequired
  }
}


import PropTypes from 'prop-types'
export default class Item extends Component {
  // 对接收的props进行类型以及必要性的限制
  static propTypes = {
    updateTodo: PropTypes.func.isRequired
  }
}


5.5 删除一个todo
选中一个todo，点击删除按钮，删除这个todo
App.jsx
因为状态数据在父组件中，所以删除todo的函数就定义在App中
然后将函数传递给子组件
export default class App extends Component {
  // 用于删除一个todo
  deleteTodo = (id) => {
    const { todos } = this.state
    const newTodos = todos.filter((todo) => {
      return todo.id !== id
    })
    this.setState({todos:newTodos})
  }
  
  render() {
    const  {todos} = this.state
    return (
      <div className="todo-container">
        <div className="todo-warp">
          <Header addTodo={this.addTodo} />
          <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
          <Footer />
        </div>
      </div>
    );
  }


List/index.jsx
中转拿到和函数继续传递
export default class List extends Component {
  // 对接收的props进行类型以及必要性的限制
  static propTypes = {
    todos: PropTypes.array.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  }
  render() {
    const {todos, updateTodo, deleteTodo} = this.props
    return (
      <ul className="todo-main">
        {
          todos.map((todo) => {
            return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={ deleteTodo }/>
          })
        }
      </ul>
    )
  }
}


Item/index.jsx
得到传递到的函数，将id作为函数参数传递给父组件
定义绑定点击事件 这次没用高阶函数，换了一种写法，效果是一样的
export default class Item extends Component {
  // 对接收的props进行类型以及必要性的限制
  static propTypes = {
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  }
  // 删除一个todo的回调
  handleDelete = (id) => {
    if (window.confirm(`确定删除嘛？`)) {
      this.props.deleteTodo(id)
    }
  }
  
  render() {
    const { id, name, done } = this.props
    const {mouse} = this.state
    return (
      <li
        style={{ backgroundColor: mouse ? '#ddd' : 'white' }}
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}
      >
        <label>
          <input type="checkbox" defaultChecked={done} onChange={ this.handleCheck(id) }/>
          <span>{name}</span>
        </label>
        <button onClick={ () => this.handleDelete(id) } className="btn btn-danger" style={{display:mouse?'block':'none'}}>删除</button>
      </li>
    )
  }
}



5.6 底部Footer
App.jsx
在App中将todos传给Footer
在App中定义全选和全不选的todos来更新状态
在App中定义清除所有已完成的todo
export default class App extends Component {
  // 用于全选
  checkAll = (done) => {
    // 获取原来的todos
    const { todos } = this.state
    // 过滤数据
    const newTodos = todos.map((todo) => {
      return {...todo, done: done}
    })
    // 更新状态
    this.setState({todos: newTodos})
  }
  // 清除所有已经完成的
  clearAllDone = () => {
    const { todos } = this.state
    const newTodos = todos.filter((todo) => {
      return !todo.done
    })
    this.setState({todos: newTodos})
  }
  render() {
    const  {todos} = this.state
    return (
      <div className="todo-container">
        <div className="todo-warp">
          <Header addTodo={this.addTodo} />
          <List todos={todos} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
          <Footer todos={todos} checkAll={this.checkAll} clearAllDone={this.clearAllDone} />
        </div>
      </div>
    );
  }
}


Footer/index.jsx
拿到todos
用来计算两个数据doneCount和total，显示在页面中
定义两个回调函数handleCheckAll和handleClearAllDone
再从父组件接收两个函数然后调用
export default class Footer extends Component {
  // 全选
  handleCheckAll = (event) => {
    this.props.checkAll(event.target.checked)
  }
  // 清除所有已完成的回调
  handleClearAllDone = () => {
    this.props.clearAllDone()
  }
  render() {
    const { todos } = this.props
    // 计算已完成
    const doneCount = todos.reduce((pre, todo) => { return pre + (todo.done ? 1: 0) }, 0)
    // 计算总数
    const total = todos.length
    return (
      <div className="todo-footer">
      <label>
          <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount === total && total !== 0 ? true: false }/>
      </label>
      <span>
          <span>已完成{ doneCount }</span> / 全部{total}
      </span>
      <button onClick={this.handleClearAllDone} className="btn btn-danger">清除已完成任务</button>
    </div>
    )
  }
}



6. 总结

拆分组件、实现静态组件，注意：className、style的写法
动态初始化列表，如何确定将数据放在哪个组件的state中？

某个组件使用：放在其 自身 的state中
某些组件使用：放在他们共同的 父组件 state中（官方称此操作为：状态提升）


关于父子之间通信：

【父组件】给【子组件】传递数据：通过props传递
【子组件】给【父组件】传递数据：通过props传递，要求父提前给子传递一个函数


注意defaultChecked （只在第一次指定的时候有作用，之后就没作用了）和 checked的区别，类似的还有：defaultValue 和 value
状态在哪里，操作状态的方法就在哪里