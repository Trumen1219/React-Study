# 组件的生命周期 - 虚拟DOM - DOM Diffing算法

## 1. 组件的生命周期

### 1.1 理解

组件从创建到死亡它会经历一些特定的阶段。

React组件中包含一系列勾子函数(生命周期回调函数), 会在特定的时刻调用。

我们在定义组件时，会在特定的生命周期回调函数中，做特定的工作。

### 1.2 引入案例

需求:定义组件实现以下功能：

让指定的文本做显示 / 隐藏的渐变动画

从完全可见，到彻底消失，耗时2S

点击“不活了”按钮从界面中卸载组件

```javascript
//创建组件
//生命周期回调函数 <=> 生命周期钩子函数 <=> 生命周期函数 <=> 生命周期钩子
class Life extends React.Component{

  state = {opacity:1}

  death = ()=>{
    // 清除定时器
    // clearInterval(this.timer)
    // 卸载组件
    ReactDOM.unmountComponentAtNode(document.getElementById('test'))
  }

  // 组件挂载完毕
  componentDidMount(){
    console.log('componentDidMount');
    this.timer = setInterval(() => {
      //获取原状态
      let {opacity} = this.state
      //减小0.1
      opacity -= 0.1
      if(opacity <= 0) opacity = 1
      //设置新的透明度
      this.setState({opacity})
    }, 200);
  }

  // 组件将要卸载
  componentWillUnmount(){
    // 清除定时器
    clearInterval(this.timer)
  }

  // 初始化渲染、状态更新之后 调用1+n次
  render(){
    console.log('render');
    return(
      <div>
        <h2 style={{opacity:this.state.opacity}}>React学不会怎么办？</h2>
        <button onClick={this.death}>不活了</button>
      </div>
    )
  }
}
//渲染组件
ReactDOM.render(<Life/>,document.getElementById('test'))
```

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc4090cc0a5f44248e534fec82ab82d2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image)

https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc4090cc0a5f44248e534fec82ab82d2~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image

### 1.3 生命周期的三个阶段（旧）

![image](https://user-images.githubusercontent.com/117837871/218704757-f4bd7825-9d5d-4eb6-89fe-2c33532ac4aa.png)

v16.8.4

#### 1.3.1 初始化阶段

由*ReactDOM.render()*触发---初次渲染

1.*constructor()*—— 类组件中的构造函数

2.*componentWillMount()* —— 组件将要挂载 【即将废弃】

3.*render()*  —— 挂载组件

4.*componentDidMount()* —— 组件挂载完成 比较常用：

一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息

```javascript
class Count extends React.Component{

  // 构造器
  constructor(props){
    alert('constructor')
	console.log('Count---constructor');
	super(props)
	// 初始化状态
	this.state = {count:0}
  }
  // state = {count:0}
  add = () => {
    const {count} = this.state
    this.setState({count: count+1})
  }
  
  //组件将要挂载的钩子【即将废弃】
  componentWillMount(){
    alert('componentWillMount')
    console.log('Count---componentWillMount');
  }

  // 挂载组件
  render(){
    alert('render')
    console.log('Count---render');
    const {count} = this.state
    return(
      <div>
        <h1>当前计数值：{count}</h1>
        <button onClick={this.add}>点我+1</button>
      </div>
    )
  }

  //组件挂载完毕的钩子
  componentDidMount(){
    alert('componentDidMount')
	console.log('Count---componentDidMount');
  }
}
ReactDOM.render(<Count/>, document.getElementById('test'))
```

![image](https://user-images.githubusercontent.com/117837871/218704847-ae672973-44d9-44c1-b65c-45a8751596e1.png)
https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7505801778224e368ee9f40edf2d2642~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image

#### 1.3.2 更新阶段

【第一种情况】父组件重新render触发

componentWillReceiveProps() —— 接收属性参数（非首次）【即将废弃】

然后调用下面的钩子函数
【第二种情况】由组件内部this.setSate()

shouldComponentUpdate() —— 组件是否应该被更新（默认返回true）

然后调用下面的钩子函数
【第三种情况】强制更新 forceUpdate()

componentWillUpdate() ——组件将要更新 【即将废弃】
render() —— 组件更新
componentDidUpdate() —— 组件完成更新

#### 1.3.3 卸载组件
由ReactDOM.unmountComponentAtNode()触发

componentWillUnmount() —— 组件即将卸载

### 1.4 生命周期的三个阶段（新）

![image](https://user-images.githubusercontent.com/117837871/218704912-83a52735-9acc-42e0-9cc6-83e6d752122f.png)

v17.0.1

1. 初始化阶段
由ReactDOM.render()触发 —— 初次渲染

constructor() —— 类组件中的构造函数
static getDerivedStateFromProps(props, state) 从props得到一个派生的状态【新增】
render() —— 挂载组件
componentDidMount() —— 组件挂载完成 比较==常用==

2. 更新阶段
由组件内部this.setSate()或父组件重新render触发或强制更新forceUpdate()

getDerivedStateFromProps() —— 从props得到一个派生的状态  【新增】
shouldComponentUpdate() —— 组件是否应该被更新（默认返回true）
render() —— 挂载组件
getSnapshotBeforeUpdate() —— 在更新之前获取快照【新增】
componentDidUpdate(prevProps, prevState, snapshotValue) —— 组件完成更新

3. 卸载组件
由ReactDOM.unmountComponentAtNode()触发

componentWillUnmount() —— 组件即将卸载

### 1.5 重要的勾子

render：初始化渲染或更新渲染调用
componentDidMount：开启监听, 发送ajax请求
componentWillUnmount：做一些收尾工作, 如: 清理定时器

### 1.6 即将废弃的勾子

componentWillMount
componentWillReceiveProps
componentWillUpdate

现在使用会出现警告，下一个大版本需要加上UNSAFE_前缀才能使用，以后可能会被彻底废弃，不建议使用。
2. 虚拟DOM与DOM Diffing算法
2.1 基本原理图
![image](https://user-images.githubusercontent.com/117837871/218704968-244b5f61-9cad-4458-8fcf-fa62ba1e00ab.png)

详细的原理可以看之前在学Vue源码时的关于diff的笔记
【Vue源码】图解 diff算法 与 虚拟DOM-snabbdom-最小量更新原理解析-手写源码-updateChildren
2.2 关于key的经典面试题

react/vue中的key有什么作用？（key的内部原理是什么？）
为什么遍历列表时，key最好不要用index?

2.2.1 虚拟DOM中key的作用


简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。


详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】, 随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：

旧虚拟DOM中找到了与新虚拟DOM相同的key：

若虚拟DOM中内容没变, 直接使用之前的真实DOM
若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM


旧虚拟DOM中未找到与新虚拟DOM相同的key

根据数据创建新的真实DOM，随后渲染到到页面





2.2.2 用index作为key可能会引发的问题


若对数据进行：逆序添加、逆序删除等破坏顺序操作: 会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低


如果结构中还包含输入类的DOM：会产生错误DOM更新 ==> 界面有问题


注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的


2.2.3 开发中如何选择key?

最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值
如果确定只是简单的展示数据，用index也是可以的
