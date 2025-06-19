const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
const { validateName } = require('../utils/helperFunction');

// Create a new category
exports.createCategory = async (req, res) => {

    try {
        const { name, description } = req.body;
        // console.log(name, description);

        const nameCheck = validateName(name, 3, 250);

        if (!nameCheck.isValid) {
            return res.status(400).json({ error: nameCheck.message });
        }

        try {
            const existingCategory = await prisma.category.findUnique({
                where: { name },
            })

            if (existingCategory) {
                return res.status(400).json({ error: 'Category already exists' })
            }
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create category', detail: error.message })
        }

        const newCategory = await prisma.category.create({
            data: {
                name,
                description,
            }
        })
        res.status(201).json({ message: 'Category created successfully', category: newCategory })
    } catch (err) {
        res.status(500).json({ error: 'Failed to create category', detail: err.message })
    }
}

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany()
        res.status(200).json({ categories })
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories', detail: err.message })
    }
}

// Get a category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                posts: true
            }
        })

        if (!category) return res.status(404).json({ error: 'Category not found' })

        res.status(200).json({ category })
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch category', detail: err.message })
    }
}

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name,
                description,
            }
        })

        res.status(200).json(updatedCategory)
    } catch (err) {
        res.status(500).json({ error: 'Failed to update category', detail: err.message })
    }
}

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.category.delete({
            where: { id },
        })
        res.status(200).json({ message: 'Category deleted successfully' })
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete category', detail: err.message })
    }
}