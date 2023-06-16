export default function ChatMessage({ user, text }) {
	return (
		<div>
			<p className='chat__message'>
				<div className='chat__message__user'>{user}</div>
				<div>{text}</div>
			</p>
		</div>
	);
}
