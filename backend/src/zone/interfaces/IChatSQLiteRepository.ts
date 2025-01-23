import { IChatRepositoryAddChat, IChatRepositoryGetChats } from '@/zone/interfaces/IChatRepository';

export interface IChatSQLiteRepository extends IChatRepositoryAddChat, IChatRepositoryGetChats {
}
