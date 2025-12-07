// backend/socket/messages.js
export const handleMessages = (io, socket) => {
  // Expect data: { roomId, senderId, senderName, message }
  socket.on('sendMessage', (data) => {
    console.log('Message received:', data);

    // Emit same payload to everyone in the room (including sender)
    io.in(data.roomId).emit('receiveMessage', {
      roomId: data.roomId,
      senderId: data.senderId || socket.id,
      senderName: data.senderName || 'Unknown',
      message: data.message,
      createdAt: Date.now()
    });
  });
};
