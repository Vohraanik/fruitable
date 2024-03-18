import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";



function App() {
  return (
    <>
      <Routes>
        <Route exect path="/*" element={<UserRoute />} />
        <Route element={<PrivateRoute/>}>
          <Route exect path="/admin/*" element={<AdminRoute />} />
        </Route>


      </Routes>
    </>

  );
}

export default App;
