import prisma from '@/common/db';
import { IZoneSQLiteRepository } from '@/zone/interfaces/IZoneSQLiteRepository';
import { Zone } from '@/zone/interfaces/Zone';

export const ZoneSqliteRepository = (): IZoneSQLiteRepository => {
	return {
		getZones(): Promise<Zone[]> {
			return prisma.zone.findMany();
		}
	};
};
