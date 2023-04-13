import { ChatBubbleOutline, ChatBubbleOutlineOutlined, CommentSharp, FavoriteBorderOutlined, FavoriteOutlined, ShareOutlined } from "@mui/icons-material"
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material"
import FlexBetween from "components/FlexBetween"
import Friend from "components/Friend"
import WidgetWrapper from "components/WidgetWrapper"
import { useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { setPostLikes } from "state"
import UserImage from "components/UserImage"
import UpdateCommentWidget from "./UpdateCommentWidget"

const base_url = process.env.REACT_APP_BASE_URL

function CommentComponent({name, picturePath, content}){
  const theme = useTheme()

  return (
    <Box display="flex" justifyContent="start" alignItems="center" p="0.5rem 0">
      <Box display="flex" justifyContent="start" alignItems="center" gap="1rem">
        <UserImage image={picturePath} size="40px"/>
        <Typography color={theme.palette.neutral.amin} varient="h5" fontWeight="500">{name}</Typography>
      </Box>
      <Typography sx={{ color: theme.palette.neutral.main, m: "0.5rem 0", pl: "1rem"}}>
       {content}
      </Typography>
    </Box>
  )
}

function PostWidget({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) {
  const [isComments,setIsComments] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const loggedInUserId = useSelector((state) => state.user._id)
  const isLiked = Boolean(likes[loggedInUserId])
  const likeCount = Object.keys(likes).length

  const { palette } = useTheme()
  const main = palette.neutral.main
  const primary = palette.primary.main

  const patchLike = async () => {
    const response = await fetch(`${base_url}/posts/${postId}/like`,{
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: loggedInUserId})
    })
    const updatePost = await response.json()
    console.log(updatePost)
    dispatch(setPostLikes({ post: updatePost}))

  }

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem"}}>
        {description}
      </Typography>
      { picturePath && (
        <img 
          width="100%"
          heigh="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem"}}
          src={`${base_url}/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              { isLiked ? (
                <FavoriteOutlined sx={{ color: primary}}/>
              ): (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>

        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      { isComments && (
        <Box mt="0.5rem">
          {comments.map((comment,i) => (
            <Box key={`${name}-${i}`}>
              <CommentComponent
                name={`${comment.firstName} ${comment.lastName}`}
                picturePath={comment.picturePath}
                content={comment.content}
              />
            </Box>
          ))}
          <UpdateCommentWidget postId={postId}/>
        </Box>
      )}

    </WidgetWrapper>
  )
}

export default PostWidget