import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import ticketRouter from "./Routes/TicketRoutes.js";
import mongoose from "mongoose";

dotenv.config();
connectDatabase();
const cors = require('cors')
const express = require('express');
const app = express();
// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// API
app.use("/import", ImportData);
app.use("/products", productRoute);
app.use("/registers", userRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/tickets", ticketRouter);
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define message schema
const messageSchema = new mongoose.Schema({
  recipient: String,
  sender: String, // Add the sender field to the schema
  message: String,
  timestamp: String,
});

// Create message model
const Message = mongoose.model("Message", messageSchema);

// Save a new message to MongoDB
app.post("/messages", (req, res) => {
  const { recipient, sender, message, timestamp } = req.body;

  const newMessage = new Message({
    recipient,
    sender,
    message,
    timestamp,
  });

  newMessage.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving the message");
    } else {
      res.status(200).send("Message saved successfully");
    }
  });
});

// Retrieve messages for a specific recipient
app.get("/messages/:recipient", (req, res) => {
  const recipient = req.params.recipient;

  Message.find({ recipient }, (err, messages) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving messages");
    } else {
      res.status(200).json(messages);
    }
  });
});

// Define a calendar event schema and model
const eventSchema = new mongoose.Schema({
  title: String,
  start: Date,
  end: Date,
});
const Event = mongoose.model("Event", eventSchema);

// Save a new event
app.post("https://hr-360.vercel.app/events", (req, res) => {
  const { title, start, end } = req.body;
  const newEvent = new Event({
    title,
    start,
    end,
  });
  newEvent.save((err, savedEvent) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving the event");
    } else {
      res.status(201).json(savedEvent);
    }
  });
});

// Retrieve all events
app.get("https://hr-360.vercel.app/events", (req, res) => {
  Event.find({}, (err, events) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving events");
    } else {
      res.status(200).json(events);
    }
  });
});

// Update an event
app.put("https://hr-360.vercel.app/events/:eventId", (req, res) => {
  const { eventId } = req.params;
  const { title } = req.body;
  Event.findByIdAndUpdate(
    eventId,
    { title },
    { new: true },
    (err, updatedEvent) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating the event");
      } else {
        res.status(200).json(updatedEvent);
      }
    }
  );
});

// Delete an event
app.delete("https://hr-360.vercel.app/events/:eventId", (req, res) => {
  const { eventId } = req.params;
  Event.findByIdAndRemove(eventId, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting the event");
    } else {
      res.sendStatus(204);
    }
  });
});
// Assuming you have set up your server using Express.js and connected to MongoDB

app.post("/messages", (req, res) => {
  const newMessage = req.body; // Assuming the request body contains the new message object

  // Save the new message to MongoDB
  db.collection("messages")
    .insertOne(newMessage)
    .then(() => {
      res.status(200).send("Message saved successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred while saving the message");
    });
});

// Create an Attendance schema
const attendanceSchema = new mongoose.Schema({
  employeeName: String,
  employeeEmail: String,
  attendance: Number, // Change the type to Number
});

// Create an Attendance model
const Attendance = mongoose.model("Attendance", attendanceSchema);

// API route to save attendance
app.post("https://hr-360.vercel.app/attendance", (req, res) => {
  const { attendanceData } = req.body;

  // Check if any radio button is empty
  const isAnyEmpty = attendanceData.some(
    (attendance) => attendance.attendance === ""
  );
  if (isAnyEmpty) {
    return res
      .status(400)
      .json({ error: "Please fill all the radio buttons." });
  }

  // Create an array of attendance documents
  const attendanceDocuments = attendanceData.map((attendance) => ({
    employeeName: attendance.employeeName,
    employeeEmail: attendance.employeeEmail,
    attendance: attendance.attendance,
  }));

  // Save the attendance documents to the database
  Attendance.insertMany(attendanceDocuments, (err, savedAttendance) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to save attendance." });
    } else {
      res.json(savedAttendance);
    }
  });
});

app.get("https://hr-360.vercel.app/attendance", (req, res) => {
  Attendance.find({}, (err, attendanceData) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch attendance data." });
    } else {
      console.log(attendanceData);
      res.json(attendanceData);
    }
  });
});

app.get("/getusers",(req,res)=>{
  console.log("user req res",req)
})

app.get("/getusers",
// asyncHandler(async 
  (req, res) => {
  console.log("user req res",req)
  // const user = await User.find({});
  res.json(user.name);
}
// )
);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
