# 【React】面向组件编程 - 基本理解和使用 - 组件三大核心属性state-props-refs - 事件处理 - 非受控组件 - 受控组件 - 高阶函数

## 1 . 基本理解和使用
### 1.1 函数式组件

```javascript
//创建函数式组件
function MyCompontent(){
    console.log(this);//这里的this是undefined，因为babel编译后开启了严格模式
    return <h2>我是用函数定义的组件（适用于简单组件的定义）</h2>
}
//渲染组件到页面
ReactDOM.render(<MyCompontent/>,docement.getElementById('test'))
```
![image](https://user-images.githubusercontent.com/117837871/217765589-62d7b555-1c23-4bbc-a7d3-4cd09f163d6e.png)
![image](https://user-images.githubusercontent.com/117837871/217765611-333f4b51-104d-478c-a907-c875c5ba30e0.png)

    执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？

    React解析组件标签，找到了MyComponent组件。

    发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。

【补充】严格模式中的this
```javascript
function sayThis() {
  console.log(this)
}
sayThis() // Window {...}
```

```javascript
function sayThis2() {
  'use strict'
  console.log(this)
}
sayThis2() // undefined
```

如果不开启严格模式，直接调用函数，函数中的this指向window

如果开启了严格模式，直接调用函数，函数中的this是undefined

### 1.2 类式组件
```javascript
//创建类式组件
class MyCompontent extends React.compontent {
    render(){
	    //render是放在哪里的？—— MyComponent的原型对象上，供实例使用。
	    //render中的this是谁？—— MyComponent的实例对象 <=> MyComponent组件实例对象。
        return <h2>我是用类定义的组件(适用于【复杂组件】的定义)</h2>
    }
}
ReactDOM.render(<MyCompontent/>,document.querySelector('.test'))
```
![image](https://user-images.githubusercontent.com/117837871/217765681-3219dbba-ba4e-430b-89ab-491304411957.png)
![image](https://user-images.githubusercontent.com/117837871/217765719-0818ccdb-4d40-40c7-84ba-1556b6028719.png)


    执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？

    React解析组件标签，找到了MyComponent组件。
    
    发现组件是使用类定义的，随后new出来该类的实例，并通过该实例调用到原型上的render方法。

    将render返回的虚拟DOM转为真实DOM，随后呈现在页面中。

【补充】关于ES6中类的注意事项

类中的构造器不是必须要写的，要对实例进行一些初始化的操作，如添加指定属性时才写。

如果A类继承了B类，且A类中写了构造器，那么A类构造器中的super是必须要调用的。

类中所定义的方法，都放在了类的原型对象上，供实例去使用。

### 1.3 注意

组件名必须首字母大写

虚拟DOM元素只能有一个根元素

虚拟DOM元素必须有结束标签


重点关注下渲染类组件标签的基本流程

* React内部会创建组件实例对象
* 调用render()得到虚拟DOM, 并解析为真实DOM
* 插入到指定的页面元素内部

## 2. 组件实例的三大核心属性1: state 状态

### 2.1 理解

state是组件对象最重要的属性, 值是对象(可以包含多个key-value的组合)

组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)

### 2.2 应用

需求: 定义一个展示天气信息的组件

默认展示天气炎热 或 凉爽

点击文字切换天气

#### 2.2.1 手动切换版

类式组件，在构造器中 初始化状态，在render中通过this.state 读取状态
```javascript
class Weather extends React.Copmpontent{
    contructor(prop){
        super(prop);
        //初始化状态
        this.state = {
            isHot: true
        }
    }
    render(){
        //读取状态
        const {isHot} = this.state
        return <h2>今天天气很{isHot ? '炎热' : '凉爽'}</h2>
    }
}
ReactDOM.render('<Weather/>',docement.querySelector('.test'));
```
![image](https://user-images.githubusercontent.com/117837871/217765896-b98139ee-c913-4141-9b3f-52c687cd07c8.png)

【补充】原生JavaScript绑定事件监听的三种方式
```javascript
<button id="btn1">按钮1</button>

<button id="btn2">按钮2</button>

<button onclick="demo()">按钮3</button>

<script type="text/javascript" >
  const btn1 = document.getElementById('btn1')
  btn1.addEventListener('click',()=>{
    alert('按钮1被点击了')
  })

  const btn2 = document.getElementById('btn2')
  btn2.onclick = ()=>{
    alert('按钮2被点击了')
  }

  function demo(){
    alert('按钮3被点击了')
  }
</script>
```

【补充】类中方法的this指向问题

类中定义的方法，在内部默认开启了局部的严格模式

开启严格模式，函数如果直接调用，this不会指向window，而是undefined
```javascript
class Person {
  constructor(name,age){
    this.name = name
    this.age = age
  }
  study(){
    //study方法放在了哪里？——类的原型对象上，供实例使用
    //通过Person实例调用study时，study中的this就是Person实例
    console.log(this);
  }
}
const p1 = new Person('tom',18)
p1.study() //通过实例调用study方法  Person
const x = p1.study
x() // 直接调用 undefined
```
#### 2.2.2 点击切换版'

```javascript
// 1.创建组件
class Weather extends React.Component {
	
  // 构造器调用几次？ ———— 1次
  constructor(props){
    console.log('constructor');
    super(props)
    // 初始化状态
    this.state = {isHot:false,wind:'微风'}
    // 解决 changeWeather 中 this 指向问题
    this.changeWeather = this.changeWeather.bind(this)
  }

  // render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
  render(){
    console.log('render');
    //读取状态
    const {isHot,wind} = this.state
    return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
  }

  // changeWeather调用几次？ ———— 点几次调几次
  changeWeather(){
    // changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
    // 由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
    // 类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined

    console.log('changeWeather');
    // 获取原来的isHot值
    const isHot = this.state.isHot
    // 严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。
    this.setState({isHot:!isHot})
    // console.log(this);

    // 严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
    // this.state.isHot = !isHot //这是错误的写法
  }
}
//2.渲染组件到页面
ReactDOM.render(<Weather/>,document.getElementById('test'))
```
![image](https://user-images.githubusercontent.com/117837871/217765963-ceed33e2-9a84-4e6e-b591-ee0873ff1c45.png)

#### 2.2.3 精简代码（实际开发中这样写）

可以不写构造器，类中直接写赋值语句来初始化状态

不用bind来绑定this（赋值语句的形式+箭头函数）
```javascript
// 1.创建组件
class Weather extends React.Component{
  // 初始化状态
  state = {isHot:false,wind:'微风'}

  render(){
    const {isHot,wind} = this.state
    return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
  }

  // 自定义方法————要用赋值语句的形式 + 箭头函数
  // 没有放在原型上，而是放在实例上
  changeWeather = () => {
    const isHot = this.state.isHot
    this.setState({isHot:!isHot})
  }
}
// 2.渲染组件到页面
ReactDOM.render(<Weather/>,document.getElementById('test'))
```
【补充】类中直接写赋值语句

在类中直接写赋值语句，等于是给类的实例对象添加属性且赋值

## #2.3 注意

组件中render方法中的this为组件实例对象

组件自定义的方法中this为undefined，如何解决？

    a)	强制绑定this: 通过函数对象的bind()

    b)	箭头函数 + 赋值语句

状态数据state，不能直接修改或更新。状态必须通过  setState() 进行更新, 且更新是一种合并，不是替换。



## 3. 组件实例的三大核心属性2: props

### 3.1 理解

每个组件对象都会有props(properties的简写)属性

组件标签的所有属性都保存在props中

### 3.2 作用

通过标签属性从组件外向组件内传递变化的数据

注意: 组件内部不可修改props数据，是只读的

### 3.3 尝试一下
```javascript
// 创建组件 
class Person extends React.Component{
  render() {
    return (
      <ul>
        <li>姓名：{this.props.name}</li> 
        <li>性别：{this.props.sex}</li> 
        <li>年龄：{this.props.age}</li>
      </ul>
    )
  }
}
// 渲染组件到页面上
ReactDOM.render(<Person name="yk" age="18" sex="男"/>, document.getElementById('test'))
```
![image](https://user-images.githubusercontent.com/117837871/217766032-9d58d0cf-c11c-44d5-8a96-8d2d1681b4c0.png)

### 3.4 使用指南

#### 3.4.1 内部读取某个属性值

this.props.name

### 3.4.2 扩展属性: 将对象的所有属性通过props传递（批量传递标签属性）
```javascript
ReactDOM.render(<Person name="yk" age="18" sex="男"/>, document.getElementById('test'))
const person = {name: 'yk', age: 18, sex: '男'}
ReactDOM.render(<Person { ...person }/>, document.getElementById('test'))
```

【补充】展开运算符
```javascript

let arr1 = [1, 3, 5, 7, 9]

let arr2 = [2, 4, 6, 8, 10]

// 1. 展开一个数组

console.log(...arr1); // 1 3 5 7 9

// 2. 连接数组

let arr3 = [...arr1, ...arr2] // [1,3,5,7,9,2,4,6,8,10]

// 3. 在函数中使用
function sum(...numbers) {
  return numbers.reduce((preValue, currentValue) => {
    return preValue + currentValue
  })
}
console.log(sum(1, 2, 3, 4)); // 10

// 4. 构造字面量对象时使用展开语法
let person = {
  name: 'tom',
  age: 18
}

// console.log(...person); // 报错，展开运算符不能展开对象
console.log({...person}) // {name: "tom", age: 18}

let person2 = { ...person } // 可以拷贝一个对象
person.name = 'jerry'
console.log(person2); // {name: "tom", age: 18}
console.log(person); // {name: "jerry", age: 18}

// 5. 合并对象
let person3 = {
  ...person,
  name: 'jack',
  address: "地球"
}
console.log(person3); // {name: "jack", age: 18, address: "地球"}
```

### 3.4.3 对props中的属性值进行类型限制和必要性限制

* 1. 第一种方式（React v15.5 开始已弃用）

直接写
Person.propTypes = {
  name: React.PropTypes.string.isRequired,
  age: React.PropTypes.number
}
复制代码
2. 第二种方式（新）：使用prop-types库进限制（需要引入prop-types库）
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>
复制代码
//对标签属性进行类型、必要性的限制
Person.propTypes = {
  name:PropTypes.string.isRequired, // 限制name必传，且为字符串
  sex:PropTypes.string, // 限制sex为字符串
  age:PropTypes.number, // 限制age为数值
  speak:PropTypes.func, // 限制speak为函数
}
复制代码
可以写在类的里面，前面加static关键字
3.4.4 默认属性值
//指定默认标签属性值
Person.defaultProps = {
  sex:'男', // sex默认值为男
  age:18 //age默认值为18
}
复制代码
可以写在类的里面，前面加static关键字
3.4.5 组件类的构造函数
constructor(props){
  super(props)
  console.log(this.props)//打印所有属性
}

构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
3.5 应用
需求: 自定义用来显示一个人员信息的组件

姓名必须指定，且为字符串类型；
性别为字符串类型，如果性别没有指定，默认为男
年龄为字符串类型，且为数字类型，默认值为18

//创建组件
class Person extends React.Component{

  //对标签属性进行类型、必要性的限制
  static propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
  }

  //指定默认标签属性值
  static defaultProps = {
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
  }

  render(){
    // console.log(this);
    const {name,age,sex} = this.props
    //props是只读的
    //this.props.name = 'jack' //此行代码会报错，因为props是只读的
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age+1}</li>
      </ul>
    )
  }
}

//渲染组件到页面
ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
复制代码

3.6 函数式组件使用props
//创建组件
function Person (props){
  const {name,age,sex} = props
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
      </ul>
    )
}

//对标签属性进行类型、必要性的限制
Person.propTypes = {
  name:PropTypes.string.isRequired, //限制name必传，且为字符串
  sex:PropTypes.string,  //限制sex为字符串
  age:PropTypes.number,  //限制age为数值
}

// 指定默认标签属性值
Person.defaultProps = {
  sex:'男',// sex默认值为男
  age:18 // age默认值为18
}

//渲染组件到页面
ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
