import React, {useState} from "react";
import {ethers} from "ethers";
import toast from "react-hot-toast";
import JSBI from "jsbi";
import Web3Modal from "web3modal";

//internal import
import {SwapRouter} from "@uniswap/universal-router-sdk";
import {TradeType , Ether , Token , CurrencyAmount , Percent} from "@uniswap/sdk-core";
import { Trade as V2Trade } from "@uniswap/v2-sdk";


import {
    Pool , nearestUsableTick , TickMath , TICK_SPACINGS , FeeAmount , Trade as V3Trade , Route as RouteV3
} from "@uniswap/v3-sdk";

import {MixedRouteTrade , Trade as RouterTrade} from "@uniswap/router-sdk";
import IUniswapV3Pool from "@uniswap/v3-core/artifacts/contracts/UniswapV3pool.sol/UniswapV3Pool.json";

//internal import
import {ERC20_ABI , web3Provider , CONNECTING_CONTRACT} from "./constants";
import {shortenAddress , parseErrorMsg} from "../utils/index";

export const CONTEXT=React.createContext();

export const PROVIDER=({children})=>{
    const TOKEN_SWAP ="TOKEN SWAP DAPP";
    const [loader , setLoader] =useState(false);
    const [address , setAddress]=useState("");
    const [chainId , setChainID]=useState();

    //notification
    const notifyError=(msg)=>toast.error(msg , {duration:4000});
    const notifySuccess=(msg)=>toast.success(msg , {duration:4000});

    

    //connect wallet function
    const connect=async()=>{
        try{
          if(!window.ethereum) return notifyError("Install Metamask");
          const accounts =await window.ethereum.request({
            method:"eth_requestAccounts",
          });

          if(accounts.length){
            setAddress(accounts[0]);
          }else{
            notifyError("Sorry , you have no account");
          }

          const provider=await web3Provider();
          const network=await provider.getNetwork();
          setChainID(network.chainId);

        }catch(err){
        const errormsg=parseErrorMsg(err);
        notifyError(errormsg);
        //console.log(err);
        }
    }


    //load token data
    const LOAD_TOKEN=async(token)=>{
       try{
        setLoader(true);
           const tokenDetail =await CONNECTING_CONTRACT(token);
           //console.log(tokenDetail);
           setLoader(false);
           return tokenDetail;
       }catch(err){
        const errormsg=parseErrorMsg(err);
        setLoader(false);
        notifyError(errormsg);
        //console.log(err);
       }
    }


    //internal function
    const getPool=async(tokenA , tokenB , feeAmount , provider)=>{
        const [token0 , token1]=tokenA.sortsBefore(tokenB)?[tokenA , tokenB]:[tokenB , tokenA];

        const poolAddress = Pool.getAddress(token0 , token1 , feeAmount);

        const contract =new ethers.Contract(poolAddress , IUniswapV3Pool.abi , provider);

        let liquidity =await contract.liquidity();

        let {sqrtPriceX96 , tick} = await contract.slot0();

        liquidity =JSBI.BigInt(liquidity.toString());
        sqrtPriceX96 = JSBI.BigInt(sqrtPriceX96.toString());
        
        //console.log("CALLING POOL______________________")
        return new Pool(token0 , token1 , feeAmount , sqrtPriceX96 , liquidity , tick , [
            {
                index:nearestUsableTick(TickMath.MIN_TICK , TICK_SPACINGS[feeAmount]),
                liquidityNet:liquidity,
                liquidityGross:liquidity
        },
        {
            index:nearestUsableTick(TickMath.MAX_TICK , TICK_SPACINGS[feeAmount]),
            liquidityNet:JSBI.multiply(liquidity , JSBI.BigInt("-1")),
            liquidityGross:liquidity 
        }
        ])
        }



    const swapOptions=(options)=>{
        return Object.assign(
            {
                slippageTolerance: new Percent(5 , 1000),
                recipient:RECEIPTENT,
            },
            options           
        )
    }

    //buildtrade
    // const buildTrade=(trades)=>{

    //     if (!trades || trades.length === 0) { throw new Error("Trades array is empty or undefined"); }

    //      return new RouterTrade({
    //         v2Routes:trades
    //         .filter((trade)=>trade instanceof V2Trade)
    //         .map((trade)=>({
    //             routev2:trade.route,
    //             inputAmount:trade.inputAmount,
    //             outputAmount:trade.outputAmount,
    //         })),
    //         v3Routes:trades
    //         .filter((trade)=>trade instanceof V3Trade)
    //         .map((trade)=>({
    //             routeV3:trade.route,
    //             inputAmount:trade.inputAmount,
    //             outputAmount:trade.outputAmount,
    //         })),
    //         mixedRoutes:trades
    //         .filter((trade)=>trade instanceof MixedRouteTrade)
    //         .map((trade)=>({
    //             mixedRoute:trade.route,
    //             inputAmount:trade.inputAmount,
    //             outputAmount:trade.outputAmount,
    //         })),
    //         tradeType:trades[0].tradeType,

    //      })
    // }

    const buildTrade = (trades) => {
        if (!trades || trades.length === 0) {
          throw new Error("Trades array is empty or undefined");
        }
      
        return new RouterTrade({
          v2Routes: trades.filter((trade) => trade instanceof V2Trade).map((trade) => ({
              routev2: trade.route,
              inputAmount: trade.inputAmount,
              outputAmount: trade.outputAmount,
            })),
          v3Routes: trades.filter((trade) => trade instanceof V3Trade).map((trade) => ({
              routev3: trade.route,
              inputAmount: trade.inputAmount,
              outputAmount: trade.outputAmount,
            })),
          mixedRoutes: trades.filter((trade) => trade instanceof MixedRouteTrade).map((trade) => ({
              mixedRoute: trade.route,
              inputAmount: trade.inputAmount,
              outputAmount: trade.outputAmount,
            })),
          tradeType: trades[0].tradeType,
        });
      };
      
    

    //demo account
    const RECEIPTENT ="0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";




    //swap function
    const swap=async(token_1 ,token_2 ,inputAmount)=>{
      if((!token_1 || !token_2 || !inputAmount)){
        notifyError("swap with valid token details");
        return 
      }
try{
  setLoader(true)
  //console.log("CALLING ME_______________SWAP");
  const provider=await web3Provider();
  const signer=provider.getSigner();
  // const network=provider.getNetwork();

  //userAddress
  const useAddress=await signer.getAddress();
  const ETHER = Ether.onChain(token_1.chainId);
  // const ETHER = Ether.onChain(network.chainId);
  // const ETHER = Ether.onChain(1);

  
  //console.log(ETHER);

  // //token contract
  // const tokenAddress1 = await CONNECTING_CONTRACT("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
  // const tokenAddress2 = await CONNECTING_CONTRACT("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");
  const tokenAddress1 = await CONNECTING_CONTRACT(token_1.address);
  const tokenAddress2 = await CONNECTING_CONTRACT(token_2.address);

  //console.log(tokenAddress1);

  // //token details
  const TOKEN_A=new Token(
    tokenAddress1.chainId,
      tokenAddress1.address,
      tokenAddress1.decimals,
      tokenAddress1.symbol,
      tokenAddress1.name
  );



  const TOKEN_B=new Token(
    tokenAddress2.chainId,
      tokenAddress2.address,
      tokenAddress2.decimals,
      tokenAddress2.symbol,
      tokenAddress2.name
  );

  const WETH_USDC_V3=await getPool(
      TOKEN_A , 
      TOKEN_B , 
      FeeAmount.MEDIUM, 
      provider
  )


  const inputEther=ethers.utils.parseEther(inputAmount).toString();
  // const inputEther=ethers.utils.parseEther("1").toString();

  const trade=await V3Trade.fromRoute(new RouteV3([WETH_USDC_V3] , ETHER , TOKEN_B),
      CurrencyAmount.fromRawAmount(ETHER , inputEther),
      TradeType.EXACT_INPUT
  )

  const route = new RouteV3([WETH_USDC_V3], TOKEN_A, TOKEN_B);


  // //console.log("pool details");
  // //console.log(WETH_USDC_V3)

  // //console.log("pool");
  // //console.log(route.pools)

  // //console.log("trade");
  // //console.log(trade);


//         //console.log(trade);

  if (!trade) { throw new Error("Failed to initialize trade"); } 
  const trades = [trade]; // Ensure this array contains valid trade objects 
  const routerTrade = buildTrade(trades);
  const opts=swapOptions({});

  const params=SwapRouter.swapCallParameters(routerTrade , opts);

  //console.log(WETH_USDC_V3);
  //console.log(trade);
  //console.log(routerTrade);
  //console.log(opts);
  //console.log(params);

  let ethBalance;
  let tokenA;
  let tokenB;

  ethBalance= await provider.getBalance(useAddress);
  tokenA=  tokenAddress1.balance;
  tokenB=  tokenAddress2.balance;
  //console.log("-----------------BEFORE");
  //console.log("EthBalance:", ethers.utils.formatUnits(ethBalance , 18));
  //console.log("tokenA",tokenA);
  //console.log("tokenB",tokenB);

  const tx=await signer.sendTransaction({
      data:params.calldata,
      to:useAddress,
      value:params.value,
      from:useAddress,
  });

    //console.log("_______________CALLING_ME");
    const receipt=await tx.wait();
    //console.log("__________________SUCCESS");
    //console.log("STATUS" , receipt.status);

    ethBalance= await provider.getBalance(useAddress);
    tokenA=  tokenAddress1.balance;
    tokenB=  tokenAddress2.balance;

    //console.log("___________________AFTER");


    //console.log("EthBalance:", ethers.utils.formatUnits(ethBalance , 18));
    //console.log("tokenA:", tokenA);
    //console.log("tokenB:",tokenB);
    setLoader(false);

    notifySuccess(`WETH : ${tokenA}  >>>  USDC : ${tokenB}`);
}catch(err){
            notifyError("something went wrong or Insufficient funds");
            //console.log(err);
            setLoader(false);
        }
    }


return(
    <CONTEXT.Provider value={{TOKEN_SWAP , LOAD_TOKEN , notifyError , notifySuccess , setLoader , loader , connect , address , swap , shortenAddress}}>
    {children}
    </CONTEXT.Provider>
)


}

