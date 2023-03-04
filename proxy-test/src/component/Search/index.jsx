import React, {Component} from 'react'
import axios from 'axios'
export default class Search extends Component {
    search = () => {
      // 获取用户输入(连续解构赋值+重命名)
      const {keyWordElement: {value: keyWord}} = this
      // console.log(keyWord)
      // 发送网络请求
      axios.get(`/api1/search/users2?q=${keyWord}`).then(
        response => {
          console.log('成功')
          this.props.saveUsers(response.data.items)
        },
        error => {console.log('失败',error)}
      )
    }
    render() {
      return (
        <section className="jumbotron">
        <h3 className="jumbotron-heading">搜索Github用户</h3>
        <div>
            <input ref={c => this.keyWordElement = c} type="text" placeholder="请输入你要搜索的用户名" />&nbsp;
            <button onClick={this.search}>搜索</button>
        </div>
        </section>
      )
    }
  }