import { AddChatDto } from '../interfaces/dto/AddChatDto';
import ChatSend from '@/chat/events/ChatSend';
import { InputFactory, OutputFactory, UseCase } from '@/common/interfaces/UseCase';

type Input = InputFactory<
	AddChatDto,
	{
		addChat: (data: AddChatDto) => Promise<void>;
	}
>
type Output = OutputFactory<null>

export const AddChatUseCase: UseCase<Input, Output> = (deps) => {
	const { addChat } = deps;
	return {
		async execute(data) {
			try {
				await addChat(data);
				ChatSend.emit(data);

				return {
					isSuccess: true,
					status: 201,
					data: null
				};
			} catch (error) {
				console.log('AddChat Error', error);
				return {
					isSuccess: false,
					status: 500,
					message: 'Something went wrong !'
				};
			}
		}
	};

};

