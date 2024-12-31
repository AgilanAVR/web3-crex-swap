import React , {useState ,useEffect , useContext} from 'react';

//internal import
import {CONTEXT} from '../context/context.js';

import {  Header,
    Footer,
    Feature,
    Hero,
    Platfrom,
    Preloader,
    Scroll,
    Scurity,
    Statistics,
    Testomonial,
    Token , Loader , Error} from '../components/index.js'





const index = () => {

  //checking for metamask
const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true); 
useEffect(() => { 
  if (typeof window.ethereum === 'undefined') { 
    setIsMetaMaskInstalled(false); 
  } });

  const {
    TOKEN_SWAP ,
    LOAD_TOKEN ,
    notifyError , 
    notifySuccess ,
    setLoader , 
    loader , 
    connect ,
    address ,
    swap} =useContext(CONTEXT);


    //open token component
    const [token_1 , setToken_1]=useState();
    const [token_2 , setToken_2]=useState();
    const [token, setToken]=useState(0);
    const [openToken , setOpenToken]=useState(false);


    //input
    const {slippageAmount , setSlippageAmount} = useState(2);
    const [deadLineMinutes , setdeadLineMinutes] = useState(10);
    const [inputAmount , setInputAmount]= useState(undefined);

    //output
    const [outputAmount , setOutputAmount]=useState(undefined);
    const [transaction , setTransaction]=useState(undefined);
    const [ratio,setRatio]=useState(undefined);
  return (
    <div className=''>
      {isMetaMaskInstalled ?      <>
      <Preloader/>
      <Header address={address} connect={connect}/>
      <Hero
      setInputAmount={setInputAmount}
      setLoader={setLoader}
      setOpenToken={setOpenToken}
      LOAD_TOKEN={LOAD_TOKEN}
      token_1={token_1}
      token_2={token_2}
      inputAmount={inputAmount}
      setToken_1={setToken_1}
      setToken_2={setToken_2}
      swap={swap}
      notifyError={notifyError}
      setToken={setToken}
      />

      <Feature/>
      <Platfrom/>
      <Statistics/>
      <Footer/>

      {loader && <Loader/>}
      {/* <Loader/> */}


      {
        openToken && (
          <div className="new_loader">
          <Token
          notifyError={notifyError}
          notifySuccess={notifySuccess}
          openToken={openToken}
          setOpenToken={setOpenToken}
          LOAD_TOKEN={LOAD_TOKEN}
          setToken_1={setToken_1}
          setToken_2={setToken_2}
          token_1={token_1}
          token_2={token_2}
          token={token}
          />
          </div>
        )
      }
      </> : <><Error/></>}
    </div>
  )
}

export default index;