import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Fruits from '../admin/component/Fruits/Fruits';
import Layout from '../admin/component/Layout/Layout';
import Vegetables from '../admin/component/Vegetables/Vegetables';
import Category from '../admin/component/Category/Category';
import PrivateRoute from './PrivateRoute';
import Facilities from '../admin/component/Facilities/Facilities';
import { configureStore } from '../redux/Store';
import { Provider } from 'react-redux';
import persistor from '../redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import Organic from '../admin/component/Organic/Organic';
import Products from '../admin/component/Products/Products';
import Coupons from '../admin/component/Coupons/Coupons';
import { FruitsProvider} from '../context/Friuts.context';
import SubCategory from '../admin/component/SubCategory/SubCategory';
import Varients from '../admin/component/Varients/Varients';





function AdminRoute(props) {
    return (
        <div >
            <FruitsProvider>
                <Layout>
                    <Routes >
                        <Route element={<PrivateRoute />}>
                            <Route exact path="/fruits" element={<Fruits />} />
                            <Route exact path="/vegetables" element={<Vegetables />} />
                            <Route exact path="/organic" element={<Organic />} />
                            <Route exact path="/products" element={<Products />} />
                            <Route exact path="/varients" element={<Varients />} />
                            <Route exact path="/coupons" element={<Coupons />} />
                            <Route exact path="/category" element={<Category />} />
                            <Route exact path="/subCategory" element={<SubCategory/>} />



                        </Route>
                    </Routes>
                </Layout>
            </FruitsProvider>
        </div>
    );
}

export default AdminRoute;