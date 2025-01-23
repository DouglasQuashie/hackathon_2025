import { ChangeEvent, FC, useEffect, useState } from 'react';
import socket from './lib/socket.ts';
import { WsEvent } from './lib/common/WsEvent.ts';
import { Chat } from './lib/chat/interfaces/Chat.ts';
import { v4 as uuidv4 } from 'uuid';
import { getZone } from './lib/common/zone.ts';

type HomeProps = {}

const ChatPage:FC<HomeProps> = () => {
	//const { zone } = useParams<{zone: string}>();

	navigator.geolocation.getCurrentPosition(
		(position) => {

	},
		(error) => {

		}
	);
	const [message, setMessage] = useState<string>('');
	const [chats, setChats] = useState<Chat[]>([]);

	const sendMessage = () => {
		const chat: Chat = {
			id: uuidv4(),
			createdAt: new Date(),
			content: message,
			zone: getZone(),
			username: localStorage.getItem('username') ?? 'Default username',
		};
		socket.emit(WsEvent.CHAT_SEND, chat);

		setChats((prevChats) => [...prevChats, chat]);
	};

	useEffect(() => {
		socket.on(WsEvent.SEND_CHAT, (chat: Chat) => {
			setChats((list) => [...list, chat]);
		});
		return () => {
			socket.off(WsEvent.SEND_CHAT);
		};
	}, [socket]);


	return (
		<div>
			<input value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}/>
			<button onClick={sendMessage}>Submit....</button>
			{chats.map((chat, idx) => <p key={idx}>{chat.content}</p>)}
		</div>
	);
};

export default ChatPage;
