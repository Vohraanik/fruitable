import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Fruits from '../admin/component/Fruits/Fruits';
import Layout from '../admin/component/Layout/Layout';
import Vegetables from '../admin/component/Vegetables/Vegetables';
import Category from '../admin/component/Category/Category';
import PrivateRoute from './PrivateRoute';


function AdminRoute(props) {
    return (
        <div>
            <Layout>
                <Routes >
                    <Route element={<PrivateRoute />}>
                    <Route exact path="/fruits" element={<Fruits />} />
                    <Route exact path = "/vegetables" element = {<Vegetables />} />
                    <Route exact path='/category' element={<Category />} />
                    </Route>
                </Routes>
            </Layout>
   


        </div>
    );
}

export default AdminRoute;