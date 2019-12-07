import React from 'react';
import Axios from 'axios';

import loginimg from './images/login-img.jpg';
// import loginimg1 from './images/molecular-background.jpg';
// import loginimg2 from './images/login-img.jpg';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errormsg:'',
                        loginbox: true,
                        registerbox:false,
                    }
         }
         
    componentDidMount(){
        this.loginpopup();
    }
    loginpopup(){
        document.getElementById('LoginPopup').style.display='block';
    }

    validateUser(){
       
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            var result;
            let formdata =new FormData();
            formdata.append('user_name',username);
            formdata.append('user_pwd',password);
            Axios.post("http://localhost:8000/user_validate",formdata)
            .then(res=>{console.log(res.statusText)
            result =res.data;
            this.sendData(username);
            if(result===1){
                sessionStorage.setItem("loaded",true)
                
                this.setState({errormsg:''})
            }
            else
            {
                this.setState({errormsg:result})
              
            }
        })
    }
    sendData = (username) => {
        this.props.parentCallback("true",username);
        console.log("to_parent")
      }
      handlenewuser(){
         
          let username = document.getElementById("uname_register").value;
          let password = document.getElementById("pwd_register").value;
          let confirmpwd = document.getElementById("pwd_cnfrm").value;
          let eamilid = document.getElementById("email_id").value;
          let contactnumber = document.getElementById("cont_No").value;

          var result;
          let formdata =new FormData();
          formdata.append('user_name',username);
          formdata.append('user_pwd',password);
          formdata.append('user_email_id',eamilid);
          formdata.append('user_cont_no',contactnumber);
        if(username!==''&&password!==''&&eamilid!=='' && password===confirmpwd){
                Axios.post("http://localhost:8000/user_register",formdata)
                .then(res=>{console.log(res.statusText)
                result =res.data;
          })
        }
        else{
        
            this.setState({errormsg:'Please Enter the Correct Details'});
            return;  
        }
      }
      TologinUser(){
        this.setState({registerbox:false,loginbox:true,errormsg:''})
      }
      Tocreateuser(){
        this.setState({registerbox:true,loginbox:false,errormsg:''})
      }
      handlecnfmpwd(){
        let password = document.getElementById("pwd_register").value;
        let confirmpwd = document.getElementById("pwd_cnfrm").value;

        if(password!==confirmpwd)
        this.setState({errormsg:'Password does not match'});
      }
      handleemailId(){
          this.setState({errormsg:''})
        let eamilid = document.getElementById("email_id").value;
        var regEmail= /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var validate= regEmail.test(eamilid)
        if(!validate){
            this.setState({errormsg:'please enter valid EmailId'});
            return;
        }
      }
    render() { 
        return ( 
        <div id="LoginPopup"  className="login-wrapper">
            
                    <div className="imgcontainer">
                        <button  id="submit" value="Login" onClick={() => this.TologinUser()}>Login </button> &nbsp;
                        <button  id="submit" value="Login" onClick={() => this.Tocreateuser()}>New User </button>
                        <strong></strong>
                    </div>

          {this.state.loginbox &&  <div className="Login-box row">
                                    <div className="login-img col-sm-6 col-md-6 col-lg-6">
                            <img src={loginimg} className="login-img-tag" alt={"hi"} />
                    </div>
                <table className="login col-sm-6 col-md-6 col-lg-6">
                    <tr>
                        <input className="input100" type="text"name="username" id="username" title="Enter User Name" placeholder="Enter UserName"/>
                    </tr>
                    <tr><input type="password" className="input100" name="password" id="password" placeholder="Enter Password" /> </tr>
                    <tr><button  id="submit" value="Login" onClick={(e) => this.validateUser(e)}>Login </button></tr>
                </table>{this.state.errormsg}

            </div > }
            
            {this.state.registerbox && <div className="Register-box">
                    <table className="login">
                    <tr><input type="text" className="input100" name="username" id="uname_register" title="Enter User Name" placeholder="Enter UserName" /></tr>
                    <tr><input type="text"  className="input100" name="password" id="email_id"  placeholder="Enter Email ID" onBlur={()=>this.handleemailId()}/></tr>
                    <tr><input type="password" className="input100"  name="password" id="pwd_register" placeholder="Enter Password" /></tr>
                    <tr><input type="text" className="input100"  name="password" id="pwd_cnfrm"onBlur={()=>this.handlecnfmpwd()} placeholder="Confirm Password" /></tr>
                    <tr><input type="text" className="input100" name="password" id="cont_No" placeholder="Enter Contact Number" /></tr>
                    <tr><button  id="submit" value="Login" onClick={() => this.handlenewuser()}>Register </button></tr>
            </table>{this.state.errormsg}

            </div >}

         
    </div> );
    }
}




