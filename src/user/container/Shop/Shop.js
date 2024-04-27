import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProducts } from '../../../redux/action/products.action';
import { addCart } from '../../../redux/slice/cart.slice';

function Shop(props) {
  const [productData, setProductData] = useState([]);
  const [fruitCount, setFruitCount] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [type, setType] = useState([]);
  const [typeFilter, setTypeFilter] = useState("");
  const [price, setPrice] = useState("");


const dispatch = useDispatch();

let {id} = useParams();

const products = useSelector((state) => state.products);


  const fetchData = async () => {
    try {
   
      setProductData(products.products)

      let uniqeData = [...new Set(products.products.map(v => v.name))];
      setFruitCount(uniqeData);

      let typeData = [...new Set(products.products.map(v => v.category))];  
      setType(typeData);



    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterData = () => {

    let filteredData = products.products.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()));

    if (sort) {
      filteredData = filteredData.filter(v => v.name === sort)
    }

    if (typeFilter) {
      filteredData = filteredData.filter((v) => v.type === typeFilter);
    }

    if(price !== ""){
      filteredData = filteredData.filter((v) => parseFloat(v.price) <= parseFloat(price));
    }
    

    return filteredData;
  }

  const finalData = filterData();


  useEffect(() => {
    fetchData();
    dispatch(getProducts())
  }, []);

  const addToCart = (id) => { 
    dispatch(addCart({ id,count:1}))
  }


  return (
    <div>
      {/* Modal Search Start */}
      <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="input-group w-75 mx-auto d-flex">
                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Search End */}

      {/* Single Page Header start */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Shop</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Pages</a></li>
          <li className="breadcrumb-item active text-white">Shop</li>
        </ol>
      </div>
      {/* Single Page Header End */}


      <br></br>
      {/* Fruits Shop Start*/}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Fresh fruits shop</h1>
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="row g-4">
                <div className="col-xl-3">
                  <div className="input-group w-100 mx-auto d-flex">
                    <input type="search" onChange={(e) => setSearch(e.target.value)} className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                    <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                  </div>
                </div>
                <div className="col-6" />
                <div className="col-xl-3">
                  <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label htmlFor="fruits">Default Sorting:</label>
                    <select id="fruits" name="fruitlist" className="border-0 form-select-sm bg-light me-3" form="fruitform">
                      <option value="volvo">Nothing</option>
                      <option value="saab">Popularity</option>
                      <option value="opel">Organic</option>
                      <option value="audi">Fantastic</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row g-4">
                <div className="col-lg-3">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4>Categories</h4>
                        <ul className="list-unstyled fruite-categorie">
                        <li>
                                <div className="d-flex justify-content-between fruite-name">
                                  <a href="#" onClick={() => setSort('')}><i className="fas fa-apple-alt me-2" />All</a>
                                  <span>({productData.length} )</span>
                                </div>
                              </li>
                          {
                            fruitCount.map((n) => (

                              <li>
                                <div className="d-flex justify-content-between fruite-name">
                                  <a href="#" onClick={() => setSort(n)}><i className="fas fa-apple-alt me-2" />{n}</a>
                                  <span>({productData.filter((v) => v.name == n).length} )</span>
                                </div>
                              </li>

                            ))
                          }

                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4 className="mb-2">Price</h4>
                        <input type="range" 
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-range w-100" 
                        id="rangeInput"
                         name="rangeInput" min={0} max={500} defaultValue={0} 
                         oninput="amount.value=rangeInput.value" />
                        <output id="amount" name="amount" min-velue={0} max-value={500} htmlFor="rangeInput">{price}</output>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4>Additional</h4>
                        {
                          type.map((j) => (
                            <div className="mb-2">
                              <input type="radio"
                                onChange={() => setTypeFilter(j)}
                                className="me-2" id="Categories-1"
                                name="Categories-1"
                                defaultValue="Beverages" />

                              <label htmlFor="Categories-1" > {j}</label>
                            </div>
                          ))
                        }

                      </div>
                    </div>
                    <div className="col-lg-12">
                      <h4 className="mb-3">Featured products</h4>
                      <div className="d-flex align-items-center justify-content-start">
                        <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                          <img src="img/featur-1.jpg" className="img-fluid rounded" alt />
                        </div>
                        <div>
                          <h6 className="mb-2">Big Banana</h6>
                          <div className="d-flex mb-2">
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star" />
                          </div>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">2.99 $</h5>
                            <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                          <img src="img/featur-2.jpg" className="img-fluid rounded" alt />
                        </div>
                        <div>
                          <h6 className="mb-2">Big Banana</h6>
                          <div className="d-flex mb-2">
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star" />
                          </div>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">2.99 $</h5>
                            <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-start">
                        <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                          <img src="img/featur-3.jpg" className="img-fluid rounded" alt />
                        </div>
                        <div>
                          <h6 className="mb-2">Big Banana</h6>
                          <div className="d-flex mb-2">
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star text-secondary" />
                            <i className="fa fa-star" />
                          </div>
                          <div className="d-flex mb-2">
                            <h5 className="fw-bold me-2">2.99 $</h5>
                            <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center my-4">
                        <a href="#" className="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">Vew More</a>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <img src="img/banner-fruits.jpg" className="img-fluid w-100 rounded" alt />
                        <div className="position-absolute" style={{ top: '50%', right: 10, transform: 'translateY(-50%)' }}>
                          <h3 className="text-secondary fw-bold">Fresh <br /> Fruits <br /> Banner</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row g-4 justify-content-center">
                    {
                      finalData.map((product) => (
                        <div className="col-md-6 col-lg-6 col-xl-4">
                          <Link to={`/shop/${product.id}`}>
                            <div className="rounded position-relative fruite-item">
                              <div className="fruite-img">
                                <img src={product.imgSrc} className="img-fluid w-100 rounded-top" />
                              </div>
                              <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                              <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                <h4>{product.name}</h4>
                                <p>{product.details}</p>
                                <div className="d-flex justify-content-between flex-lg-wrap">
                                  <p className="text-dark fs-5 fw-bold mb-0">${product.price} / kg</p>
                                  <Link
                                   onClick={()=>{addToCart(product.id)}}
                                   href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                                    <i className="fa fa-shopping-bag me-2 text-primary"
                                   /> Add to cart</Link>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}



                    <div className="col-12">
                      <div className="pagination d-flex justify-content-center mt-5">
                        <a href="#" className="rounded">«</a>
                        <a href="#" className="active rounded">1</a>
                        <a href="#" className="rounded">2</a>
                        <a href="#" className="rounded">3</a>
                        <a href="#" className="rounded">4</a>
                        <a href="#" className="rounded">5</a>
                        <a href="#" className="rounded">6</a>
                        <a href="#" className="rounded">»</a>
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
    </div >

  );
}

export default Shop;