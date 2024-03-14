import React from "react";
import { Route, Routes } from "react-router-dom";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";



function App() {
  return (
    <>
    <Routes>
      <Route exect path="/*" element={<UserRoute />} />
      <Route exect path="/admin/*" element={<AdminRoute/>}/>
    </Routes>
    </>

  );
}

export default App;
