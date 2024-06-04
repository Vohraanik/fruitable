import React, { useContext } from 'react';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import Input from '../../component/UI/Input/Input';
import { ThemeContext } from '../../../context/Theme.context';

function Contact(props) {
  let contactSchema = object({
    name: string().required("Name is required"),
    email: string().required("Email is required").email("Invalid email format"),
    message: string().required("Message is required").min(10, "Must be at least 10 characters")
  });

  const theme = useContext(ThemeContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const { onSubmit, values, errors, touched, handleBlur, handleChange, handleSubmit } = formik;
  return (
    <div>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Contact</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Pages</a></li>
          <li className="breadcrumb-item active text-white">Contact</li>
        </ol>
      </div>
      {/* Single Page Header End */}
      {/* Contact Start */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className={`p-5 bg-light rounded ${theme.theme}`}>
            <div className="row g-4">
              <div className="col-12">
                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                  <h1 className="text-primary">Get in touch</h1>
                  <p className="mb-4">The contact form is currently inactive. Get a functional and working contact form with Ajax &amp; PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.</p>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="h-100 rounded">
                  <iframe className="rounded w-100" style={{ height: 400 }} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              </div>
              <div className="col-lg-7">
                <form onSubmit={handleSubmit}>
                  {/* <input type="text" 
              name='name' 
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              className="w-100 form-control border-0 py-3 mb-3" 
              placeholder="Your Name" />
              <span className='error'>{errors.name && touched.name && errors.name}</span>
              <input type="email" 
              className="w-100 form-control border-0 py-3 mb-4"
              name='email' 
              onChange={handleChange} 
              onBlur={handleBlur}
               value={values.email} 
               placeholder="Enter Your Email" />
              <span className='error'>{errors.email && touched.email && errors.email}</span>
              <textarea 
              className="w-100 form-control border-0 mb-4" 
              name='message'
               onChange={handleChange} 
               onBlur={handleBlur} 
               value={values.message} rows={5} cols={10}
                placeholder="Your Message" 
                defaultValue={""} /> */}
                  <Input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your Name"
                    errorText={errors.name && touched.name ? errors.name : ''}
                  />
                  <Input
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your Email"
                    errorText={errors.email && touched.email ? errors.email : ''}
                  />
              
                  <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary " type="submit">Submit</button>
                </form>
              </div>
              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                  <div>
                    <h4>Address</h4>
                    <p className="mb-2">123 Street New York.USA</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-envelope fa-2x text-primary me-4" />
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">info@example.com</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
                  <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                  <div>
                    <h4>Telephone</h4>
                    <p className="mb-2">(+012) 3456 7890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Contact;