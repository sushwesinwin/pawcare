const express = require('express')
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/authMiddleware')

router.get('/', postController.getAllPosts)
router.post('/create', auth, postController.createPost) // auth 
router.get('/get/:id', postController.getPostById)
router.put('/update/:id', auth, postController.updatePost)
router.delete('/delete/:id', auth, postController.deletePost)

module.exports = router
