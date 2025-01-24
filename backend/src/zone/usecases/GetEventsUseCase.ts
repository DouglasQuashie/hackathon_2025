import { InputFactory, OutputFactory, UseCase, UseCaseResponseBuilder } from '@/common/interfaces/UseCase';
import { IEventRepositoryGetEvents } from '@/zone/interfaces/IEventRepository';
import { Event } from '@/zone/interfaces/Event';

type Input = InputFactory<
	string,
	{
		getEvents: IEventRepositoryGetEvents['getEvents'];
	}
>;

type Output = OutputFactory<Event[]>;

export const GetEventsUseCase: UseCase<Input, Output> = (deps) => {
	const { getEvents } = deps;
	return {
		async execute() {
			try {
				const events = await getEvents();

				return UseCaseResponseBuilder.success(200, events);
			} catch (error) {
				console.log('GetChat Error', error);
				return UseCaseResponseBuilder.error(500, 'Something went wrong !');
			}
		}
	};

};

