import { useState,useEffect } from "react";

const base_url = process.env.REACT_APP_BASE_URL

export const useGetUser = (token, userId) => {
    const [user, setUser] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const getUser = async () => {
        try{
            setIsLoading(true)
            const response = await fetch(`${base_url}/users/${userId}`,{
                method: 'GET',
                headers: { Authorization: `Bearer ${token}`}
            })
            const data = await response.json()
            setIsLoading(false)
            setUser(data)
        }
        catch(err){
            setUser(null)
            setIsLoading(false)
            setIsError(true)
        }
        
    }

    useEffect(() => {
        getUser()
    },[])

    return { user, isLoading, isError}

}