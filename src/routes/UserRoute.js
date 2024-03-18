import React from 'react';
import Header from '../user/component/Header/Header'
import Home from '../user/container/Home/Home';
import Shop from '../user/container/Shop/Shop';
import ShopDetail from '../user/container/Shop-Detail/ShopDetail';
import Cart from '../user/container/Page/Cart/Cart';
import CheckOut from '../user/container/Page/CheckOut/CheckOut';
import Error from '../user/container/Page/404/Error';
import Contact from '../user/container/Contact/Contact';
import Testimonial from '../user/container/Page/Testimonial/Testimonail';
import { Route, Routes } from "react-router-dom";
import Footer from '../user/component/Footer/Footer';
import PrivateRoute from './PrivateRoute';

function UserRoute(props) {
    return (
        <div>
            <>
                <Header />
                <Routes>
                    <Route exect path="/" element={<Home />} />
                  
                    <Route exect path="/shop" element={<Shop />} />
                    <Route exect path="/shop/:id" element={<ShopDetail />} />
                    <Route exect path='/shop-detail' element={<ShopDetail />} />
                    <Route exect path="/cart" element={<Cart />} />
                    <Route element={<PrivateRoute />}>
                    <Route exect path="/checkout" element={<CheckOut />} />
                    </Route>
                    <Route exect path="/testimonial" element={<Testimonial />} />
                    <Route exect path="/error" element={<Error />} />
                    <Route exect path="/contact" element={<Contact />} />
                </Routes>
                <Footer />
            </>

        </div>
    );
}

export default UserRoute;