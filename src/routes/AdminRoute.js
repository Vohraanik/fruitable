import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Fruits from '../admin/component/Fruits/Fruits';
import Layout from '../admin/component/Layout/Layout';
import Vegetables from '../admin/component/Vegetables/Vegetables';
import Category from '../admin/component/Category/Category';


function AdminRoute(props) {
    return (
        <div>
            <Layout>
                <Routes >
                    <Route exact path="/fruits" element={<Fruits />} />
                    <Route exact path = "/vegetables" element = {<Vegetables />} />
                    <Route exact path='/category' element={<Category />} />
                </Routes>
            </Layout>
   


        </div>
    );
}

export default AdminRoute;