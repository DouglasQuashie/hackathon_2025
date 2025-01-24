import prisma from '@/common/db';
import { AddEventDto } from '@/zone/interfaces/dto/AddEventDto';
import { IEventRepositoryAddZone, IEventRepositoryGetEvents } from '@/zone/interfaces/IEventRepository';
import { Event } from '@/zone/interfaces/Event';

export const EventSqliteRepository = (): IEventRepositoryAddZone & IEventRepositoryGetEvents => {
	return {
		getEvents({ type, zoneId }): Promise<Event[]> {
			const sevenDaysAgo = new Date();
			sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

			return prisma.event.findMany({
				where: {
					type,
					zoneId,
					createdAt: {
						gte: sevenDaysAgo, // Récupère les événements créés après (ou exactement) il y a 7 jours
					},
				},
			});
		},
		addEvent(data: AddEventDto): Promise<Event> {
			return prisma.event.create({ data });
		}
	};
};
