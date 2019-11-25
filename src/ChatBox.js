import React, { Component } from 'react';
import './App.css';

class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="chatbox-app ">
                <div  className="chatbox-header">
                    
                </div>
                <div  className="chatbox-body">
                    <div  className="chatbox-userList">
                            Amal <br/>Subhaga
                    </div>
                    <div  className="chatbox-message">
                        hello
                        <br/>
                        hi
                        <br/> hello
                        <br/>
                        hi
                        <br/> hello
                        <br/>
                        hi
                        <br/>

                    </div>
                </div> 
        </div> 
        );
    }
}
 
export default ChatBox;