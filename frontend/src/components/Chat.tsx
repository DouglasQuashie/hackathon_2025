import socket from '../lib/socket';
import { WsEvent } from '../lib/common/WsEvent.ts';
import type { Chat } from '../lib/chat/interfaces/Chat.ts';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { getChatByZone } from '../services/Api.ts';

export default function Chat() {
    const username = localStorage.getItem('username')!;
    const zone = localStorage.getItem("zone")!;

    const [content, setContent] = useState<string>('');
    const [chats, setChats] = useState<Chat[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Fonction pour scroller jusqu'au bas
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // Fetch des messages à l'initialisation
        const fetchChats = async () => {
            const chatsFetch = await getChatByZone(zone);
            console.log(chatsFetch);
            setChats(chatsFetch.data);
        };
        fetchChats();

        // Écoute des nouveaux messages
        socket.on(WsEvent.SEND_CHAT, (chat: Chat) => {
            setChats((list) => [...list, chat]);
        });

        return () => {
            socket.off(WsEvent.SEND_CHAT);
        };
    }, [zone]);

    useEffect(() => {
        // Scroller automatiquement quand les messages changent
        scrollToBottom();
    }, [chats]);

    const sendMessage = (e: FormEvent) => {
        e.preventDefault();
        const chat: Chat = {
            id: v4(),
            createdAt: new Date(),
            content,
            zone,
            username,
        };
        socket.emit(WsEvent.CHAT_SEND, chat);

        setChats((prevChats) => [...prevChats, chat]);
        setContent('');
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex p-4">
                <h1 className='text-2xl'>Chat</h1>
            </div>

            {/* Zone des messages */}
            <div className="flex-1 p-4 overflow-y-auto">
                {chats.length > 0 && chats.map((m) => (
                    <div
                        key={m.id}
                        className={`mb-4 break-words text-right ${m.username === username ? 'text-end' : 'text-start'}`}
                    >
                        <div
                            className={`inline-block p-3 rounded-lg max-w-xs bg-blue-500 text-white`}
                        >
	                        <p className="text-black text-sm">{m.username}</p>
                            {m.content}
                        </div>
                    </div>
                ))}

                {/* Référence pour scroller en bas */}
                <div ref={messagesEndRef} />
            </div>

            {/* Zone d'entrée */}
            <form
                onSubmit={sendMessage}
                className="p-4 border-t flex items-center"
            >
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
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
