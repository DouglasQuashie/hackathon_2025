import { ChangeEvent, FC, useEffect, useState } from 'react';
import socket from './lib/socket.ts';
import { WsEvent } from './lib/common/WsEvent.ts';
import { useParams } from 'react-router';

type HomeProps = {}

const ChatPage:FC<HomeProps> = () => {
	const params = useParams();
	const zone = params.zone;
	const [message, setMessage] = useState<string>("")
	const [list, setList] = useState<any[]>([])

	const sendMessage = () => {
		socket.emit(WsEvent.CHAT_SEND, { content: message, username: "test", zone })
		console.log("WsEvent.CHAT_SEND !!!!!");

		setList((prevState) => [...prevState, message])
	}

	useEffect(() => {
		socket.on(WsEvent.SEND_CHAT, (data) => {
			console.log("WsEvent.SEND_CHAT !!!!!");
			setList((list) => [...list, data])
		});
		return () => {
			socket.off(WsEvent.SEND_CHAT)
		}
	}, [socket]);

	return (
		<div>
			<input value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}/>
			<button onClick={sendMessage}>Submit....</button>
			{list?.map((item, idx) => <p key={idx}>{item.content}</p>)}
		</div>
	);
};

export default ChatPage;
