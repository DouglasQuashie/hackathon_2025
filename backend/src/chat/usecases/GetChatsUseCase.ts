import { IChatRepositoryGetChats } from '../interfaces/IChatRepository';
import { Chat } from '@/common/entities/Chat';
import { InputFactory, OutputFactory, UseCase, UseCaseResponseBuilder } from '@/common/interfaces/UseCase';

type Input = InputFactory<
	{ zone: string },
	{
		getChats: IChatRepositoryGetChats['getChats'];
	}
>;

type Output = OutputFactory<Chat[]>

export const GetChatUseCase: UseCase<Input, Output> = (deps) => {
	const { getChats } = deps;
	return {
		async execute(data) {
			try {
				const chats = await getChats(data.zone);

				return UseCaseResponseBuilder.success(200, chats);
			} catch (error) {
				console.log('GetChat Error', error);
				return UseCaseResponseBuilder.error(500, 'Something went wrong !');
			}
		}
	};

};

