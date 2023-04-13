import { BrowserRouter, Navigate, Routes, Route,HashRouter  } from "react-router-dom";
import HomePage from "scenes/homepage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)),[mode])
  const isAuth = Boolean(useSelector((state) => state.token))

  return (
    <div className="App">
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path="/" element={isAuth ? <Navigate to='/home'/> : <LoginPage/>}/>
            <Route path="/home" element={isAuth ? <HomePage/> : <Navigate to='/'/>}/>
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to='/'/>}/>
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;
