//internal import
const {SwapRouter} = require("@uniswap/universal-router-sdk");
const {TradeType , Ether , Token , CurrencyAmount , Percent} = require("@uniswap/sdk-core");
const {Trade : V2Trade} =  require("@uniswap/v2-sdk");

const {
    Pool , nearestUsableTick , TickMath , TICK_SPACINGS , FeeAmount , Trade : V3Trade , Route : Routev3
}  = require("@uniswap/v3-sdk");

const {MixedRouteTrade , Trade : RouterTrade} = require("@uniswap/router-sdk");
const IUniswapV3Pool = require("@uniswap/v3-core/artifacts/contracts/UniswapV3pool.sol/UniswapV3Pool.json");

const JSBI = require("jsbi");
const erc20Abi = require("./abis__erc20.json");

const hardhat=require("hardhat");
const provider = hardhat.ethers.provider;

const ETHER=Ether.onChain(1);
console.log(ETHER);
const WETH = new Token(
    1,
    "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    18,
    "WETH",
    "Wrapped Ether"
);

const USDC = new Token(
    1,
    "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    6,
    "USDC",
    "USD Coin"
);

const wethContract= new hardhat.ethers.Contract(
    WETH.address,
    erc20Abi,
    provider
);

const usdcContract= new hardhat.ethers.Contract(
    USDC.address,
    erc20Abi,
    provider
)

const getPool=async(tokenA , tokenB , feeAmount)=>{
    const [token0 , token1]=tokenA.sortsBefore(tokenB)?[tokenA , tokenB]:[tokenB , tokenA];

    const poolAddress = Pool.getAddress(token0 , token1 , feeAmount);
    const contract =new hardhat.ethers.Contract(poolAddress , IUniswapV3Pool.abi , provider);

    let liquidity =await contract.liquidity();

    let {sqrtPriceX96 , tick} = await contract.slot0();

    liquidity =JSBI.BigInt(liquidity.toString());
    sqrtPriceX96 = JSBI.BigInt(sqrtPriceX96.toString());
    
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
    
const buildTrade=(trades)=>{
        return new RouterTrade({
           v2Routes:trades
           .filter((trade)=>trade instanceof V2Trade)
           .map((trade)=>({
               routev2:trade.route,
               inputAmount:trade.inputAmount,
               outputAmount:trade.outputAmount,
           })),
           v3Routes:trades
           .filter((trade)=>trade instanceof V3Trade)
           .map((trade)=>({
               routev3:trade.route,
               inputAmount:trade.inputAmount,
               outputAmount:trade.outputAmount,
           })),
           mixedRoutes:trades
           .filter((trade)=>trade instanceof MixedRouteTrade )
           .map((trade)=>({
               mixedRoute:trade.route,
               inputAmount:trade.inputAmount,
               outputAmount:trade.outputAmount,
           })),
           tradeType:trades[0].tradeType,
        })
   }

const RECEIPTENT ="0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

const main=async()=>{
const signer = await hardhat.ethers.getImpersonatedSigner(RECEIPTENT);
const WETH_USDC_V3= await getPool(WETH , USDC , FeeAmount.MEDIUM);
const inputEther=hardhat.ethers.utils.parseEther("2").toString();

const trade=await V3Trade.fromRoute(
    new Routev3([WETH_USDC_V3] , ETHER , USDC),
    CurrencyAmount.fromRawAmount(ETHER , inputEther),
    TradeType.EXACT_INPUT
);






const route = new Routev3([WETH_USDC_V3], ETHER, USDC);


console.log("pool details");
console.log(WETH_USDC_V3)

console.log("pool");
console.log(route.pools)

console.log("trade");
console.log(trade);




const routerTrade=buildTrade([trade]);
const opts=swapOptions({});

const params=SwapRouter.swapCallParameters(routerTrade , opts);

let ethBalance;
let wethBalance;
let usdcBalance;

ethBalance = await provider.getBalance(RECEIPTENT);
wethBalance = await wethContract.balanceOf(RECEIPTENT);
usdcBalance = await usdcContract.balanceOf(RECEIPTENT);
console.log("-----------------BEFORE");
console.log("EthBalance:", hardhat.ethers.utils.formatUnits(ethBalance , 18));
console.log("wethBalance:", hardhat.ethers.utils.formatUnits(wethBalance , 18));
console.log("usdcBalance:", hardhat.ethers.utils.formatUnits(usdcBalance , 6));

const tx=await signer.sendTransaction({
    data:params.calldata,
    to:"0xEf1c6E67703c7BD7107eed8303Fbe6EC2554BF6B",
    value:params.value,
    from:RECEIPTENT,
});

const receipt=await tx.wait();
console.log("__________________SUCCESS");
console.log("STATUS" , receipt.status);

// console.log(WETH_USDC_V3);
// console.log(trade);
// console.log(routerTrade);
// console.log(opts);
// console.log(params);

ethBalance= await provider.getBalance(RECEIPTENT);
wethBalance= await wethContract.balanceOf(RECEIPTENT);
usdcBalance= await usdcContract.balanceOf(RECEIPTENT);

console.log("-----------------AFTER");
console.log("EthBalance:", hardhat.ethers.utils.formatUnits(ethBalance , 18));
console.log("wethBalance:", hardhat.ethers.utils.formatUnits(wethBalance , 18)); // Line 112
console.log("usdcBalance:", hardhat.ethers.utils.formatUnits(usdcBalance , 6)); // Line 113
}

main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
});








