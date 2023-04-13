import { useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setFriends } from 'state'

const base_url = process.env.REACT_APP_BASE_URL

export const useGetFriends = (token, userId) => {
    const dispatch = useDispatch()
    const [isLoading, setIsloading] = useState(false)
    const [isError, setIsError] = useState(false)

    const getFriends = async () => {
        try{
            setIsloading(true)
            const response = await fetch(`${base_url}/users/${userId}/friends`,{
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            })
            const data = await response.json()
            setIsloading(false)
            dispatch(setFriends({friends: data}))
        }
        catch(err){
            setIsloading(false)
            setIsError(true)
        }
    }

    useEffect(() => {
        getFriends()
    },[])

    return { isLoading, isError}
}