import React from "react";

const Platfrom = () => {
  return (
    <div className="platfrom" id="about">
      <div className="bg">
        <img src="assets/img/platfrom.png" alt="" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="content">
            <div className="row justify-content-center">
            <div className="col-lg-9 text-center wow fadeInUp" data-wow-duration="0.3s" data-wow-delay="0.3s"> 
                 <div className="section-head">
                  <h4 className="lasthead">About Us</h4>
                  <h2 className="title">The Online Cryptocurrency Exchange platform</h2>
                  <p className="text">CREXSWAP offers a user-friendly interface, making it accessible for both beginners and experienced traders. With a fixed slippage tolerance of 5%, it is particularly suitable for high volatility and low liquidity markets, ensuring trades are executed efficiently. Additionally, our platform provides lower transaction fees, real-time token data, and robust security, making trading cost-effective and secure. The intuitive design and responsive support further enhance the user experience, while the wide range of supported tokens offers flexibility in trading. By continuously updating and improving based on user feedback, our DEX remains competitive and relevant in the ever-evolving crypto space.</p>
                 </div>
            </div>
        </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
};

export default Platfrom;
