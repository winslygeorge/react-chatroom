import React, { useEffect, useState } from 'react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
// import './styles.css';
import './App.css'
import Login from './components/Login';

const App = () => {
  const [chats, setChats] = useState([
    { name: 'james', lastMessage: 'Hi Winslow, are you currently looking...', avatar: 'path/to/avatar1.jpg' },
    { name: 'kamau', lastMessage: 'Update! Winslow, we\'ve just pu...', avatar: 'path/to/avatar2.jpg' },
    { name: 'peter', lastMessage: 'Update! Winslow, we\'ve just pu...', avatar: 'path/to/avatar2.jpg' },

    // Add more chat data here
  ]);

  const [username, setUsername] = useState(null)
    const [clientId, setClientId] = useState(null)


  const [currentChat, setCurrentChat] = useState('james');
  const [messages, setMessages] = useState([
    // { text: 'Hi Winslow', fromSelf: false },
    // { text: 'Hope you\'re having a good week.', fromSelf: false },
    // Add more message data here
  ]);

  const selectChat = (index) => {
    setCurrentChat(index);
    // Load messages for the selected chat
  };

  const sendMessage = (message) => {
    setMessages([...messages, { text: message, fromSelf: true }]);
  };



   useEffect(() => {

    if (username !== '' && username !== null && username !== undefined) {
      
          localStorage.setItem('username', username)
    }
    

  }, [username])


  useEffect(() => {

    let user = localStorage.getItem('username') ?? ''

    setUsername(user)

    console.log(user)

   let  eventSource =  new EventSource(`http://localhost:3000/events?username=${user}`)
    
    if (eventSource !== null) {
      
  
      eventSource.onmessage = function (event) {

        console.log(clientId, JSON.parse(event.data))

        const mesData = JSON.parse(event.data)

        if (clientId === null && mesData.tag === "clientId") {
          setClientId(mesData.message); // Set the client ID on initial connection
          console.log(mesData.message, clientId, mesData)

        } else {
          setMessages(prevMessages => [...prevMessages, mesData]);

        }
          

      };



      return () => {
        eventSource.close();
      };
      
    }

  }, []);
  

  
  

  return (
    <>
      <Login username={username} setUsername={setUsername} clientId={clientId}/>
    <div className="chatroom">
      <ChatList chats={chats} selectChat={selectChat} />
      <div className="chat-container">
        <ChatWindow messages={messages.filter((message, index)=>(message?.from === currentChat || message.to === currentChat))} currentChat={currentChat} />
        <MessageInput from={username} to={currentChat} clientId={clientId}/>
      </div>
      </div>
      </>
  );
};

export default App;
