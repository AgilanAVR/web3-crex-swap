//shortening the address
export const ShortAddress=(address)=>{
    return `${address?.slice(0,6)}....${address?.slice(address.length - 4 , address.length)}`
}

export const ParseErrorMsg=()=>{
    const json=JSON.parse(JSON.stringify(e));
    return json.reason || json?.error?.message;
}