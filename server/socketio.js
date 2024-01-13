const Inbox = require("./models/inbox");
const Message = require("./models/message");
const User = require("./models/user");

let users = {};
let rooms = {};

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("login", async (userId) => {
      const userFound = await User.findById(userId);
      if (userFound) {
        users[socket.id] = userId;

        userFound.status = "online";
        await userFound.save();

        console.log("User connected: ", socket.id);
      } else {
        console.log("Socket: No user with id: ", userId);
      }
    });

    socket.on("logout", async () => {
      const userId = users[socket.id];

      if (userId !== undefined) {
        const userFound = await User.findByIdAndUpdate(
          userId,
          {
            $set: { status: "offline" },
          },
          { new: true }
        );

        if (userFound) {
          delete users[socket.id];

          socket.disconnect();
        }
      }
    });

    socket.on("sendMessage", async ({ receiverId, content }) => {
      const senderId = users[socket.id];

      let inbox = await Inbox.findOne({
        $or: [
          { pOne: senderId, pTwo: receiverId },
          { pOne: receiverId, pTwo: senderId },
        ],
      });

      if (!inbox) {
        inbox = await Inbox.create({
          pOne: senderId,
          pTwo: receiverId,
        });
      }
      const room = inbox._id.toString();

      console.log(rooms);

      if (!rooms[room]) {
        rooms[room] = [];
      }

      if (!Object.values(rooms[room]).includes(senderId)) {
        console.log(senderId);
        rooms[room].push(senderId);

        socket.join(room);
      }

      io.to(room).emit("message", {
        from: senderId,
        content,
      });

      /*
      await Message.create({
        content,
        senderId,
        receiverId,
        inboxId: inbox._id,
      });

      console.log({ receiverId, content, senderId });
      */
    });

    socket.on("joinRoom", async ({ receiverId }) => {
      const senderId = users[socket.id];

      const inbox = await Inbox.findOne({
        $or: [
          { pOne: senderId, pTwo: receiverId },
          { pOne: receiverId, pTwo: senderId },
        ],
      });

      if (inbox) {
        const room = inbox._id.toString();

        if (!rooms[room]) {
          rooms[room] = [];
        }

        rooms[room].push(senderId);

        socket.join(room);
        console.log(senderId, " joined");
      } else {
        socket.emit("noPreviousMessages", { receiverId });
      }
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected!");
    });
  });
};
