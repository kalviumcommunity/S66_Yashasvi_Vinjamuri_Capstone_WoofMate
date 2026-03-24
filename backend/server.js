const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
require("./config/passport");

const connection = require("./db/database");
const userRouter = require("./routes/user.route");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "woofmate_secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.chatId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const config = {
  port: process.env.PORT,
};

const dogRouter = require("./routes/dog.route");
const rescueRouter = require("./routes/rescue.route");
const donationRouter = require("./routes/donation.route");
const chatRouter = require("./routes/chat.route");
const aiRouter = require("./routes/ai.route");
const guideRouter = require("./routes/guide.route");
const featureRouter = require("./routes/feature.route");
const testimonialRouter = require("./routes/testimonial.route");
const questionRouter = require("./routes/question.route");
const carouselRouter = require("./routes/carousel.route");
const contactRoutes = require("./routes/contact.route");
const serviceBookingRoutes = require("./routes/serviceBooking.route");

app.use("/", userRouter);
app.use("/auth", require("./routes/auth.route"));
app.use("/api/dogs", dogRouter);
app.use("/api/rescue", rescueRouter);
app.use("/api/donations", donationRouter);
app.use("/api/chat", chatRouter);
app.use("/api/ai", aiRouter);
app.use("/api/guides", guideRouter);
app.use("/api/places", require("./routes/places.route"));
app.use("/api/features", featureRouter);
app.use("/api/testimonials", testimonialRouter);
app.use("/api/questions", questionRouter);
app.use("/api/carousel", carouselRouter);
app.use("/api/contact", contactRoutes);
app.use("/api/service-bookings", serviceBookingRoutes);

server.listen(config.port, async () => {
  try {
    await connection;
    console.log(`server running on http://localhost:${config.port}`);
  } catch (error) {
    console.log(error);
  }
});
