import { useChat } from "ai/react";

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    return (
        <div className="flex flex-col h-full border border-gray-300">
            <div className="flex p-4">
                <h1>Chat</h1>
            </div>
            
            {/* Zone des messages */}
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`mb-4 ${
                            m.role === "user" ? "text-right" : "text-left"
                        }`}
                    >
                        <span
                            className={`inline-block p-3 rounded-lg max-w-xs ${
                                m.role === "user"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            {m.content}
                        </span>
                    </div>
                ))}
            </div>

            {/* Zone d'entrée */}
            <form
                onSubmit={handleSubmit}
                className="p-4 border-t flex items-center"
            >
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Tapez votre message..."
                    className="px-4 py-2 border rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Envoyer
                </button>
            </form>
        </div>
    );
}
