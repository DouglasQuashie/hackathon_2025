import { InputFactory, OutputFactory, UseCase, UseCaseResponseBuilder } from '@/common/interfaces/UseCase';
import { IZoneSQLiteRepository } from '@/zone/interfaces/IZoneSQLiteRepository';
import { ZoneItem } from '@/zone/interfaces/Zone';

type Input = InputFactory<
	void,
	{
		getZones: IZoneSQLiteRepository['getZones'];
	}
>;

type Output = OutputFactory<ZoneItem[]>;

export const GetZonesUseCase: UseCase<Input, Output> = (deps) => {
	const { getZones } = deps;
	return {
		async execute() {
			try {
				const zones = await getZones();

				const zonesMaps = zones.map((zone) => {
					const coordinates = []
					for (let i = 1; i <= 5; i++) {

						// @ts-ignore
						const [long, lat] = zone[`edge${i}`].split(",")

						coordinates.push({
							longitude: long,
							latitude: lat
						});
					}

					return {
						name: zone.name,
						coordinates
					}
				});

				return UseCaseResponseBuilder.success(200, zonesMaps);
			} catch (error) {
				console.log('GetChat Error', error);
				return UseCaseResponseBuilder.error(500, 'Something went wrong !');
			}
		}
	};

};

