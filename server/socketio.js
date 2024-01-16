const Inbox = require("./models/inbox");
const Message = require("./models/message");
const User = require("./models/user");

module.exports = function (io) {
  io.on("connection", (socket) => {
    console.log("User connected!");
    socket.on("login", (userId) => {
      if (userId) {
        console.log("User connected: ", socket.id);
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

      console.log(inbox);
      if (!inbox) {
        inbox = await Inbox.create({ participants: [senderId, receiverId] });
      }

      const roomId = inbox._id.toString();
      socket.join(roomId);

      io.to(roomId).emit("message", {
        from: senderId,
        content,
      });

      /*
      const newMmessage = await Message.create({
        content,
        senderId,
        receiverId,
        inboxId: inbox._id,
      });

      inbox.lastMessage = {
        senderId,
        content,
        isRead: false,
        date: newMmessage.createdAt,
      };

      await inbox.save();
      

      io.to(room).emit("message", {
        from: senderId,
        content,
      });


      console.log({ inbox });
      */
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
