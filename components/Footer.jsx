import React from "react";
import { FaFacebook , FaGooglePlus} from "react-icons/fa";
import { AiFillTwitterCircle , AiFillInstagram } from "react-icons/ai";


const Footer = () => {
  const logoStyle={
    width: '100%', 
    height: '55px', 
    maxWidth: '100%',
  }
  return(
    <div className="footer"  id="contact"
    style={{backgroundImage : "url('assets/img/footer-bg.png')"}}>

    <div className="container">
      <div className="row">
        <div className="col-12 wow fadeInUp" data-wow-duration="03s" data-wow-delay="0.2s">
           <div className="top-footer">
            <div className="logo">
              <img style={logoStyle} src="assets/img/CrexSwapLogo.png" alt="" />
            </div>
            <a href="mailto:agilankawin50k@gmail.com" className="button-1">Get In Touch</a>
           </div>
        </div>
      </div>

      <div className="row justify-content-between">
        <div className="col-lg-2 col-md-6 wow fadeInUp"
        data-wow-duration="0.3s"
        data-wowo-deley="0.3s"
        >
          <div className="footer-box">
            <h4 className="lasthead">Company</h4>
              <ul className="footer-link">
                {["About Us" , "Contact Us" , "Blog" , "Affilate"]
                .map((elem, i)=>{
                  return(
                     <li key={i}>
                      <a href="#">{elem}</a>
                     </li>
                  )
                })}
              </ul>
          </div>
        </div>

        <div className="col-lg-2 col-md-6 wow fadeInUp"
        data-wow-duration="0.4s"
        data-wowo-deley="0.4s"
        >
          <div className="footer-box">
            <h4 className="lasthead">Support</h4>
              <ul className="footer-link">
                {["FAQ" , "Contact Time" , "How its work" , "Details"]
                .map((elem, i)=>{
                  return(
                     <li key={i}>
                      <a href="#">{elem}</a>
                     </li>
                  )
                })}
              </ul>
          </div>
        </div>

        <div className="col-lg-2 col-md-6 wow fadeInUp"
        data-wow-duration="0.5s"
        data-wowo-deley="0.5s"
        >
          <div className="footer-box">
            <h4 className="lasthead">Policy</h4>
              <ul className="footer-link">
                {["Terms of use" , "Privacy Policy" , "Refunds Policy" , "Money Type"]
                .map((elem, i)=>{
                  return(
                     <li key={i}>
                      <a href="#">{elem}</a>
                     </li>
                  )
                })}
              </ul>
          </div>
        </div>



        <div className="col-lg-4  col-md-6 wow fadeInUp"
        data-wow-duration="0.5s"
        data-wowo-deley="0.5s"
        >
          <div className="footer-box">
            <h4 className="lasthead">NewsLetter</h4>
             <form action="#">
              <div className="form-group">
                <input type="email" placeholder="Enter Your Email" />
                <button type="submit" className="button-1">Join Now</button>
              </div>
             </form>
             <div className="social-style" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <a href="#">
                <FaFacebook  style={{ fontSize: '2rem', position:"relative" , bottom:"2px" }}/>
               </a>
              <a href="#">
              <AiFillTwitterCircle style={{ fontSize: '2rem', position:"relative" , bottom:"2px" }} />              </a>
              <a href="#">
              <AiFillInstagram style={{ fontSize: '2rem', position:"relative" , bottom:"2px" }}/>              </a>
              <a href="#">
              <FaGooglePlus style={{ fontSize: '2rem', position:"relative" , bottom:"2px" }}/>              </a>
             </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 text-center wow fadeInUp"
        data-wow-duration="0.4s"
        data-wowo-delay="0.4s"
        >
          <div className="footer-bottom">
            <p className="text">
              Copyright &copy; <a href="#">@agilanWeb3</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
};

export default Footer;
