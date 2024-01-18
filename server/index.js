const express = require("express");
const app = express();
const { Server } = require("socket.io");
const server = require("http").createServer(app);

const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/error-handler");

connectDB();

app.use(express.json());

const io = new Server(server, {
  transports: ["polling", "websocket"],
  cors: {
    origin: "http://localhost:3000",
  },
});

require("./socket/socketio")(io);

app.use("/api/", require("./routes/role-routes"));
app.use("/api/", require("./routes/person-routes"));
app.use("/api/", require("./routes/user-routes"));
app.use("/api/", require("./routes/supplier-routes"));
app.use("/api/", require("./routes/material-routes"));
app.use("/api/", require("./routes/product-routes"));
app.use("/api/", require("./routes/product-process-routes"));
app.use("/api/", require("./routes/product-process-item-routes"));
app.use("/api/", require("./routes/contact-routes"));
app.use("/api/", require("./routes/inbox-routes"));

app.use(errorHandler);

server.listen(port, () => {
  console.log("It's working! " + port);
});
