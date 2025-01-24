import { AddEventDto } from '@/zone/interfaces/dto/AddEventDto';
import { Event } from '@/zone/interfaces/Event';


export interface IEventRepositoryAddZone {
	addEvent(addZone: AddEventDto): Promise<Event>;
}

export interface IEventRepositoryGetEvents {
	getEvents(type: string): Promise<Event[]>;
}


