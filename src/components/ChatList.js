import React from "react";

const ChatList = ({ chats, selectChat }) => {
  return (
    <div className="chat-list">
      {chats.map((chat, index) => (
        <div
          key={index}
          className="chat-item"
          onClick={() => selectChat(chat.name)}
        >
          <img src={chat.avatar} alt={chat.name} />
          <div>
            <h3>{chat.name}</h3>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
