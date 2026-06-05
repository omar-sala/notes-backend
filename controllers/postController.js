const Post = require('../models/Post')

// CREATE POST
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required',
      })
    }

    const post = await Post.create({
      title,
      content,
      author: req.user.userId, // from JWT
    })

    res.status(201).json({
      success: true,
      data: post,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// GET ALL POSTS
const getAllPosts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const search = req.query.search || ''

    const skip = (page - 1) * limit

    const filter = {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ],
    }

    const totalPosts = await Post.countDocuments(filter)

    const posts = await Post.find(filter)
      .populate('author', 'name role')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      search,
      data: posts,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get My Posts
const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user.userId,
    })
      .populate('author', 'name role')
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Delete Post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    // check ownership or admin
    if (
      post.author.toString() !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not allowed',
      })
    }

    await post.deleteOne()

    res.status(200).json({
      success: true,
      message: 'Post deleted',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Update Post
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      })
    }

    if (
      post.author.toString() !== req.user.userId &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not allowed',
      })
    }

    const { title, content } = req.body

    if (title) post.title = title
    if (content) post.content = content

    await post.save()

    res.status(200).json({
      success: true,
      data: post,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
  updatePost,
}
