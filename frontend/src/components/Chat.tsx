import socket from '../lib/socket';
import { WsEvent } from '../lib/common/WsEvent.ts';
import type { Chat } from '../lib/chat/interfaces/Chat.ts';
import { Navigate } from 'react-router';
import { FormEvent, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { getChatByZone } from '../services/Api.tsx';

export default function Chat() {
    const zone = localStorage.getItem("zone");

    if (!zone)
        return <Navigate to="/" replace />;

    const [message, setMessage] = useState<string>('');
    const [chats, setChats] = useState<Chat[]>([]);


    useEffect(() => {
        const fetchChats = async () => {
            const chatsFetch = await getChatByZone(zone);
            console.log(chatsFetch);
            setChats(chatsFetch.data);
        };
        fetchChats();

        socket.on(WsEvent.SEND_CHAT, (chat: Chat) => {
            setChats((list) => [...list, chat]);
        });
        return () => {
            socket.off(WsEvent.SEND_CHAT);
        };
    }, []);

    const sendMessage = (e: FormEvent) => {
        e.preventDefault();
        const chat: Chat = {
            id: v4(),
            createdAt: new Date(),
            content: message,
            zone: "1",
            username: localStorage.getItem('username') ?? 'Default username',
        };
        socket.emit(WsEvent.CHAT_SEND, chat);

        setChats((prevChats) => [...prevChats, chat]);
        setMessage('');
    };

    return (
        <div className="flex flex-col h-full border border-gray-300">
            <div className="flex p-4">
                <h1 className='text-2xl'>Chat</h1>
            </div>

            {/* Zone des messages */}
            <div className="flex-1 p-4 overflow-y-auto">
                {chats.length > 0 && chats.map((m) => (
                    <div
                        key={m.id}
                        className={`mb-4 text-right`}
                    >
                        <span
                            className={`inline-block p-3 rounded-lg max-w-xs bg-blue-500 text-white`}
                        >
                            {m.content}
                        </span>
                    </div>
                ))}
            </div>

            {/* Zone d'entrée */}
            <form
                onSubmit={sendMessage}
                className="p-4 border-t flex items-center"
            >
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                    className="px-4 py-2 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="cursor-pointer ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Envoyer
                </button>
            </form>
        </div>
    );
}
