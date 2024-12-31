import React , {useState , useEffect} from "react";

//internal imports
import {ShortAddress} from "../utils/index"
import Loader from "./Loader";

const Token = ({
  notifyError,
  notifySuccess,
  openToken,
  setOpenToken,
  LOAD_TOKEN,
  setToken_1,
  setToken_2,
  token_1,
  token_2, token
}) => {

//state variable
const [searchToken , setSearchToken]=useState();
const [displayToken , setDispleyToken]=useState();
//console.log(searchToken);

//token data
useEffect(()=>{
  const loadToken=async()=>{
    const token =await LOAD_TOKEN(searchToken);

    if(searchToken==undefined)
      notifyError("Token Address is Missing")
    else if(token ==undefined)
      notifyError("Can't reach the token , check the chain Network")
    else
    setDispleyToken(token);
  }
  loadToken();
},[searchToken])


const selectToken=async()=>{
  if(token==1){
    setToken_1(displayToken);
    setOpenToken(false);
  }else if(token==2){
    setToken_2(displayToken);
    setOpenToken(false);
  }else
  setOpenToken(false);
}

const tokenStyle={
  position:"relative",
  zIndex:99999,
}


  return (
    <div className="bannerz" style={tokenStyle}>
      <div className="hero-area">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-4 col-lg-6 wow new_width">
              <div className="exchangez">
                <h5 className="ex-head">Select Token <span onClick={()=>{setOpenToken(false)}} style={{fontSize:"25px", fontWeight:"700" , position:"absolute" , right:"20px" , top:"5px", cursor:"pointer"}}>X</span></h5>

                <div className="exchange-boxz">
                  <div className="selector">
                    <p className="text">
                      Search token address
                    </p>
                    <div className="icon"><span>{displayToken?.symbol}</span></div>
                  </div>

                  <div className="">
                    <div className="form-group">
                      <input type="text" name="" id="" className="form-control" onChange={(e)=>{setSearchToken(e.target.value)}} placeholder={displayToken?.address || "search"} />
                    </div>
                  </div>
                </div>

                {
                  displayToken ?(
                   <a onClick={()=>selectToken()} className="button button-1">
                    {ShortAddress(displayToken?.address)} {displayToken?.symbol}
                   </a>
                  ):( <div style={{display:"flex" , justifyContent:"center" , alignItems:"center"}} className="">
                    {searchToken && <p style={{color:'#6342ff', fontFamily:'Open Sans", sans-serif' , marginTop:"5px" }} className="text">Fetching details...</p> }
                   </div>
 
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Token;




// import React , {useState , useEffect} from "react";

// //internal imports
// import {ShortAddress} from "../utils/index"
// import Loader from "./Loader";

// const Token = ({
//   notifyError,
//   notifySuccess,
//   openToken,
//   setOpenToken,
//   LOAD_TOKEN,
//   setToken_1,
//   setToken_2,
//   token_1,
//   token_2, token
// }) => {

// //state variable
// const [searchToken , setSearchToken]=useState();
// const [displayToken , setDispleyToken]=useState();
// //console.log(searchToken);

// //token data
// useEffect(()=>{
//   const loadToken=async()=>{
//     const token =await LOAD_TOKEN(searchToken);

//     if(searchToken==undefined)
//       notifyError("Token Address is Missing")
//     else if(token ==undefined)
//       notifyError("Can't reach the token , check the chain Network")
//     else
//     setDispleyToken(token);
//   }
//   loadToken();
// },[searchToken])


// const selectToken=async()=>{
//   if(token==1){
//     setToken_1(displayToken);
//     setOpenToken(false);
//   }else if(token==2){
//     setToken_2(displayToken);
//     setOpenToken(false);
//   }else
//   setOpenToken(false);
// }

// const tokenStyle={
//   position:"relative",
//   zIndex:99999,
// }


//   return (
//     <div className="">
//                     <div className="exchangez" style={tokenStyle}>
//                 <h5 className="ex-head">Select Token <span onClick={()=>{setOpenToken(false)}} style={{fontSize:"25px", fontWeight:"700" , position:"absolute" , right:"35px" , top:"5px", cursor:"pointer"}}>X</span></h5>

//                 <div className="exchange-boxz">
//                   <div className="selector">
//                     <p className="text">
//                       Search token address
//                     </p>
//                     <div className="icon"><span>{displayToken?.symbol}</span></div>
//                   </div>

//                   <div className="">
//                     <div className="form-group">
//                       <input type="text" name="" id="" className="form-control" onChange={(e)=>{setSearchToken(e.target.value)}} placeholder={displayToken?.address || "search"} />
//                     </div>
//                   </div>
//                 </div>

//                 {
//                   displayToken ?(
//                    <a onClick={()=>selectToken()} className="button button-1">
//                     {ShortAddress(displayToken?.address)} {displayToken?.symbol}
//                    </a>
//                   ):( <div style={{display:"flex" , justifyContent:"center" , alignItems:"center"}} className="">
//                     {searchToken && <p style={{color:'#6342ff', fontFamily:'Open Sans", sans-serif' , marginTop:"5px" }} className="text">Fetching details...</p> }
//                    </div>
 
//                   )
//                 }
//               </div>
//     </div>
//   )
// };

// export default Token;
