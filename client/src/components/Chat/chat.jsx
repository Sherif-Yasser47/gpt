import "./chat.css";
import { useState} from "react";

import ChatMessage from "./chatMessage";
import { sendMessage } from "../../api/services";

function Chat() {
  const [input, setInput] = useState("");
  const [chatContent, setChatContent] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let chatContentNew = [...chatContent, { user: "me", message: `${input}` }];
    setInput("");

    sendMessage(chatContentNew[chatContentNew.length - 1].message).then(
      (response) => {
        setChatContent([
          ...chatContentNew,
          { user: "gpt", message: response.data.A },
        ]);
      }
    );

    console.log("submitted");
  };

  const clearChat = () => {
    setChatContent([]);
  };

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="sidemenu-button" onClick={clearChat}>
          <span>+</span>
          New Chat
        </div>
      </aside>

      <section className="chatbox">
        <div className="chat-content">
          {chatContent.map((message, index) => {
            return <ChatMessage key={index} message={message} />;
          })}
        </div>

        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-text-area"
              placeholder="Type your message here"
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Chat;
