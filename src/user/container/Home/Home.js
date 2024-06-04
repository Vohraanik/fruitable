import React, { useContext, useEffect } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useDispatch, useSelector } from 'react-redux';
import { Face } from '@mui/icons-material';
import { getFacilities } from '../../../redux/action/facilities.action';
import { ThemeContext } from '../../../context/Theme.context';

function Home(props) {

  const dispatch = useDispatch();


  const facilities = useSelector((state) => state.facilities.facilities);
  console.log(facilities);

  const theme = useContext(ThemeContext);



  useEffect(() => {
    dispatch(getFacilities());
  },[])

  let owl = {
    autoplay: true,
    smartSpeed: 1500,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<div class="owl-prev"><i class="bi bi-arrow-left"></i></div>',
      '<div class="owl-prev"><i class="bi bi-arrow-right"></i></div>'
   ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  }

  let tes = {
    autoplay: true,
    smartSpeed: 2000,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<div class="owl-prev"><i class="bi bi-arrow-left"></i></div>',
      '<div class="owl-prev"><i class="bi bi-arrow-right"></i></div>'
    ],
  
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 1
      },
      992: {
        items: 2
      },
      1200: {
        items: 2
      }
    }
  }
  

  return (
    <div>
      {/* Hero Start */}
      <div className="container-fluid py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-md-12 col-lg-7">
              <h4 className="mb-3 text-secondary">100% Organic Foods</h4>
              <h1 className="mb-5 display-3 text-primary">Organic Veggies &amp; Fruits Foods</h1>
              <div className="position-relative mx-auto">
                <input className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill" type="number" placeholder="Search" />
                <button type="submit" className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100" style={{ top: 0, right: '25%' }}>Submit Now</button>
              </div>
            </div>
            <div className="col-md-12 col-lg-5">
              <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active rounded">
                    <img src="img/hero-img-1.png" className="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
                    <a href="#" className="btn px-4 py-2 text-white rounded">Fruites</a>
                  </div>
                  <div className="carousel-item rounded">
                    <img src="img/hero-img-2.jpg" className="img-fluid w-100 h-100 rounded" alt="Second slide" />
                    <a href="#" className="btn px-4 py-2 text-white rounded">Vesitables</a>
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true" />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero End */}
      {/* Featurs Section Start */}
      <div className="container-fluid featurs py-5">
        <div className="container py-5">
          <div className="row g-4">
          {
            facilities.map((v)=>(
              <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <i className="fas fa-car-side fa-3x text-white" />
                </div>
                <div className="featurs-content text-center">
                  <h5>{v.name}</h5>
                  <p className="mb-0">{v.description}</p>
                </div>
              </div>
            </div>
            ))
          }
         
          </div>
        </div>
      </div>
      {/* Featurs Section End */}
      {/* Fruits Shop Start*/}
      <div className="container-fluid fruite py-5 ">
        <div className={`container py-5 ${theme.theme}`}>
          <div className="tab-class text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start">
                <h1 className={`${theme.theme === 'dark' ? 'text-white': ''}`}>Our Organic Products</h1>
              </div>
              <div className="col-lg-8 text-end">
                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                  <li className="nav-item">
                    <a className="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                      <span className="text-dark" style={{ width: 130 }}>All Products</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                      <span className="text-dark" style={{ width: 130 }}>Vegetables</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                      <span className="text-dark" style={{ width: 130 }}>Fruits</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-4">
                      <span className="text-dark" style={{ width: 130 }}>Bread</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="d-flex m-2 py-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-5">
                      <span className="text-dark" style={{ width: 130 }}>Meat</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Grapes</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p className={`${theme.theme==='dark'?'text-white fs-5 fw-bold mb-0' : 'text-dark fs-5 fw-bold mb-0'}`}>$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Grapes</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className={`${theme.theme==='dark'?'text-white fs-5 fw-bold mb-0' : 'text-dark fs-5 fw-bold mb-0'}`}>$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-2.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Raspberries</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className={`${theme.theme==='dark'?'text-white fs-5 fw-bold mb-0' : 'text-dark fs-5 fw-bold mb-0'}`}>$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-4.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Apricots</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className={`${theme.theme==='dark'?'text-white fs-5 fw-bold mb-0' : 'text-dark fs-5 fw-bold mb-0'}`}>$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-3.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Banana</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className={`${theme.theme==='dark'?'text-white fs-5 fw-bold mb-0' : 'text-dark fs-5 fw-bold mb-0'}`}>$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-1.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Oranges</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className={`${theme.theme==='dark'?'text-white fs-5 fw-bold mb-0' : 'text-dark fs-5 fw-bold mb-0'}`}>$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-2.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Raspberries</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className={`${theme.theme==='dark'?'text-white fs-5 fw-bold mb-0' : 'text-dark fs-5 fw-bold mb-0'}`}>$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Grapes</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className={`${theme.theme==='dark'?'text-white fs-5 fw-bold mb-0' : 'text-dark fs-5 fw-bold mb-0'}`}>$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-2" className="tab-pane fade show p-0">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Grapes</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className={`${theme.theme==='dark'?'text-white fs-5 fw-bold mb-0' : 'text-dark fs-5 fw-bold mb-0'}`}>$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-2.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Raspberries</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-3" className="tab-pane fade show p-0">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-1.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Oranges</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className={`${theme.theme==='dark'?'text-white fs-5 fw-bold mb-0' : 'text-dark fs-5 fw-bold mb-0'}`}>$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Apple</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-4" className="tab-pane fade show p-0">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Grapes</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                            <p className={`${theme.theme==='dark'?'text-white fs-5 fw-bold mb-0' : 'text-dark fs-5 fw-bold mb-0'}`}>$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-4.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Apricots</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tab-5" className="tab-pane fade show p-0">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-3.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Banana</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-2.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Raspberries</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 col-xl-3">
                        <div className="rounded position-relative fruite-item">
                          <div className="fruite-img">
                            <img src="img/fruite-item-1.jpg" className="img-fluid w-100 rounded-top" alt />
                          </div>
                          <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>Oranges</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                            <div className="d-flex justify-content-between flex-lg-wrap">
                              <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fruits Shop End*/}
      {/* Featurs Start */}
      <div className="container-fluid service py-5">
        <div className="container py-5">
          <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-4">
              <a href="#">
                <div className="service-item bg-secondary rounded border border-secondary">
                  <img src="img/featur-1.jpg" className="img-fluid rounded-top w-100" alt />
                  <div className="px-4 rounded-bottom">
                    <div className="service-content bg-primary text-center p-4 rounded">
                      <h5 className="text-white">Fresh Apples</h5>
                      <h3 className="mb-0">20% OFF</h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="#">
                <div className="service-item bg-dark rounded border border-dark">
                  <img src="img/featur-2.jpg" className="img-fluid rounded-top w-100" alt />
                  <div className="px-4 rounded-bottom">
                    <div className="service-content bg-light text-center p-4 rounded">
                      <h5 className="text-primary">Tasty Fruits</h5>
                      <h3 className="mb-0">Free delivery</h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6 col-lg-4">
              <a href="#">
                <div className="service-item bg-primary rounded border border-primary">
                  <img src="img/featur-3.jpg" className="img-fluid rounded-top w-100" alt />
                  <div className="px-4 rounded-bottom">
                    <div className="service-content bg-secondary text-center p-4 rounded">
                      <h5 className="text-white">Exotic Vegitable</h5>
                      <h3 className="mb-0">Discount 30$</h3>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Featurs End */}
      {/* Vesitable Shop Start*/}
      <div className="container-fluid vesitable py-5">
        <div className="container py-5">
          <h1 className={`${theme.theme === 'dark' ? 'text-white' : '' }`}>Fresh Organic Vegetables</h1>
          <OwlCarousel {...owl} className="owl-carousel vegetable-carousel justify-content-center">
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
              </div>
              <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
              <div className="p-4 rounded-bottom">
                <h4>Parsely</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                </div>
              </div>
            </div>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img src="img/vegetable-item-1.jpg" className="img-fluid w-100 rounded-top" alt />
              </div>
              <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
              <div className="p-4 rounded-bottom">
                <h4>Parsely</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                </div>
              </div>
            </div>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img src="img/vegetable-item-3.png" className="img-fluid w-100 rounded-top bg-light" alt />
              </div>
              <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
              <div className="p-4 rounded-bottom">
                <h4>Banana</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className={`${theme.theme === 'dark' ? "text-dark fs-5 fw-bold mb-0" : 'text-white fs-5 fw-bold mb-0' }`}>$7.99 / kg</p>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                </div>
              </div>
            </div>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img src="img/vegetable-item-4.jpg" className="img-fluid w-100 rounded-top" alt />
              </div>
              <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
              <div className="p-4 rounded-bottom">
                <h4>Bell Papper</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className={`${theme.theme === 'dark' ? "text-dark fs-5 fw-bold mb-0" : 'text-white fs-5 fw-bold mb-0' }`}>$7.99 / kg</p>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                </div>
              </div>
            </div>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img src="img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
              </div>
              <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
              <div className="p-4 rounded-bottom">
                <h4>Potatoes</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                </div>
              </div>
            </div>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
              </div>
              <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
              <div className="p-4 rounded-bottom">
                <h4>Parsely</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                </div>
              </div>
            </div>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img src="img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top" alt />
              </div>
              <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
              <div className="p-4 rounded-bottom">
                <h4>Potatoes</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                </div>
              </div>
            </div>
            <div className="border border-primary rounded position-relative vesitable-item">
              <div className="vesitable-img">
                <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top" alt />
              </div>
              <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{ top: 10, right: 10 }}>Vegetable</div>
              <div className="p-4 rounded-bottom">
                <h4>Parsely</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                  <p className={`${theme.theme === 'dark' ? 'text-dark fs-5 fw-bold mb-0' : "text-light fs-5 fw-bold mb-0"}`}>$7.99 / kg</p>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
      {/* Vesitable Shop End */}
      {/* Banner Section Start*/}
      <div className="container-fluid banner bg-secondary my-5">
        <div className="container py-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="py-4">
                <h1 className="display-3 text-white">Fresh Exotic Fruits</h1>
                <p className="fw-normal display-3 text-dark mb-4">in Our Store</p>
                <p className="mb-4 text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.</p>
                <a href="#" className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5">BUY</a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <img src="img/baner-1.png" className="img-fluid w-100 rounded" alt />
                <div className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute" style={{ width: 140, height: 140, top: 0, left: 0 }}>
                  <h1 style={{ fontSize: 100 }}>1</h1>
                  <div className="d-flex flex-column">
                    <span className="h2 mb-0">50$</span>
                    <span className="h4 text-muted mb-0">kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner Section End */}
      {/* Bestsaler Product Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mx-auto mb-5" style={{ maxWidth: 700 }}>
            <h1 className={`${theme.theme === 'dark' ? 'display-4 text-white' : 'display-4'}`}>Bestseller Products</h1>
            <p className={`${theme.theme === 'dark' ? 'text-white' : ''}`}>Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-6 col-xl-4">
            <div className={`${theme.theme === 'dark' ? 'p-4 border rounded border-warning' : 'p-4 bg-light border-warning rounded'}`}> 

                <div className={`${theme.theme === 'dark' ? "row align-items-center " : 'row align- center bg-white'}`}>
                  <div className="col-6">
                    <img src="img/best-product-1.jpg" className="img-fluid rounded-circle w-100" alt />
                  </div>
                  <div className="col-6">
                    <a href="#" className="h5 text-center">Organic Tomato</a>
                    <div className="d-flex my-3">
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star" />
                    </div>
                    <h4 className="mb-3">3.12 $</h4>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4">
            <div className={`${theme.theme === 'dark' ? 'p-4 border rounded border-warning' : 'p-4 bg-light rounded'}`}> 
                <div className="row align-items-center">
                  <div className="col-6">
                    <img src="img/best-product-2.jpg" className="img-fluid rounded-circle w-100" alt />
                  </div>
                  <div className="col-6">
                    <a href="#" className="h5">Organic Tomato</a>
                    <div className="d-flex my-3">
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star" />
                    </div>
                    <h4 className="mb-3">3.12 $</h4>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4">
            <div className={`${theme.theme === 'dark' ? 'p-4 border rounded border-warning' : 'p-4 bg-light rounded'}`}> 

                <div className="row align-items-center">
                  <div className="col-6">
                    <img src="img/best-product-3.jpg" className="img-fluid rounded-circle w-100" alt />
                  </div>
                  <div className="col-6">
                    <a href="#" className="h5">Organic Tomato</a>
                    <div className="d-flex my-3">
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star" />
                    </div>
                    <h4 className="mb-3">3.12 $</h4>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4">
            <div className={`${theme.theme === 'dark' ? 'p-4 border rounded border-warning' : 'p-4 bg-light rounded'}`}> 
                <div className="row align-items-center">
                  <div className="col-6">
                    <img src="img/best-product-4.jpg" className="img-fluid rounded-circle w-100" alt />
                  </div>
                  <div className="col-6">
                    <a href="#" className="h5">Organic Tomato</a>
                    <div className="d-flex my-3">
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star" />
                    </div>
                    <h4 className="mb-3">3.12 $</h4>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4">
            <div className={`${theme.theme === 'dark' ? 'p-4 border rounded border-warning' : 'p-4 bg-light rounded'}`}> 
                <div className="row align-items-center">
                  <div className="col-6">
                    <img src="img/best-product-5.jpg" className="img-fluid rounded-circle w-100" alt />
                  </div>
                  <div className="col-6">
                    <a href="#" className="h5">Organic Tomato</a>
                    <div className="d-flex my-3">
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star" />
                    </div>
                    <h4 className="mb-3">3.12 $</h4>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl-4 ">
            <div className={`${theme.theme === 'dark' ? 'p-4 border rounded border-warning' : 'p-4 bg-light rounded'}`}> 
                <div className="row align-items-center" >
                  <div className="col-6">
                    <img src="img/best-product-6.jpg" className="img-fluid rounded-circle w-100" alt />
                  </div>
                  <div className="col-6">
                    <a href="#" className="h5">Organic Tomato</a>
                    <div className="d-flex my-3">
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star" />
                    </div>
                    <h4 className="mb-3">3.12 $</h4>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
            <div className={`${theme.theme === 'dark' ? 'p-4 border rounded border-warning' : 'p-4 bg-light rounded '}`}> 
                <img src="img/fruite-item-1.jpg" className="img-fluid rounded" alt />
                <div className="py-4">
                  <a href="#" className="h5">Organic Tomato</a>
                  <div className="d-flex my-3 justify-content-center">
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star" />
                  </div>
                  <h4 className="mb-3">3.12 $</h4>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className={`text-center border rounded  ${theme.theme}`}>
                <img src="img/fruite-item-2.jpg" className="img-fluid rounded" alt />
                <div className="py-4">
                  <a href="#" className="h5">Organic Tomato</a>
                  <div className="d-flex my-3 justify-content-center">
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star" />
                  </div>
                  <h4 className="mb-3">3.12 $</h4>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className={`text-center border rounded   ${theme.theme}`}>
                <img src="img/fruite-item-3.jpg" className="img-fluid rounded" alt />
                <div className="py-4">
                  <a href="#" className="h5">Organic Tomato</a>
                  <div className="d-flex my-3 justify-content-center">
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star" />
                  </div>
                  <h4 className="mb-3">3.12 $</h4>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-3">
              <div className={`text-center border  rounded  ${theme.theme}`}>
                <img src="img/fruite-item-4.jpg" className="img-fluid rounded" alt />
                <div className="py-2">
                  <a href="#" className="h5">Organic Tomato</a>
                  <div className="d-flex my-3 justify-content-center">
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star text-primary" />
                    <i className="fas fa-star" />
                  </div>
                  <h4 className="mb-3">3.12 $</h4>
                  <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bestsaler Product End */}
      {/* Fact Start */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className={`bg-light p-5  rounded  ${theme.theme}`}>
            <div className="row g-4 justify-content-center">
              <div className="col-md-6 col-lg-6 col-xl-3">
                <div className={`counter bg-white border  border-warning rounded p-5 ${theme.theme}`}>
                  <i className="fa fa-users text-secondary" />
                  <h4>satisfied customers</h4>
                  <h1 className={`${theme.theme==='dark' ? 'text-white' : ""}`}>1963</h1>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
              <div className={`counter bg-white border  border-warning rounded p-5 ${theme.theme}`}>
                  <i className="fa fa-users text-secondary" />
                  <h4>quality of service</h4>
                  <h1 className={`${theme.theme==='dark' ? 'text-white' : ""}`}>99%</h1>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
              <div className={`counter bg-white border  border-warning rounded p-5 ${theme.theme}`}>
                  <i className="fa fa-users text-secondary" />
                  <h4>quality certificates</h4>
                  <h1 className={`${theme.theme==='dark' ? 'text-white' : ""}`}>33</h1>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-3">
              <div className={`counter bg-white border  border-warning rounded p-5 ${theme.theme}`}>
                  <i className="fa fa-users text-secondary" />
                  <h4>Available Products</h4>
                  <h1 className={`${theme.theme==='dark' ? 'text-white' : ""}`}>789</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fact Start */}
      {/* Tastimonial Start */}
      <div className="container-fluid testimonial py-5">
        <div className="container py-5">
          <div className="testimonial-header text-center">
            <h4 className="text-primary">Our Testimonial</h4>
            <h1 className={`${theme.theme === 'dark' ? "display-5 mb-5 text-white" : 'display-5 mb-5 text-dark'}`}>Our Client Saying!</h1>
          </div>
          <OwlCarousel {...tes} className="owl-carousel testimonial-carousel">
            <div className={` ${theme.theme === "dark" ? "testimonial-item img-border-radius rounded  p-4 " : "testimonial-item border img-border-radius rounded  border-warning p-4  "}`}>
              <div className="position-relative ">
                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ bottom: 30, right: 0 }} />
                <div className="mb-4 pb-4 border-bottom border-secondary">
                  <p className={`${theme.theme=== 'dark' ?"mb-4" :"mb-4 text-black"}`} >Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div className="d-flex align-items-center flex-nowrap">
                  <div className="bg-secondary rounded">
                    <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: 100, height: 100 }} alt />
                  </div>
                  <div className="ms-4 d-block">
                    <h4 className="text-black">Client Name</h4>
                    <p className={`${theme.theme === 'dark' ? 'm-0 pb-3 ' : ' m-0 pb-3 text-light'}`}>Profession</p>
                    <div className="d-flex pe-5">
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={` ${theme.theme === "dark" ? "testimonial-item img-border-radius rounded  p-4 " : "testimonial-item border img-border-radius rounded  border-warning p-4  "}`}>
              <div className="position-relative">
                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ bottom: 30, right: 0 }} />
                <div className="mb-4 pb-4 border-bottom border-secondary">
                  <p className={`${theme.theme=== 'dark' ?"mb-4" :"mb-4 text-black"}`}>Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div className="d-flex align-items-center flex-nowrap">
                  <div className="bg-secondary rounded">
                    <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: 100, height: 100 }} alt />
                  </div>
                  <div className="ms-4 d-block">
                    <h4 className="text-black">Client Name</h4>
                    <p className={`${theme.theme === 'dark' ? 'm-0 pb-3 text-dark' : 'm-0 pb-3 text-light'}`}>Profession</p>
                    <div className="d-flex pe-5">
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={` ${theme.theme === "dark" ? "testimonial-item img-border-radius rounded border-warning  p-4 " : "testimonial-item border img-border-radius rounded  border-warning p-4  "}`}>
              <div className="position-relative">
                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ bottom: 30, right: 0 }} />
                <div className="mb-4 pb-4 border-bottom border-secondary">
                  <p className={`${theme.theme=== 'dark' ?"mb-4" :"mb-4 text-black"}`}>Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div className="d-flex align-items-center flex-nowrap">
                  <div className="bg-secondary rounded">
                    <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: 100, height: 100 }} alt />
                  </div>
                  <div className="ms-4 d-block">
                    <h4 className="text-black">Client Name</h4>
                    <p className={`${theme.theme === 'dark' ? 'm-0 pb-3 text-dark' : 'm-0 pb-3 text-light'}`}>Profession</p>
                    <div className="d-flex pe-5">
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                      <i className="fas fa-star text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
      {/* Tastimonial End */}
    </div>

  );
}

export default Home;