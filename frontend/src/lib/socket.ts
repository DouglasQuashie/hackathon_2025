import { io } from 'socket.io-client';
import { WsEvent } from './common/WsEvent.ts';
import { getZone } from './common/zone.ts';

const socket = io('http://localhost:3001');

socket.emit(WsEvent.JOIN_ZONE, getZone());

export default socket;
