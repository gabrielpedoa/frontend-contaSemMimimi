import { ThemeProvider } from "@mui/material";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useVerifyAuth } from "./hooks/useVerifyAuth";
import SideBar from "./layout/SideBar";
import Auth from "./pages/auth/Auth";
import { routes } from "./routes";
import { GlobalStyle, MainContainer, THEME } from "./styles/GlobalStyles";

function App() {
  const { authenticated } = useVerifyAuth();
  const showSideBar = authenticated;
  return (
    <div>
      <ThemeProvider theme={THEME}>
        <GlobalStyle />
        {showSideBar && <SideBar />}
        <MainContainer>
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  authenticated ? <Navigate to={"/dashboard"} /> : <Auth />
                }
              />
              {React.Children.toArray(
                routes.map((item) => (
                  <Route
                    key={item.path}
                    path={item.path}
                    element={
                      item.requireAuth && !authenticated ? (
                        <Navigate to="/login" />
                      ) : (
                        item.element
                      )
                    }
                  />
                ))
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </MainContainer>
      </ThemeProvider>
    </div>
  );
}

export default App;
