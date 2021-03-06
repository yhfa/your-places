import { Router } from "express";
import { check } from "express-validator";

import fileUpload from "./../middleware/file-upload.js";
import { getAllUsers, signup, login } from "../controllers/users-controller.js";
const router = Router();

router.route("/").get(getAllUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  signup
);

router.post("/login", login);

export default router;
