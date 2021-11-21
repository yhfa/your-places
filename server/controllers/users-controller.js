import { v4 as uuid } from "uuid";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error.js";
import User from "../models/user.js";

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Youssif Hany",
    email: "test@test.com",
    password: "testtest1",
  },
  {
    id: "u2",
    name: "Jack Dorsi",
    email: "test@test.com",
    password: "testtest2",
  },
  {
    id: "u3",
    name: "Rose Michel",
    email: "test@test.compg",
    password: "testtest3",
  },
];

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    return next(
      new HttpError("Could not get users now, please try again later.", 500)
    );
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};
export const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invaild inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later.", 500)
    );
  }

  if (existingUser) {
    return next(
      new HttpError("Could not create user, email already exists", 422)
    );
  }

  const createdUser = new User({
    name,
    email,
    password,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return next(new HttpError("Signing up failed, please try again.", 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email, password });
    console.log(existingUser);
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later.", 500)
    );
  }

  if (!existingUser) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong.",
        401
      )
    );
  }

  res.json({ message: "Logged in!" });
};
