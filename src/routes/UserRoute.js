import React, { useContext, useEffect } from 'react';
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
import { ThemeContext } from '../context/Theme.context';
import Chat from '../user/container/Chat/Chat';
import Login from '../user/container/Login/Login';
import { useDispatch } from 'react-redux';
import { authChecked } from '../redux/slice/auth.slice';




function UserRoute(props) {
    const theme = useContext(ThemeContext);
    console.log(theme);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(authChecked())
    },[])
    return (


        <div>
            <div className={theme.theme} >

                <Header />
      
                <Routes>
                    <Route exact path="/" element={<Home />} />


                    <Route exact path="/shop" element={<Shop />} />
                    <Route exact path="/shop/:id" element={<ShopDetail />} />
                    <Route exact path='/shop-detail' element={<ShopDetail />} />
                    <Route exact path="/cart" element={<Cart />} />
                    <Route exact path="/chat" element={<Chat />} />
                    <Route element={<PrivateRoute />}>
                        <Route exact path="/checkout" element={<CheckOut />} />
                    </Route>
                    <Route exact path="/testimonial" element={<Testimonial />} />
                    <Route exact path="/error" element={<Error />} />
                    <Route exact path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Footer />
            



            </div>
        </div>
    );
}

export default UserRoute;