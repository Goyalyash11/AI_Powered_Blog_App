import jwt from "jsonwebtoken";
import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Provide Password and Email",
      });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      token,
      message: "Login Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login Error",
      error: error.message,
    });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Get all Blogs Successfully",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Get All Blogs",
      error: error.message,
    });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Get all Comments Successfully",
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Get All Comments",
      error: error.message,
    });
  }
};

export const getdashboardData = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const drafts = await Blog.countDocuments({ isPublished: false });

    const dashboardData = {
      recentBlogs,
      blogs,
      comments,
      drafts,
    };

    return res.status(200).json({
      success: true,
      message: "Get All Dashboard Data Successfully",
      dashboardData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Get Dashboard Data",
      error: error.message,
    });
  }
};

export const deleteCommentbyId = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Comment Delete Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete Comment",
      error: error.message,
    });
  }
};

export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    return res.status(200).json({
      success: true,
      message: "Comment approved Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to approve Comment",
      error: error.message,
    });
  }
};
