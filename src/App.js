import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import{ configureStore }from './redux/Store';

function App() {
  const { store, persistor } = configureStore();
  return (
    <>

<Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route exact path="/*" element={<UserRoute />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/admin/*" element={<AdminRoute />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
    </>
  );
}

export default App;
