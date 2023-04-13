import { BrowserRouter, Navigate, Routes, Route,HashRouter  } from "react-router-dom";
import HomePage from "scenes/homepage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

const base_url = process.env.REACT_APP_BASE_URL

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode])
  const token = useSelector((state) => state.token)
  const [isAuth, setIsAuth] = useState(Boolean(token))

  const handleIsAuth = async () => {
    if(!token) return setIsAuth(false)
    try{
      const response = await fetch(`${base_url}/auth/checkLogin`,{
        method: 'GET',
        headers: { Authorization: `Bearer ${token}`}
      })
      const {ok} = await response.json()
      if(ok)  setIsAuth(true)
      else  throw new Error()
    }
    catch(err){
      setIsAuth(false)
    }
  }

  useEffect(() => {
    handleIsAuth()
  },[token])

  return (
    <div className="App">
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path="/" element={isAuth ? <Navigate to='/home'/> : <LoginPage/>}/>
            <Route path="/home" element={token && isAuth ? <HomePage/> : <Navigate to='/'/>}/>
            <Route path="/profile/:userId" element={token && isAuth ? <ProfilePage/> : <Navigate to='/'/>}/>
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;
