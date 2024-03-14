import React from 'react';

function Error(props) {
    return (
<div>
  <div className="container-fluid page-header py-5">
    <h1 className="text-center text-white display-6">404 Error</h1>
    <ol className="breadcrumb justify-content-center mb-0">
      <li className="breadcrumb-item"><a href="#">Home</a></li>
      <li className="breadcrumb-item"><a href="#">Pages</a></li>
      <li className="breadcrumb-item active text-white">404</li>
    </ol>
  </div>
  {/* Single Page Header End */}
  {/* 404 Start */}
  <div className="container-fluid py-5">
    <div className="container py-5 text-center">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <i className="bi bi-exclamation-triangle display-1 text-secondary" />
          <h1 className="display-1">404</h1>
          <h1 className="mb-4">Page Not Found</h1>
          <p className="mb-4">We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
          <a className="btn border-secondary rounded-pill py-3 px-5" href="index.html">Go Back To Home</a>
        </div>
      </div>
    </div>
  </div>
</div>

    );
}

export default Error;