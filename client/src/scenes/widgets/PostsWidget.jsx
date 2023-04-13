import { useSelector } from "react-redux"
import PostWidget from "./PostWidget"
import { useGetPosts } from "hooks/useGetPosts"

function PostsWidget({ userId, isProfile = false}) {
  const posts = useSelector((state) => state.posts)
  const token = useSelector((state) => state.token)
  useGetPosts(token, userId, isProfile)

  return (
    <>
        {posts.map(({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments
        }) => (
            <PostWidget 
                key = {_id}
                postId = {_id}
                postUserId = {userId}
                name = {`${firstName} ${lastName}`}
                description = {description}
                location = {location}
                picturePath = {picturePath}
                userPicturePath = {userPicturePath}
                likes = {likes}
                comments = {comments}
            />
        )).reverse()}
    </>
  )
}

export default PostsWidget