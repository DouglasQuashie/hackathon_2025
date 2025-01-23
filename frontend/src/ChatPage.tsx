import { ChangeEvent, FC, useEffect, useState } from 'react';
import socket from './lib/socket.ts';
import { WsEvent } from './lib/common/WsEvent.ts';
import { Chat } from './lib/chat/interfaces/Chat.ts';
import { v4 as uuidv4 } from 'uuid';
import { getZone } from './lib/common/zone.ts';

type HomeProps = object

const ChatPage: FC<HomeProps> = () => {
	//const { zone } = useParams<{zone: string}>();

	const [message, setMessage] = useState<string>('');
	const [chats, setChats] = useState<Chat[]>([]);
	const [isGeoLocAccpeted, setIsGeoLocAccpeted] = useState<boolean | undefined>(undefined);

	navigator.geolocation.getCurrentPosition(
		(position) => {
			localStorage.setItem('coordinates', JSON.stringify({
				latitude: +position.coords.latitude,
				longitude: +position.coords.longitude,
			}));
			setIsGeoLocAccpeted(true);
		},
		() => {
			setIsGeoLocAccpeted(false);
		}
	);

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
	}, []);

	function getText() {
		if (isGeoLocAccpeted === undefined) {
			return <div>Undefined</div>;
		}

		if (!isGeoLocAccpeted) {
			return <div>False</div>;

		}
		return <div>True</div>;
	}


	return (
		<div>
			{getText()}

			<input value={message} onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}/>
			<button onClick={sendMessage}>Submit....</button>
			{chats.map((chat, idx) => <p key={idx}>{chat.content}</p>)}
		</div>
	);
};

export default ChatPage;
