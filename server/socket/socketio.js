const Inbox = require("../models/inbox");
const Message = require("../models/message");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");

module.exports = function (io) {
  io.on("connection", (socket) => {
    let onlineUsers = [];
    console.log("User connected!");
    socket.on("login", (userId) => {
      if (userId) {
        onlineUsers.push(socket.id);
        console.log("User connected: ", socket.id);
        io.emit("updateUserStatus", { userId, status: "online" });
      } else {
        console.log("Socket: No user with id: ", userId);
      }
    });

    socket.on("logout", async (userId) => {
      if (userId !== undefined) {
        const userFound = await User.findByIdAndUpdate(
          userId,
          {
            status: "offline",
          },
          { new: true }
        );
        onlineUsers.pop(socket.id);

        io.emit("updateUserStatus", { userId, status: "offline" });
        if (userFound) {
          socket.disconnect();
          console.log("User disconnected: ", socket.id);
        }
      }
    });

    socket.on("sendMessage", async ({ receiverId, content }) => {
      const senderId = socket.handshake.auth.authId;

      let inbox = await Inbox.findOne({
        $or: [
          { participants: [senderId, receiverId] },
          { participants: [receiverId, senderId] },
        ],
      });

      if (!inbox) {
        inbox = await Inbox.create({ participants: [senderId, receiverId] });
      }

      const roomId = inbox._id.toString();
      socket.join(roomId);

      const usersInRoom = await io.in(roomId).fetchSockets();
      const users = [];
      usersInRoom.forEach((socket) => {
        users.push(socket.handshake.auth.authId);
      });

      const messageToSend = {
        _id: uuidv4(),
        senderId,
        content,
        isRead: users.includes(receiverId),
        createdAt: new Date(),
      };
      console.log(messageToSend);
      io.to(roomId).emit("message", messageToSend);

      io.emit("lastMessageHere", { messageToSend, roomId });

      await Message.create({
        content,
        isRead: messageToSend.isRead,
        senderId,
        receiverId,
        inboxId: inbox._id,
      });

      inbox.lastMessage = messageToSend;

      await inbox.save();

      console.log(inbox.lastMessage);
    });

    socket.on("joinRoom", async ({ receiverId }) => {
      const senderId = socket.handshake.auth.authId;

      const inbox = await Inbox.findOne({
        $or: [
          { participants: [senderId, receiverId] },
          { participants: [receiverId, senderId] },
        ],
      });

      if (inbox) {
        const room = inbox._id.toString();

        socket.rooms.forEach((lastRoom) => {
          if (lastRoom !== room) socket.leave(lastRoom);
        });

        socket.join(room);
        console.log(senderId, " joined ", room);
      } else {
        socket.emit("noPreviousMessages", { receiverId });
      }
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected!");
    });
  });
};
