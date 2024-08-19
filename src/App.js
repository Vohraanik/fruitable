import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from './redux/Store';
import { ThemeProvider } from "./context/Theme.context";
import { ContactProvider } from "./context/contactContext";
import { SnackbarProvider } from "notistack";
import Alert from "./user/component/Alert/Alert";


function App() {
  const { store, persistor } = configureStore();
  return (
    <>
    <SnackbarProvider>
    <ContactProvider> 
    <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <Alert/>
            <Routes>
              <Route exact path="/*" element={<UserRoute />} />
              <Route element={<PrivateRoute />}>
                <Route exact path="/admin/*" element={<AdminRoute />} />
              </Route>
            </Routes>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ContactProvider>
    </SnackbarProvider>
  
     
    </>
  );
}

export default App;
