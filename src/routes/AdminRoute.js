import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Fruits from '../admin/component/Fruits/Fruits';
import Layout from '../admin/component/Layout/Layout';
import Vegetables from '../admin/component/Vegetables/Vegetables';
import Category from '../admin/component/Category/Category';
import PrivateRoute from './PrivateRoute';
import Facilities from '../admin/component/Facilities/Facilities';
import { configureStore } from '../redux/Store';
import { Provider } from 'react-redux';


function AdminRoute(props) {
    const store = configureStore();
    return (
        <div>
            <Provider store={store}>
            <Layout>
                <Routes >
                    <Route element={<PrivateRoute />}>
                    <Route exact path="/fruits" element={<Fruits />} />
                    <Route exact path = "/vegetables" element = {<Vegetables />} />
                    <Route exact path='/category' element={<Category />} />
                    <Route exact path='/facilities' element={<Facilities />} />
                    </Route>
                </Routes>
            </Layout>
   

            </Provider>
           


        </div>
    );
}

export default AdminRoute;