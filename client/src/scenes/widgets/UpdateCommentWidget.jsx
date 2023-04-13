import {useState} from 'react'
import { InputBase, useTheme, Button } from '@mui/material'
import FlexBetween from 'components/FlexBetween'
import { useSelector } from 'react-redux'
import { setComments } from "state"
import { useDispatch } from 'react-redux'

const base_url = process.env.REACT_APP_BASE_URL

function UpdateCommentWidget({postId}) {
    const { _id } = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const [comment,setComment] = useState('')
    const { palette } = useTheme()
    const dispatch = useDispatch()

    const handleComment = async () => {
        const response = await fetch(`${base_url}/posts/${postId}/comment`,{
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userId: _id, commentContent: comment})
        })
        const updatePost = await response.json()
        console.log(updatePost)
        dispatch(setComments({ post: updatePost}))
        setComment('')
    }

    return (
        <FlexBetween>
            <InputBase
                placeholder="Say something ..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                sx={{
                    flexGrow: 1
                }}
            />
            <Button
                disabled={!comment}
                onClick={handleComment}
                sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRaius: '3rem',
                    "&:hover": {
                        backgroundColor: palette.primary.dark,
                    }
                }}
            >
                Post
            </Button>
        </FlexBetween>
        
    )
}

export default UpdateCommentWidget