import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Product from '../admin/component/Product/Product';

function AdminRoute(props) {
    return (
        <div>
            <Routes>
                <Route exect path="/product" element={<Product />} />
            </Routes>
            
        </div>
    );
}

export default AdminRoute;