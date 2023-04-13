import {useState,useEffect} from 'react'

const base_url = process.env.REACT_APP_BASE_URL

export const useIsAuth = (token) => {
    const [isAuth, setIsAuth] = useState(Boolean(token)) // if token exist, default true, and then check token is Correct or Fail
    const [isLoading,setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    const handleIsAuth = async () => {
      setIsLoading(true)  
      try{
        const response = await fetch(`${base_url}/auth/checkLogin`,{
          method: 'GET',
          headers: { Authorization: `Bearer ${token}`}
        })
        const {ok} = await response.json()
        setIsLoading(false)
        if(ok)  setIsAuth(true)
        else  throw new Error()
      }
      catch(err){
        setIsLoading(false)
        setIsAuth(false)
        setIsError(true)
      }
    }
  
    useEffect(() => {
      if(!token) {
        setIsAuth(false)
        setIsError(true)
        return
      }
      handleIsAuth()
    },[token])

    return {
        isAuth,
        isLoading,
        isError
    }
}
