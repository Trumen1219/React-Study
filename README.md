【React】SPA - 路由机制 - react-router5 - 基本路由 - 嵌套路由 - 传递参数 - 路由跳转


# 1. 相关理解

## 1.1. SPA的理解

单页Web应用（single page web application，SPA）

整个应用只有一个完整的页面。

点击页面中的链接不会刷新页面，只会做页面的局部更新。

数据都需要通过ajax请求获取, 并在前端异步展现。

## 1.2. 路由的理解

### 1.2.1 什么是路由?

一个路由就是一个映射关系(key: value)

key为路径, value可能是function或component

### 1.2.2 路由分类


* 1. 后端路由

  * 理解： value是function, 用来处理客户端提交的请求。

  * 注册路由： router.get(path, function(req, res))

  * 工作过程：当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据


* 2. 前端路由

  * 浏览器端路由，value是component，用于展示页面内容。

  * 注册路由: <Route path="/test" component={Test}>

  * 工作过程：当浏览器的path变为/test时, 当前路由组件就会变为Test组件

  * 主要是通过操作BOM中的history来操作路径

## 1.3. react-router-dom 的理解

* React的一个插件库。

* 专门用来实现一个SPA应用。

* 基于React的项目基本都会用到此库。


# 2. react-router-dom相关API

## 2.1. 内置组件

```javascript
<BrowserRouter>
<HashRouter>
<Route>
<Redirect>
<Link>
<NavLink>
<Switch>
```

## 2.2. 其它

history 对象

match 对象

withRouter 函数


# 3. 基本路由使用

## 3.1. 效果

