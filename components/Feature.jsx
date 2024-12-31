import React from "react";

const Feature = () => {
  return(
    <div className="fature" id="howworks">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center wow fadeinUp" date-wow-duration="0.3s" data-wow-delay="0.3s">
            <div className="section-head">
              <h4 className="lasthead">How does it work</h4>
              <h2 className="title">It's really easy!</h2>
              <p className="text">
                It's easier then you think , follow 3 simple easy steps
              </p>
            </div>
          </div>

          <div className="col-xl-4 col-lg-6 text-center wow fadeInup" data-wow-duration="1.3s" data-wow-delay="0.3s">
           <div className="feature-box">
            <div className="tumb">
              <img src="assets/img/feature-icon-1.png" alt="" />
            </div>
            <p className="text">
              You choose the currency and <br /> payment method
            </p>
           </div>
          </div>


          <div className="col-xl-4 col-lg-6 text-center wow fadeInup" data-wow-duration="1.3s" data-wow-delay="0.3s">
           <div className="feature-box">
            <div className="tumb">
              <img src="assets/img/feature-icon-2.png" alt="" />
            </div>
            <p className="text">
              Pass account <br /> verification
            </p>
           </div>
          </div>

          <div className="col-xl-4 col-lg-6 text-center wow fadeInup" data-wow-duration="1.3s" data-wow-delay="0.3s">
           <div className="feature-box">
            <div className="tumb">
              <img src="assets/img/feature-icon-3.png" alt="" />
            </div>
            <p className="text">
              Receive <br /> cryptocurrency
            </p>
           </div>
          </div>

        
        </div>
      </div>
    </div>
  )
};

export default Feature;
