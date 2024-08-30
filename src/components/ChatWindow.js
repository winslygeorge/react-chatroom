import React from "react";
import Message from "./Message";

const ChatWindow = ({ messages, currentChat }) => {
  return (
    <div className="chat-window">
      {messages?.length > 0
        ? messages.map((msg, index) => <Message key={index} message={msg} />)
        : `There are no chats from ${currentChat}`}
    </div>
  );
};

export default ChatWindow;
