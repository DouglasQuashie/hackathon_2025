import prisma from '@/common/db';
import { AddEventDto } from '@/zone/interfaces/dto/AddEventDto';
import { IEventRepositoryAddZone } from '@/zone/interfaces/IEventRepository';
import { Event } from '@/zone/interfaces/Event';

export const EventSqliteRepository = (): IEventRepositoryAddZone => {
	return {
		addEvent(data: AddEventDto): Promise<Event> {
			return prisma.event.create({ data })
		},
	};
};
