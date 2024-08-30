import React from "react";

const Message = (props) => {
  const { tag, message, from, to, dateTime, mine, sincePeriod } =
    props?.message;
  return (
    <div className={`message ${mine ? "self" : ""}`}>
      <p>{message}</p>
    </div>
  );
};

export default Message;
