import express from "express";
import asyncHandler from "express-async-handler";
import People from "../Models/PeopleModel.js";
import { admin, protect } from "../Middleware/AuthMiddleware.js";

const peopleRoute = express.Router();

// GET ALL PEOPLE
peopleRoute.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await People.countDocuments({ ...keyword });
    const people = await People.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ people, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL PEOPLE WITHOUT SEARCH AND PEGINATION
peopleRoute.get(
  "/all",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const people = await People.find({}).sort({ _id: -1 });
    res.json(people);
  })
);

// GET SINGLE PEOPLE
peopleRoute.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const people = await People.findById(req.params.id);
    if (people) {
      res.json(people);
    } else {
      res.status(404);
      throw new Error("People not Found");
    }
  })
);

// PEOPLE REVIEW
peopleRoute.post(
  "/:id/review",
  protect,
  asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const people = await People.findById(req.params.id);

    if (people) {
      const alreadyReviewed = people.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("People already Reviewed");
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      people.reviews.push(review);
      people.numReviews = people.reviews.length;
      people.rating =
        people.reviews.reduce((acc, item) => item.rating + acc, 0) /
        people.reviews.length;

      await people.save();
      res.status(201).json({ message: "Reviewed Added" });
    } else {
      res.status(404);
      throw new Error("People not Found");
    }
  })
);

// DELETE PEOPLE
peopleRoute.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const people = await People.findById(req.params.id);
    if (people) {
      await people.remove();
      res.json({ message: "People deleted" });
    } else {
      res.status(404);
      throw new Error("People not Found");
    }
  })
);

// CREATE PEOPLE
peopleRoute.post(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, email, dept, price, description, image, countInStock } = req.body;
    const peopleExist = await People.findOne({ name });
    if (peopleExist) {
      res.status(400);
      throw new Error("People name already exist");
    } else {
      const people = new People({
        name,
        email,
        dept,
        price,
        description,
        image,
        countInStock,
        user: req.user._id,
      });
      if (people) {
        const createdpeople = await people.save();
        res.status(201).json(createdpeople);
      } else {
        res.status(400);
        throw new Error("Invalid people data");
      }
    }
  })
);

// UPDATE PEOPLE
peopleRoute.put(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const { name, email, dept, price, description, image, countInStock } = req.body;
    const people = await People.findById(req.params.id);
    if (people) {
      people.name = name || people.name;
      people.email = email || people.email;
      people.dept = dept || people.dept;
      people.price = price || people.price;
      people.description = description || people.description;
      people.image = image || people.image;
      people.countInStock = countInStock || people.countInStock;

      const updatedPeople = await people.save();
      res.json(updatedPeople);
    } else {
      res.status(404);
      throw new Error("People not found");
    }
  })
);

// GET ALL PEOPLE
peopleRoute.get(
  "/getpeople",
  asyncHandler(async (req, res) => {
    const people = await People.find({});
    res.json(people);
  })
);

export default peopleRoute;