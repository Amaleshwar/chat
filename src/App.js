import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';

import ChatBox from "./ChatBox";


var button ='';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Loggedin: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')).Loggedin : false,
                    temp:null,
                    user_name: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')).user_name : false,
                    
                  }
    // this.state = { Loggedin: true,
    // temp:null,
    //}
  }


onUnload = (event) => {
  sessionStorage.setItem("state", JSON.stringify(this.state))
  
}
componentDidMount() {
 console.log(sessionStorage.getItem('state'))
 console.log(sessionStorage.getItem('user'))
 window.addEventListener("beforeunload", this.onUnload)
 //console.log(JSON.parse(sessionStorage.getItem('state')));
}

componentWillUnmount() {
// console.log(sessionStorage.getItem('state'))
  window.removeEventListener("beforeunload", this.onUnload)
  // console.log(sessionStorage.getItem('state'))
}
 
 Logout(){
  sessionStorage.setItem("loaded",false)
  sessionStorage.removeItem('loaded');
  this.setState({ Loggedin: false })
 }
 callbackFunction = (childData,username) => {
  if( childData ==='true' ){
  
  this.setState({ Loggedin: childData,user_name: username})
  this.onUnload();
  }
  else
  console.log("Else in Callback "+childData);
}


menuchange(menuitem,i){

 console.log(menuitem)



    this.setState({ CurComp: menuitem })

    // var ele = document.getElementById(i)
    // ele.classList.add('orange')
   
 
 
}

render(){
  console.log("username is" ,this.state.user_name)
  return (
    <div>
    <div className="App" id="appid" >
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <h2 className="header-Text">  Chat App <br/></h2>
        
  {this.state.Loggedin &&  <button  id="submit" className="Logout" value="Login" onClick={() => this.Logout()}>Logout </button>} 
  
      </header>
  {this.state.Loggedin &&    <ChatBox  sendername={this.state.user_name}/> }


{this.state.Loggedin ? <div  className="App-body"> 
  {this.state.CurComp} </div> :
   <div  className="App-login-body"><Login parentCallback = {this.callbackFunction}/>   </div> }
    </div>
    </div>
  );
}
}
export default App;
