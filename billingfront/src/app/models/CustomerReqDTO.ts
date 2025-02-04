export interface CustomerReqDTO{
    id? : number | null,
    customerName? : string | null,
    mobileNumber : string,
    email? : string |null,
    ordersList? : number[] | null   

}