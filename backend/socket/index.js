// socket/index.js
import { handleRooms } from './rooms.js';
import { handleMessages } from './messages.js';

export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Handle room-related events
    handleRooms(io, socket);

    // Handle message-related events
    handleMessages(io, socket);

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
