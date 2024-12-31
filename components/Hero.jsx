import React , {useState , useEffect} from "react";
import {IoCloseOutline} from "react-icons/io5";

const Hero = ({      
  setInputAmount ,
  setLoader ,
  setOpenToken ,
  LOAD_TOKEN ,
  token_1 ,
  token_2 ,
  inputAmount,
  setToken_1 ,
  setToken_2 ,
  swap , notifyError , setToken}) => {


//reset button

const reset=(e)=>{
  e.preventDefault();
  setToken_1(undefined);
  setToken_2(undefined);
}


const swapToken=async()=>{
  if(token_1?.balance==0.0){
    notifyError("Insufficient fund for Transaction");
    return;
  }
const tx=await swap(token_1 ,token_2 ,inputAmount);

}

  return(
    <div className="banner" id="home" style={{backgroundImage:'url("assets/img/banner-bg.png")'}}>
      <div className="illustration">
         <img src="assets/img/banner-bg-2.png" className="two" alt="" />
       </div>

      <div className="hero-area">
        <div className="container">
          <div className="row align-items-center justify-centent-between" style={{marginTop:"-3.5em"}}>
            <div className="col-xl-7 col-lg-6">
              <div className="banner-content wow fadeInUp" data-wow-duration="0.5s" data-wow-delay="0.3s">
             <h3 className="subtitle">Fast and Convenient</h3>
             <h1 className="head">Cryptocurrency Exchange</h1>
             <p className="text">
             Navigate through our intuitive platform effortlessly
              </p>
              </div>
            </div>
            
            <div className="col-xl-4 col-lg-6 wow fadeInRightBig" data-wow-delay="0.3s" delay-wow-duration="0.5s">
               <div className="exchange">
                <h5 className="ex-head">
                  Cryptocurrency Exchange
                </h5>
                <div className="exchange-box">
                  <div className="selector">
                    <p className="text">Your Change</p>
                    <div className="coin">
                      <span>{token_1?.symbol}</span>
                    </div>
                   </div>

                   <div className="">
                    <div className="form-group">
                      <span style={{cursor:"pointer" , marginBottom:"10px" , fontWeight:"600"}} onClick={()=>{setOpenToken(true), setToken(1)}}>Open</span>
                      <input type="text" placeholder={token_1?.symbol || "Select"}  className="form-control"
                      onChange={(e)=>{setInputAmount(e.target.value)}}
                      />
                    </div>
                   </div>

                   {
                    token_1 ?(
                      <span className="rate">{`Balance:${token_1?.balance.slice(0,10)} $ `} {token_1?.symbol}</span>
                    ):(
                      ""
                    )
                   }
                </div>

                <a href="" className="rotate">
                  <img src="assets/img/exchange-img.png" alt="" onClick={(e)=>reset(e)} />
                </a>




                <div className="exchange-box">
                  <div className="selector">
                    <p className="text">You Get</p>
                    <div className="coin">
                      <span>{token_2?.symbol}</span>
                    </div>
                   </div>

                   <div className="">
                    <div className="form-group">
                      <span style={{cursor:"pointer" , marginBottom:"10px" , fontWeight:"600"}}  onClick={()=>{setOpenToken(true), setToken(2)}}>Open</span>
                      <input type="text" placeholder={token_2?.symbol || "Select"}  className="form-control"
                      onChange={(e)=>{setInputAmount(e.target.value)}}
      
                      />
                    </div>
                   </div>

                   {
                    token_2 ?(
                      <span className="rate">{`Balance:${token_2?.balance.slice(0,10)} $ `} {token_2?.symbol}</span>
                    ):(
                      ""
                    )
                   }
                </div>

                <a onClick={()=>swapToken()} className="button button-1">Exchange</a>


               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Hero;
