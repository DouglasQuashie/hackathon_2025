import prisma from '@/common/db';
import { AddEventDto } from '@/zone/interfaces/dto/AddEventDto';
import { IEventRepositoryAddZone, IEventRepositoryGetEvents } from '@/zone/interfaces/IEventRepository';
import { Event } from '@/zone/interfaces/Event';

export const EventSqliteRepository = (): IEventRepositoryAddZone & IEventRepositoryGetEvents => {
	return {
		getEvents(type): Promise<Event[]> {
			return prisma.event.findMany({ where: { type } });
		},
		addEvent(data: AddEventDto): Promise<Event> {
			return prisma.event.create({ data });
		}
	};
};
