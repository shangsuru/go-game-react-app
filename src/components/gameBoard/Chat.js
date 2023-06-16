import React, { useState, useEffect } from 'react';
import ChatMessage from '@/components/gameBoard/ChatMessage';

export default function Chat({ user }) {
	const [inputText, setInputText] = useState('');
	const [chat, setChat] = useState([]);

	// TODO
	const sendMessage = () => {
		if (inputText.length > 0) {
			setChat([...chat, { user: user, text: inputText }]);
			setInputText('');
		}
	};

	const handleEnter = (e) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};

	return (
		<div className='chatbox__outer'>
			<div className='chatbox'>
				<div className='chatbox__messagelist'>
					{chat.map((message) => {
						return <ChatMessage key={message.text} user={message.user} text={message.text} />;
					})}
				</div>
				<div className='chatbox__panel'>
					<input
						className='chatbox__input'
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						onKeyUp={handleEnter}
					/>

					<button className='chatbox__button' style={{ backgroundColor: '#34e346' }}>
						Pass
					</button>
					<button className='chatbox__button' style={{ backgroundColor: '#34e346' }}>
						Forfeit
					</button>
					<button className='chatbox__button' onClick={sendMessage}>
						<div>Send</div>
					</button>
				</div>
			</div>
		</div>
	);
}
