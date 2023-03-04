import React ,{Component} from 'react'
import Search from './component/Search'
import User from './component/User'
export default class App extends Component {
  state = {
    user:[]
  }
  saveUsers = (users) =>{
    this.setState({users})
  }
  render(){
    const { users } = this.state
    return(
      <div className='container'>
        <Search saveUsers = {this.saveUsers}/>
        <User users={users}/>
      </div>
    )
  }
}