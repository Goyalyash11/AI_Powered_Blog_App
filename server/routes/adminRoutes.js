import express from "express";
import {
  adminLogin,
  approveCommentById,
  deleteCommentbyId,
  getAllBlogsAdmin,
  getAllComments,
  getdashboardData,
} from "../controllers/adminController.js";
import auth from "../middlewares/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments);
adminRouter.get("/blogs", auth, getAllBlogsAdmin);
adminRouter.post("/delete-comment", auth, deleteCommentbyId);
adminRouter.post("/approve-comment", auth, approveCommentById);
adminRouter.get("/dashboard", auth, getdashboardData);

export default adminRouter;
