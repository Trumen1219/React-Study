# 1. React 入门概述

## 1.1 介绍

用于动态构建用户界面的 JavaScript 库(只关注于视图)

	1.发送请求获取数据
	2.处理数据（过滤，整理格式等）
	3.操作DOM呈现页面（React做的事情）
	
React是一个将数据渲染为HTML视图的开源JavaScript库

## 1.2 原生JavaScript的缺点

	1. 原生JavaScript操作DOM繁琐，效率低（DOM-API操作UI）
	2. 使用JavaScript直接操作DOM，浏览器会进行大量的重绘重排
	3. 原生JavaScript没有组件化编码方案，代码复用率很低
	
##【补充】浏览器重绘重排

浏览器重绘(repaint)重排(reflow)与优化[浏览器机制]

**重绘**(repaint)：当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘

**重排**(reflow)：当DOM的变化影响了元素的几何信息(DOM对象的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排

##【补充】模块化与组件化

	• 模块
		1. 理解：向外提供特定功能的js程序, 一般就是一个js文件
		2. 为什么要拆成模块：随着业务逻辑增加，代码越来越多且复杂。
		3. 作用：复用js, 简化js的编写, 提高js运行效率
		
	• 组件
		1. 理解：用来实现局部功能效果的代码和资源的集合(html/css/js/image等等)
		2. 为什么要用组件： 一个界面的功能更复杂
		3. 作用：复用编码, 简化项目编码, 提高运行效率
		
模块化：当应用的js都以模块来编写的, 这个应用就是一个模块化的应用

组件化：当应用是以多组件的方式实现, 这个应用就是一个组件化的应用

## 1.3 React的特点

	1. 采用组件化模式、声明式编码，提高开发效率及组件复用率
	2. 在 React Native中可以使用React语法进行移动端开发
	3. 使用虚拟DOM+Diff算法，尽量减少与真实DOM的交互
	
## 1.4. React高效的原因

	1. 使用虚拟(virtual)DOM, 不总是直接操作页面真实DOM。
	2. DOM Diffing算法, 最小化页面重绘。
	
# 2. Hello React

## 2.1 相关库介绍

	• 旧版本 16.8.4 (March 5, 2019)
	• 新版本 有不一样的会说明
	
	1. react.js：React核心库。
	2. react-dom.js：提供操作DOM的React扩展库。
	3. babel.min.js：解析JSX语法代码转为JS代码的库。
	
## 【补充】babel.js的作用

	1. 浏览器不能直接解析JSX代码, 需要babel转译为纯JS的代码才能运行
	2. 只要用了JSX，都要加上type="text/babel", 声明需要babel来处理
	
## 2.2 使用JSX创建虚拟DOM
```react
constVDOM= <h1>Hello,React</h1>复制代码
```
## 2.3 渲染虚拟DOM(元素)

	1. 语法: 
```react
	ReactDOM.render(virtualDOM, containerDOM)
```

	2. 作用: 将虚拟DOM元素渲染到页面中的真实容器DOM中显示


	3. 参数说明 
	
		1. 参数一: 纯js或jsx创建的虚拟dom对象
		
		2. 参数二: 用来包含虚拟DOM元素的真实dom元素对象(一般是一个div)
```javaScript		
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>hello_react</title>
</head>

<body>
  <!-- 准备好一个“容器” -->
  <div id="test"></div>

  <!-- 引入react核心库 -->
  <script type="text/javascript" src="../js/react.development.js"></script>
  <!-- 引入react-dom，用于支持react操作DOM -->
  <script type="text/javascript" src="../js/react-dom.development.js"></script>
  <!-- 引入babel，用于将jsx转为js -->
  <script type="text/javascript" src="../js/babel.min.js"></script>

  <script type="text/babel"> /* 此处一定要写babel */
    //1.创建虚拟DOM
    const VDOM = <h1>Hello,React</h1> /* 此处一定不要写引号，因为不是字符串 */
    //2.渲染虚拟DOM到页面
    ReactDOM.render(VDOM,document.getElementById('test'))
  </script>
</body>

</html>
```
## 2.4 页面显示
<img width="451" alt="image" src="https://user-images.githubusercontent.com/117837871/216939381-0451d71f-c024-46bf-8fb1-ff25e775c093.png">

# 3. 创建虚拟DOM的两种方式

## 3.1 纯JS方式(一般不用)
```javaScript
<div id="test"></div>

<script type="text/javascript" src="../js/react.development.js"></script>
<script type="text/javascript" src="../js/react-dom.development.js"></script>

<script type="text/javascript" > 
  //1.创建虚拟DOM
  const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello,React'))
  //2.渲染虚拟DOM到页面
  ReactDOM.render(VDOM,document.getElementById('test'))
```

## 3.2 JSX方式

	JSX方式就是js创建虚拟DOM的语法糖
```javascript
<div id="test"></div>

<script type="text/javascript" src="../js/react.development.js"></script>
<script type="text/javascript" src="../js/react-dom.development.js"></script>
<script type="text/javascript" src="../js/babel.min.js"></script>

<script type="text/babel" > /* 此处一定要写babel */
    //1.创建虚拟DOM
    const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
        <h1 id="title">
            <span>Hello,React</span>
        </h1>
    )
    //2.渲染虚拟DOM到页面
    ReactDOM.render(VDOM,document.getElementById('test'))
</script>![image](https://user-images.githubusercontent.com/117837871/216940180-3b28dbc4-3910-4119-845f-4f3b124ecc95.png)
```

# 4. 虚拟DOM与真实DOM

打印输出虚拟DOM和真实DOM进行比较
```javascript
const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
    <h1 id="title">
        <span>Hello,React</span>
    </h1>
)
// 渲染虚拟DOM到页面
ReactDOM.render(VDOM,document.getElementById('test'))
constTDOM= document.getElementById('demo')
console.log('虚拟DOM',VDOM);
console.log('真实DOM',TDOM);
debugger;
```
看看虚拟DOM身上有哪些属性 
<img width="433" alt="image" src="https://user-images.githubusercontent.com/117837871/216941884-1eb6f1e5-c9f2-429b-b6e0-38214ffd8a06.png">

看看真实DOM身上有哪些属性 
<img width="448" alt="image" src="https://user-images.githubusercontent.com/117837871/216941911-7af3b347-61b2-4a52-93a3-c98240f22c6d.png">

	1. 虚拟DOM本质是Object类型的对象（一般对象）
	
	2. 虚拟DOM比较 “轻”，真实DOM比较 “重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性
	
	3. 虚拟DOM最终会被React转化为真实DOM，呈现在页面上
# 5. JSX入门

## 5.1 概述

	1. 全称: JavaScript XML
	
	2. React定义的一种类似于XML的JS扩展语法: JS + XML本质是React.createElement(component, props, ...children)方法的语法糖
	
	3. 作用: 用来简化创建虚拟DOM 
	
		1. 写法：var ele = <h1>Hello JSX!</h1>
		
		2. 注意1：它不是字符串, 也不是HTML/XML标签
		
		3. 注意2：它最终产生的就是一个JS对象
		
	4. 标签名任意: HTML标签或其它标签
	
	5. 标签属性任意: HTML标签属性或其它
	
## 5.2 基本语法规则

	1. 定义虚拟DOM时，不要写引号。
	
	2. 标签中混入JS表达式时要用 { }。
	
	3. 样式的类名指定不要用 class，要用 className。（因为class是ES6中类的关键字，所以不让用）
	
	4. 内联样式，要用 style={{ key:value }} 的形式去写。
	
	5. 只有一个根标签
	
	6. 标签必须闭合
	
	7. 标签首字母 
	
		1. 若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
		2. 若大写字母开头，React就去渲染对应的组件，若组件没有定义，则报错。
		
## 【补充】 区分js表达式与js语句

	1. 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方，下面这些都是表达式：
	
		1. a
		
		2. a+b
		
		3. demo(1) // 函数调用表达式
		
		4. arr.map()
		
		5. function test () {}
		
	2. 语句(代码)，下面这些都是语句(代码)：【控制语句，控制代码走向，而不是产生值】
	
		1. if(){ }
		
		2. for(){ }
		
		3. switch( ){case:xxxx}
		
## 5.3 总结

	1. 遇到 < 开头的代码, 以标签的语法解析: html同名标签转换为html同名元素, 其它标签需要特别解析
	
	2. 遇到以 { 开头的代码，以JS语法解析: 标签中的js表达式必须用{ }包含
