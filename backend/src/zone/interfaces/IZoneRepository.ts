import { Zone } from '@/zone/interfaces/Zone';

export interface IZoneRepositoryGetZones {
	getZones(): Promise<Zone[]>;
}

