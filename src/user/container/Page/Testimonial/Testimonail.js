import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
function Testimonial(props) {
  const owlClient = {
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
        <h1 className="text-center text-white display-6">Testimonial</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Pages</a></li>
          <li className="breadcrumb-item active text-white">Testimonial</li>
        </ol>
      </div>
      {/* Single Page Header End */}
      {/* Tastimonial Start */}
      <div className="container-fluid testimonial py-5">
        <div className="container py-5">
          <div className="testimonial-header text-center">
            <h4 className="text-primary">Our Testimonial</h4>
            <h1 className="display-5 mb-5 text-dark">Our Client Saying!</h1>
          </div>
          <OwlCarousel  {...owlClient} nav className="owl-carousel testimonial-carousel">
            <div className="testimonial-item img-border-radius bg-light rounded p-4">
              <div className="position-relative">
                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ bottom: 30, right: 0 }} />
                <div className="mb-4 pb-4 border-bottom border-secondary">
                  <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div className="d-flex align-items-center flex-nowrap">
                  <div className="bg-secondary rounded">
                    <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: 100, height: 100 }} alt />
                  </div>
                  <div className="ms-4 d-block">
                    <h4 className="text-dark">Client Name</h4>
                    <p className="m-0 pb-3">Profession</p>
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
            <div className="testimonial-item img-border-radius bg-light rounded p-4">
              <div className="position-relative">
                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ bottom: 30, right: 0 }} />
                <div className="mb-4 pb-4 border-bottom border-secondary">
                  <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div className="d-flex align-items-center flex-nowrap">
                  <div className="bg-secondary rounded">
                    <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: 100, height: 100 }} alt />
                  </div>
                  <div className="ms-4 d-block">
                    <h4 className="text-dark">Client Name</h4>
                    <p className="m-0 pb-3">Profession</p>
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
            <div className="testimonial-item img-border-radius bg-light rounded p-4">
              <div className="position-relative">
                <i className="fa fa-quote-right fa-2x text-secondary position-absolute" style={{ bottom: 30, right: 0 }} />
                <div className="mb-4 pb-4 border-bottom border-secondary">
                  <p className="mb-0">Lorem Ipsum is simply dummy text of the printing Ipsum has been the industry's standard dummy text ever since the 1500s,
                  </p>
                </div>
                <div className="d-flex align-items-center flex-nowrap">
                  <div className="bg-secondary rounded">
                    <img src="img/testimonial-1.jpg" className="img-fluid rounded" style={{ width: 100, height: 100 }} alt />
                  </div>
                  <div className="ms-4 d-block">
                    <h4 className="text-dark">Client Name</h4>
                    <p className="m-0 pb-3">Profession</p>
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

export default Testimonial;