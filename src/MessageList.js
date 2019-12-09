import React from 'react';
import './App.css';


class MessageList extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        var box = document.getElementById('messageList');   // to position scroll down
    box.scrollTop = box.scrollHeight;
    }

    render() { 
        return ( <div  className="chatbox-messageList" id="messageList">
                <ul className="message-list">                 
            {this.props.messages.map(message => {
              return (
               <li key={message.id} className="message">
                 <div>{message.senderId} </div>
                 <div> {message.text} </div>
               </li>
             )
           })}
         </ul>
            
            </div> );
    }
}
 
export default MessageList;