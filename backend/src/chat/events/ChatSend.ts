import { EventManager } from "@/common/utils/EventManager";
import { AddChatDto } from "@/chat/interfaces/dto/AddChatDto";

const ChatSend = EventManager<AddChatDto>();

export default ChatSend;
