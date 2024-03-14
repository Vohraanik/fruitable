import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Shop(props) {
  const [fruits, setFruits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {  
  const response = await fetch('http://localhost:3000/fruits');
  const data = await response.json();
  setFruits(data);
  setIsLoading(false);

};

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Shop</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Pages</a></li>
          <li className="breadcrumb-item active text-white">Shop</li>
        </ol>
      </div>
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Fresh fruits shop</h1>
          <div className="row g-4 justify-content-center">
            {
            fruits.map((fruit) => (
              <div key={fruit.id} className="col-md-6 col-lg-6 col-xl-4">
                <Link to={`/shop/${fruit.id}`}>
                  <div className="rounded position-relative fruite-item">
                    <div className="fruite-img">
                      <img src={fruit.imgSrc}   className="img-fluid w-100 rounded-top" alt={fruit.name} />
                    </div>
                    <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>Fruits</div>
                    <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                      <h4>{fruit.name}</h4>
                      <p>{fruit.description}</p>
                      <div className="d-flex justify-content-between flex-lg-wrap">
                        <p className="text-dark fs-5 fw-bold mb-0">{fruit.price}</p>
                        <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
