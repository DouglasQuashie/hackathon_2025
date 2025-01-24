import { EventManager } from "@/common/utils/EventManager";
import { AddChatDto } from "@/zone/interfaces/dto/AddChatDto";
import { AddZoneDto } from '@/zone/interfaces/dto/AddEventDto';

const EventSend = EventManager<AddZoneDto>();

export default EventSend;
