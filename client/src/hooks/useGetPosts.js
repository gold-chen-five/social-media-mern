import {useState, useEffect} from 'react'
import { setPosts } from 'state'
import { useDispatch } from 'react-redux'

const base_url = process.env.REACT_APP_BASE_URL

export const useGetPosts = (token, userId, isProfile) => {
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const getPosts = async () => {
        try{
            setIsLoading(true)
            const response = await fetch(`${base_url}/posts`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}`}
            })
            const data = await response.json()
            setIsLoading(false)
            dispatch(setPosts({ posts: data}))
        }
        catch(err){
            setIsLoading(false)
            setIsError(true)
        }
        
      }
    
      const getUserPosts = async () => {
        try{
            setIsLoading(true)
            const response = await fetch(`${base_url}/posts/${userId}/posts`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${token}`}
            })
            const data = await response.json()
            setIsLoading(false)
            dispatch(setPosts({ posts: data}))
        }
        catch(err){
            setIsLoading(false)
            setIsError(true)
        }
        
      }
    
      useEffect(() => {
        if(!token){
            setIsError(true)
            return
        }
        if(isProfile){
            getUserPosts()
        }else{
            getPosts()
        }
      },[])

      return { isLoading, isError }
}