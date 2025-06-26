import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/blogModel.js";
import Comment from "../models/commentModel.js";
import main from "../configs/gemini.js";

export const addBlog = async (req, res) => {
  try {
    const { title, description, category, subTitle, isPublished } = JSON.parse(
      req.body.blog
    );
    const imageFile = req.file;

    if (!title || !description || !category || !isPublished) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All Required Fields",
      });
    }

    const fileBuffer = fs.readFileSync(imageFile.path);
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: 1280 },
      ],
    });

    const image = optimizedImageUrl;
    await Blog.create({
      title,
      subTitle,
      description,
      category,
      image,
      isPublished,
    });

    return res.status(201).json({
      success: true,
      message: "Blog Added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Blog Added Failed",
      error: error.message,
    });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true });
    if (!blogs || blogs.lengrh === 0) {
      return res.status(404).json({
        success: false,
        message: "No Blog Found",
      });
    }

    return res.status(200).json({
      success: true,
      blogs,
      message: "Blogs Retrieved Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Retrieve Blogs",
      error: error.message,
    });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
      message: "Blog Retrieved Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Retrieve Blog",
      error: error.message,
    });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.body;
    await Blog.findByIdAndDelete(id);

    await Comment.deleteMany({ blog: id });

    return res.status(200).json({
      success: true,
      message: "Blog Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Delete Blog",
      error: error.message,
    });
  }
};

export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findById(id);

    blog.isPublished = !blog.isPublished;
    await blog.save();

    return res.status(200).json({
      success: true,
      message: `Blog is now ${blog.isPublished ? "Published" : "Unpublished"}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Toggle Publish Status",
      error: error.message,
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    return res.status(200).json({
      success: true,
      message: "Comment Added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Add Comment",
      error: error.message,
    });
  }
};
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      comments,
      message: "All Comments Retrieved Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to Retrieve Comments",
      error: error.message,
    });
  }
};

export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(
      prompt + "Generate a blog content for this topic"
    );
    return res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate Content",
      error: error.message,
    });
  }
};
