import Post from '../models/post.js'
import User from '../models/user.js'

/* CREATE */
export const createPost = async (req,res) => {
    try{
        const { userId, description, picturePath } = req.body
        const user = await User.findById(userId)
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })

        await newPost.save()

        const post = await Post.find()
        res.status(201).json(post)
    }
    catch(err){
        res.status(409).json({ message: err.message})
    }
}

/* READ */
export const getFeedPosts = async (req,res) => {
    try{
        const posts = await Post.find()

        const formattedPosts = await Promise.all(
            posts.map(async (post) => {
                const updateComments = await Promise.all(
                    post.comments.map(async (comment) => {
                        const {firstName, lastName, picturePath} =  await User.findById(comment.userId).select({firstName: 1,lastName: 1, picturePath: 1})
                        return {firstName, lastName, picturePath, content: comment.content}
                    })
                )

                const {
                    _id,
                    userId,
                    firstName,
                    lastName,
                    location,
                    description,
                    picturePath,
                    userPicturePath,
                    likes,
                } = post
                
                return {
                    _id,
                    userId,
                    firstName,
                    lastName,
                    location,
                    description,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments: updateComments
                }
            })
        )
        
        res.status(201).json(formattedPosts)
    }
    catch(err){
        res.status(404).json({ message: err.message})
    }
}

export const getUserPosts = async (req,res) => {
    try{
        const { userId } = req.params
        const posts = await Post.find({userId})

        const formattedPosts = await Promise.all(
            posts.map(async (post) => {
                const comments = await Promise.all(
                    post.comments.map(async (comment) => {
                        const {firstName, lastName, picturePath} =  await User.findById(comment.userId).select({firstName: 1,lastName: 1, picturePath: 1})
                        return {firstName, lastName, picturePath, content: comment.content}
                    })
                )

                const {
                    _id,
                    userId,
                    firstName,
                    lastName,
                    location,
                    description,
                    picturePath,
                    userPicturePath,
                    likes,
                } = post
                
                return {
                    _id,
                    userId,
                    firstName,
                    lastName,
                    location,
                    description,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments
                }
            })
        )

        res.status(201).json(formattedPosts)
    }
    catch(err){
        res.status(404).json({ message: err.message})
    }
}

/* UPDATE */
export const likePost = async (req,res) => {
    try{
        const { id } = req.params
        const { userId } = req.body
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)

        if(isLiked){
            post.likes.delete(userId)
        }else{
            post.likes.set(userId, true)
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes},
            { new: true }
        )

        res.status(200).json(updatePost)
    }
    catch(err){
        res.status(404).json({ message: err.message})
    }
}

/* ADD COMMENT*/
export const commentPost = async (req,res) => {
    try{
        const { id } = req.params
        const { userId, commentContent} = req.body

        const updatePost = await Post.findByIdAndUpdate(
            id,
            { $push: {"comments": {userId, content: commentContent}}},
            {safe: true, upsert: true, new: true},
        )

        const updateComments = await Promise.all(
            updatePost.comments.map(async (comment) => {
                const {firstName, lastName, picturePath} =  await User.findById(comment.userId).select({firstName: 1,lastName: 1, picturePath: 1})
                return {firstName, lastName, picturePath, content: comment.content}
            })
        )
                
        const {comments, ...formattedPost} = updatePost.toObject()
        res.status(200).json({...formattedPost, comments: updateComments})

    }
    catch(err){
        res.status(404).json({ message: err.message})
    }
}