[在这里插入图片描述](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34f6957bbd4f46efac620ff7d66003a4~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 3.2. 准备

下载react-router-dom: npm install react-router-dom

引入bootstrap.css: <link rel="stylesheet" href="/css/bootstrap.css">

## 3.3 路由的基本使用

1.明确好界面中的导航区、展示区

2.导航区的a标签改为Link标签 ```<Link to="/xxxxx">Demo</Link>```//to里面尽量都小写

3.展示区写Route标签进行路径的匹配 ```<Route path='/xxxx' component={Demo}/>```

4.```<App>```的最外侧包裹了一个```<BrowserRouter>```或```<HashRouter>```

(BrowserRouter 将会监听 URL 的变化，当 URL 变更时，它将使浏览器显示相应的页面；所以要在最外侧包裹一个)


## 3.4 实现

**>>Index.js**

这里用一个路由器标签将整个App包起来，保证使用的是同一个路由器这里使用BrowserRouter
```javascript
//引入react核心库
import React from 'react'
//引入ReactDOM
import ReactDOM from 'react-dom'
//
import {BrowserRouter} from 'react-router-dom'
//引入App
import App from './App'

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
)
```

**>>App.jsx**

```javascript
import React, { Component } from 'react'
import { Link,Route } from 'react-router-dom'
import Home from './Home'
import About from './About'

export default class App extends Component {
  render() {
    return (
      <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header"><h2>React Router Demo</h2></div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/* 原生html中，靠<a>跳转不同的页面 */}
            {/* <a className="list-group-item" href="./about.html">About</a>
            <a className="list-group-item active" href="./home.html">Home</a> */}

            {/* 在React中靠路由链接实现切换组件--编写路由链接 */}
            <Link className="list-group-item" to="/about">About</Link>
            <Link className="list-group-item" to="/home">Home</Link>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
              <div className="panel-body">
                {/* 注册路由 */}
                <Route path='/about' component={About} />
                <Route path='/home' component={Home} />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
```

## 3.5 路由组件与一般组件的区别

```#号后面的东西不作为数据发送给服务器```

一、写法不同

* 一般组件：

```javascript
<Demo/>
```

* 路由组件：

```javascript
<Route path="/demo" component={Demo}/>
```

二、存放位置不同

* 一般组件：components

* 路由组件：pages

三、接收到的props不同

* 一般组件：写组件标签时传递了什么，就能收到什么

* 路由组件：接收到三个固定的属性

history:
    go: ƒ go(n)
    goBack: ƒ goBack()
    goForward: ƒ goForward()
    push: ƒ push(path, state)
    replace: ƒ replace(path, state)

location:
    pathname: "/about"
    search: ""
    state: undefined

match:
    url: "/about"
    params: {}
    path: "/about"

## 3.6 NavLink与封装NavLink

NavLink可以实现路由链接的高亮，通过activeClassName属性指定样式名，默认是"active"

<NavLink activeClassName="demo" className="list-group-item" to="/home">Home</NavLink>

可以自己封装一个NavLink【一般组件】

```javascript
import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class MyNavLink extends Component {
  render() {
    // console.log(this.props);
    return (
      <NavLink activeClassName="demo" className="list-group-item" {...this.props} />
    )
  }
}
```
标签体内容是特殊的标签属性通过this.props.children可以获取标签体内容

使用
{有图在此}
<MyNavLink to="/about">About</MyNavLink>
<MyNavLink to="/home">Home</MyNavLink>

## 3.7 Switch的使用

通常情况下，path和component是一一对应的关系。<Route path='/about' component={About} />

Switch可以提高路由匹配效率(单一匹配)。

这样只要匹配到了第一个就不会再往下匹配了

引入switch
<Switch>
  <Route path="/about" component={About}/>
  <Route path="/home" component={Home}/> 
  <Route path="/home" component={Test}/>
</Switch>

3.8 解决多级路径刷新页面样式丢失的问题

Pulbic文件夹就是根目录/

public/index.html 中 引入样式时不写 ./ 写 / （常用）【绝对路径】
public/index.html 中 引入样式时不写 ./ 写 %PUBLIC_URL% （常用）
使用HashRouter

3.9 路由的严格匹配与模糊匹配

默认使用的是模糊匹配（简单记：【输入的路径】必须包含要【匹配的路径】，且顺序要一致）
开启严格匹配：<Route exact={true} path="/about" component={About}/>简写<Route exact path="/about" component={About}/>
严格匹配不要随便开启，需要再开，有些时候开启会导致无法继续匹配二级路由
3.10 Redirect的使用【重定向】
一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到Redirect指定的路由

具体编码：

<Switch>
    <Route path="/about" component={About}/>
    <Route path="/home" component={Home}/>
    <Redirect to="/about"/>
</Switch>
复制代码
4. 嵌套路由使用
4.1 效果
在这里插入图片描述

4.2 注意
注册子路由时要写上父路由的path值
路由的匹配是按照注册路由的顺序进行的
4.3 实现
Home/index.jsx
import React, { Component } from 'react'
import { Route, NavLink,Redirect,Switch } from 'react-router-dom'
import News from './News'
import Message from './Message'

export default class Home extends Component {
  render() {
    return (
      <div>
        <h3>我是Home的内容</h3>
        <div>
          <ul className="nav nav-tabs">
            <li>
              <NavLink className="list-group-item" to="/home/news">News</NavLink>
            </li>
            <li>
              <NavLink className="list-group-item" to="/home/message">Message</NavLink>
            </li>
          </ul>
          <Switch>
            <Route path='/home/news' component={News} />
            <Route path='/home/message' component={Message} />
            <Redirect to='/home/news' />
          </Switch>
        </div>
      </div>
    )
  }
}
复制代码
5. 向路由组件传递参数数据
5.1 效果
在这里插入图片描述

5.2 具体方法
方法1. params参数
路由链接(携带参数)：<Link to='/demo/test/tom/18'}>详情</Link>
注册路由(声明接收)：<Route path="/demo/test/:name/:age" component={Test}/>
接收参数：this.props.match.params
Message/index.jsx
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom';
import Detail from './Detail';

export default class Message extends Component {
  state = {
    messageArr: [
      { id: '01', title: '消息1' },
      { id: '02', title: '消息2' },
      { id: '03', title: '消息3' },
    ]
  }
  render() {
    const { messageArr } = this.state;
    return (
      <div>
        <ul>
          {
            messageArr.map((msgObj) => {
              return (
                <li key={msgObj.id}>
                  {/* 向路由组件传递params参数 */}
                  <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link>
                </li>
              )
            })
          }
        </ul>
        <hr />
        {/* 声明接收params参数 */}
        <Route path="/home/message/detail/:id/:title" component={Detail}/>
      </div>
    )
  }
}
复制代码
Detail/index.jsx
在这里插入图片描述

import React, { Component } from 'react'

