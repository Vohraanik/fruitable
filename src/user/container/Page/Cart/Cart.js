import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrimentQty, handelTotal, incrementQty, removeCart } from '../../../../redux/slice/cart.slice';
import { getCoupons } from '../../../../redux/slice/coupons.slice';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Alert } from '@mui/material';
import Button from '../../../component/UI/Button/Button';



function Cart(props) {
  const [copunsValid, setCopunsValid] = useState('');
  const [Dis, setDis] = useState(0);
  console.log(Dis);

  const products = useSelector((state) => state.products);
  console.log(products);

  useEffect(() => {
    dispatch(getCoupons())
  }, [])

  const coupons = useSelector(state => state.coupons)
  console.log(coupons);

  const cart = useSelector(state => state.cart)

  const productData = cart.cart.map((v) => {
    const finalData = products.products.find((v1) => v1.id === v.pid);

    return { ...finalData, qty: v.qty }
  })

  const dispatch = useDispatch();
  const handleMinus = (id) => {
    dispatch(decrimentQty(id))
  }

  const handlePlus = (id) => {
    dispatch(incrementQty(id))
  }

  const handleRemove = (id) => {
    dispatch(removeCart(id))
  }


  const amount = productData.map((v) => {
    return v.price * v.qty
  })


  const handleCopuns = (data) => {
    let flag = 0;

    coupons.coupons.forEach((v) => {
      

     if (v.coupons === data.coupons) {
        setDis(v.percantage)

        const createDate = new Date();
        const expiryDate = new Date(v.expiry);

        if (createDate <= expiryDate) {
          flag = 1;
        } else {
          flag = 2;
        }
      }
    });

    if( cart.cart.length === 0){
      setCopunsValid("empty cart");
    } else if (flag === 1) {
      setCopunsValid("valid");
 
    } else if (flag === 0) {
      setCopunsValid("invalid");

    } else if (flag === 2) {
      setCopunsValid("expired Coupons");
    } 
  };


  const couponsSchema = object({
    coupons: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      coupons: '',
    },
    validationSchema: couponsSchema,
    onSubmit: values => {
      handleCopuns(values);

    },
  });


  const subtotal = amount.reduce((a, b) => a + b, 0);
 
  
  const totaldiscount = subtotal * (Dis / 100);


  const total = subtotal - totaldiscount;


  const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik;


  return (
    <div>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Cart</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Pages</a></li>
          <li className="breadcrumb-item active text-white">Cart</li>
        </ol>
      </div>
      {/* Single Page Header End */}
      {/* Cart Page Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Products</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {
                  productData.map((p) => (
                    <tr>
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img src={p.imgSrc} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                        </div>
                      </th>
                      <td>
                        <p className="mb-0 mt-4">{p.name}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4" >{p.price} $</p>
                      </td>
                      <td>
                        <div className="input-group quantity mt-4" style={{ width: 100 }}>
                          <div className="input-group-btn">
                            <button className="btn btn-sm btn-minus rounded-circle bg-light border"
                              onClick={() => { handleMinus(p.id) }}
                            >
                              <i className="fa fa-minus" />
                            </button>
                          </div>
                          <span type="text" className="form-control form-control-sm text-center border-0" >
                            {p.qty}
                          </span>
                          <div className="input-group-btn">
                            <button
                              onClick={() => { handlePlus(p.id) }}
                              className="btn btn-sm btn-plus rounded-circle bg-light border"
                            >
                              <i className="fa fa-plus" />
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{p.price * p.qty} $</p>
                      </td>
                      <td>
                        <button
                          className="btn btn-md rounded-circle bg-light border mt-4"
                          onClick={() => { handleRemove(p.id) }}
                        >
                          <i className="fa fa-times text-danger" />
                        </button>
                      </td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <input
                type="text"
                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                placeholder="Coupon Code"
                value={values.coupons}
                onChange={handleChange}
                onBlur={handleBlur}
                name="coupons"
              />
              {(values.coupons.length > 0 && copunsValid) && <p className={copunsValid === "valid" ? "text-success" : "text-danger"}>{copunsValid}</p>}
              {errors.coupons && touched.coupons && <p className="text-danger">{errors.coupons}</p>}
              <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="submit">Apply Coupon</button>
            </div>
          </form>


          <div className="row g-4 justify-content-end">
            <div className="col-8" />
            <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
              <div className="bg-light rounded">
                <div className="p-4">
                  <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="mb-0 me-4">Subtotal:</h5>
                    <p className="mb-0">{subtotal}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5 className="mb-0 me-4">Discount {Dis} %</h5>
                    <div className>
                      <p className="mb-0">{totaldiscount}</p>
                    </div>
                  </div>
                  <p className="mb-0 text-end"></p>
                </div>
                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                  <h5 className="mb-0 ps-4 me-4">Total</h5>
                  <p className="mb-0 pe-4">{total}</p>

                </div>
                <Button  btnDisable = {true}
                onClick={()=>console.log("ok")}
                >Proceed Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Cart;