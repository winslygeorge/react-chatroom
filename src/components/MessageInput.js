import axios from "axios";
import React, { useState } from "react";

const MessageInput = ({ from, to, clientId }) => {
  const [message, setMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const sendMessage = async () => {
    setChatLoading(true);

    await axios
      .post(
        "http://localhost:3000/send-message",
        { from: from, to: to, clientId: clientId, message: message },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          mode: "no-cors",
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setChatLoading(false);
      });

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    setMessage("");
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Say something..."
      />
      <button type="submit">{chatLoading ? "loading..." : "Send"}</button>
    </form>
  );
};

export default MessageInput;
