const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const { validateName } = require('../utils/helperFunction');

exports.createPost = async (req, res) => {
    try {
        const { title, content, userId, categoryId, published } = req.body
        console.log(title, content, userId, categoryId, published)
        // No need val!
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                userId,
                categoryId,
                published: published || false,
                publishedAt: published ? new Date() : null
            }

        })
        res.status(201).json({ message: 'Post created successfully', post: newPost })
    } catch (err) {
        res.status(500).json({ error: 'Failed to create post', detail: err.message })
    }
}

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: true,
                category: true,
            }
        })
        res.status(200).json({ posts })
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts', detail: error.message })
    }
}

// Get a post by ID
exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                user: true,
                category: true
            }
        })
        
        if (!post) return res.status(404).json({ error: 'Post not found' })

        res.status(200).json({ post })
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch post', detail: err.message })
    }
}

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, categoryId, published } = req.body;

        const updatePost = await prisma.post.update({
            where: { id },
            data: {
                title,
                content,
                categoryId,
                published,
                publishedAt: published ? new Date() : null
            }
        })
        res.status(200).json(updatePost)
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post', detail: error.message })
    }
}

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        
        await prisma.post.delete({
            where: { id },
        })
        res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post', detail: error.message })
    }
}