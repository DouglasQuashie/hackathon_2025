import { AddEventDto } from '@/zone/interfaces/dto/AddEventDto';
import { Event } from '@/zone/interfaces/Event';
import { GetEventsDto } from '@/zone/interfaces/dto/GetEventsDto';

export interface IEventRepositoryAddZone {
	addEvent(addZone: AddEventDto): Promise<Event>;
}

export interface IEventRepositoryGetEvents {
	getEvents(event: GetEventsDto): Promise<Event[]>;
}


