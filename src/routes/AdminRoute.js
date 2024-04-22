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
import  persistor  from '../redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import Organic from '../admin/component/Organic/Organic';
import Products from '../admin/component/Products/Products';
import Coupons from '../admin/component/Coupons/Coupons';


function AdminRoute(props) {

    return (
        <div>
            
            <Layout>
                <Routes >
                    <Route element={<PrivateRoute />}>
                    <Route exact path="/fruits" element={<Fruits />} />
                    <Route exact path = "/vegetables" element = {<Vegetables />} />
                    <Route exact path='/category' element={<Category />} />
                    <Route exact path='/facilities' element={<Facilities />} />
                    <Route exact path='/organic' element={<Organic />} />
                    <Route exact path='/products' element={<Products />} />
                    <Route exact path='/coupons' element={<Coupons/>} />
                    </Route>
                </Routes>
            </Layout>
         
 
       
   

    
           


        </div>
    );
}

export default AdminRoute;