const ChatMessage = ({message}) => {
    return (
        <div className={`chat-message ${message.user === 'gpt' && 'chat-gpt'}`}>
            <div className="chat-message-center">
                <div className={`avatar ${message.user === 'gpt' && 'chat-gpt'}`}></div>
                <div className="message">
                   {message.message}
                </div>
            </div>
        </div>
    )
};

export default ChatMessage;