export default class Detail extends Component {
  state = {
    detailData : [
      { id: '01', content: '你好啊' },
      { id: '02', content: '还不错鸭' },
      { id: '03', content: '显示我吧' }
    ]
  }
  render() {
    console.log(this.props)
    // 接收params参数
    const { id, title } = this.props.match.params
    const findResult= this.state.detailData.find((dataObj) => {
      return dataObj.id === id
    })
    return (
      <div>
        <ul>
          <li>ID: {id }</li>
          <li>Title: {title }</li>
          <li>Content: { findResult.content}</li>
        </ul>
      </div>
    )
  }
}
复制代码
方法2. search参数
路由链接(携带参数)：<Link to='/demo/test?name=tom&age=18'}>详情</Link>
注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
接收参数：this.props.location.search
备注：获取到的search是urlencoded编码字符串，需要借助querystring解析
import qs from 'querystring'
let obj = {name:'tom', age:18}
console.log(qs.stringify(obj)) // name=tom&age=18
let str = 'carName=Benz&price=199'
console.log(qs.parse(str)) // {carName: 'Benz', price: 199}
复制代码
方法3. state参数
路由链接(携带参数)：<Link to={{ pathname:'/demo/test', state:{name:'tom',age:18} }}>详情</Link>
注册路由(无需声明，正常注册即可)：<Route path="/demo/test" component={Test}/>
接收参数：this.props.location.state
备注：刷新也可以保留住参数【history对象记录着在】
代码
Message/index.jsx
export default class Message extends Component {
  render() {
    const {messageArr} = this.state
    return (
      <div>
        <ul>
          {
            messageArr.map((msgObj)=>{
              return (
                <li key={msgObj.id}>

                  {/* 向路由组件传递params参数 */}
                  {/* <Link to={`/home/message/detail/${msgObj.id}/${msgObj.title}`}>{msgObj.title}</Link> */}

                  {/* 向路由组件传递search参数 */}
                  {/* <Link to={`/home/message/detail/?id=${msgObj.id}&title=${msgObj.title}`}>{msgObj.title}</Link> */}

                  {/* 向路由组件传递state参数 */}
                  <Link to={{pathname:'/home/message/detail',state:{id:msgObj.id,title:msgObj.title}}}>{msgObj.title}</Link>

                </li>
              )
            })
          }
        </ul>
        <hr/>
        {/* 声明接收params参数 */}
        {/* <Route path="/home/message/detail/:id/:title" component={Detail}/> */}

        {/* search参数无需声明接收，正常注册路由即可 */}
        {/* <Route path="/home/message/detail" component={Detail}/> */}

        {/* state参数无需声明接收，正常注册路由即可 */}
        <Route path="/home/message/detail" component={Detail}/>
      </div>
    )
  }
}
复制代码
Detail/index.jsx
import React, { Component } from 'react'
// import qs from 'querystring'

export default class Detail extends Component {
  render() {
    console.log(this.props);

    // 接收params参数
    // const {id,title} = this.props.match.params 

    // 接收search参数
    // const {search} = this.props.location
    // const {id,title} = qs.parse(search.slice(1))

    // 接收state参数
    const {id,title} = this.props.location.state || {}

    const findResult = DetailData.find((detailObj)=>{
      return detailObj.id === id
    }) || {}
    return (
      <ul>
        <li>ID:{id}</li>
        <li>TITLE:{title}</li>
        <li>CONTENT:{findResult.content}</li>
      </ul>
    )
  }
}
复制代码
6. 多种路由跳转方式
6.1 编程式路由导航
借助this.prosp.history对象上的API对操作路由跳转、前进、后退 - this.prosp.history.push() - this.prosp.history.replace() - this.prosp.history.goBack() - this.prosp.history.goForward() - this.prosp.history.go()

6.2 withRouter的使用
export default withRouter(Header)
复制代码
WithRouter可以加工一般组件，让一般组件具备路由组件所特有的API withRouter的返回值是一个新组件

7. 注意
BrowserRouter与HashRouter的区别
底层原理不一样： BrowserRouter使用的是H5的history API，不兼容IE9及以下版本。 HashRouter使用的是URL的哈希值。
path表现形式不一样 BrowserRouter的路径中没有#,例如：localhost:3000/demo/test HashRouter的路径包含#,例如：localhost:3000/#/demo/test
刷新后对路由state参数的影响 (1) BrowserRouter没有任何影响，因为state保存在history对象中。 (2) HashRouter刷新后会导致路由state参数的丢失！！！
备注：HashRouter可以用于解决一些路径错误相关的问题。

