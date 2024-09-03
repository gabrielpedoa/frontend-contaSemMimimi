import { Route, Routes } from "react-router-dom";
import { GlobalStyle, MainContainer } from "./styles/GlobalStyles";
import { routes } from "./routes";
import React from "react";

function App() {
  return (
    <div>
      <GlobalStyle />
      <MainContainer>
        <div className="content">
          <Routes>
            {React.Children.toArray(
              routes.map((route) => (
                <>
                  {route.requireAuth ? (
                    <Route path={route.path} />
                  ) : (
                    <Route path={route.path} element={route.element} />
                  )}
                </>
              ))
            )}
          </Routes>
        </div>
      </MainContainer>
    </div>
  );
}

export default App;
