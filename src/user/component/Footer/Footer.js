import React, { useContext } from 'react';
import Button from '../UI/Button/Button';
import { ThemeContext } from '../../../context/Theme.context';

function Footer(props) {
  
  const theme = useContext(ThemeContext);
  console.log(theme);
    return (
   <div>
  {/* Footer Start */}
  <div className={`${theme.theme === 'dark' ? 'container-fluid bg-dark text-white-50 footer pt-5 mt-5' : 'container-fluid bg-light text-dark footer pt-5 mt-5'}`} >
    <div className="container py-5">
      <div className="pb-4 mb-4" style={{borderBottom: '1px solid rgba(226, 175, 24, 0.5)'}}>
        <div className="row g-4">
          <div className="col-lg-3">
            <a href="#">
              <h1 className="text-primary mb-0">Fruitables</h1>
              <p className="text-secondary mb-0">Fresh products</p>
            </a>
          </div>
          <div className="col-lg-6">
            <div className="position-relative mx-auto">
              <input className="form-control border-0 w-100 py-3 px-4 rounded-pill" type="number" placeholder="Your Email" />
              <Button type="submit" 
                btnType = "secondry"
                className='position-absolute'
                style={{top:0,right:0}}
              >Subscribe Now
              </Button>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="d-flex justify-content-end pt-3">
              <a className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-twitter" /></a>
              <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-facebook-f" /></a>
              <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-youtube" /></a>
              <a className="btn btn-outline-secondary btn-md-square rounded-circle" href><i className="fab fa-linkedin-in" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-5">
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className={`${theme.theme === 'dark' ? 'text-light mb-3' : ' text-dark mb-3'}`}>Why People Like us!</h4>
            <p className="mb-4">typesetting, remaining essentially unchanged. It was 
              popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
            <a href className="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More</a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="d-flex flex-column text-start footer-item">
            <h4 className={`${theme.theme === 'dark' ? 'text-light mb-3' : ' text-dark mb-3'}`}>Shop Info</h4>
            <a className="btn-link" href>About Us</a>
            <a className="btn-link" href>Contact Us</a>
            <a className="btn-link" href>Privacy Policy</a>
            <a className="btn-link" href>Terms &amp; Condition</a>
            <a className="btn-link" href>Return Policy</a>
            <a className="btn-link" href>FAQs &amp; Help</a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="d-flex flex-column text-start footer-item">
            <h4 className={`${theme.theme === 'dark' ? 'text-light mb-3' : ' text-dark mb-3'}`}>Account</h4>
            <a className={`btn-link`} href>My Account</a>
            <a className="btn-link" href>Shop details</a>
            <a className="btn-link" href>Shopping Cart</a>
            <a className="btn-link" href>Wishlist</a>
            <a className="btn-link" href>Order History</a>
            <a className="btn-link " href>International Orders</a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className={`${theme.theme === 'dark' ? 'text-light mb-3' : ' text-dark mb-3'}`}>Contact</h4>
            <p>Address: 1429 Netus Rd, NY 48247</p>
            <p>Email: Example@gmail.com</p>
            <p>Phone: +0123 4567 8910</p>
            <p>Payment Accepted</p>
            <img src="img/payment.png" className="img-fluid" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Footer End */}
  {/* Copyright Start */}
  <div className="container-fluid copyright bg-dark py-4">
    <div className="container">
      <div className="row">
        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
          <span className="text-light"><a href="#"><i className="fas fa-copyright text-light me-2" />Your Site Name</a>, All right reserved.</span>
        </div>
        <div className="col-md-6 my-auto text-center text-md-end text-white">
          {/*/*** This template is free as long as you keep the below author’s credit link/attribution link/backlink. *** /*/}
          {/*/*** If you'd like to use the template without the below author’s credit link/attribution link/backlink, *** /*/}
          {/*/*** you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". *** /*/}
          Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a> Distributed By <a className="border-bottom" href="https://themewagon.com">ThemeWagon</a>
        </div>
      </div>
    </div>
  </div>
  {/* Copyright End */}
  {/* Back to Top */}
  <a href="#" className="btn btn-primary border-3 border-primary rounded-circle back-to-top"><i className="fa fa-arrow-up" /></a>   
</div>

    );
}

export default Footer;