import { CustomerReqDTO } from "./CustomerReqDTO";

export interface OrderModelDTO{
    id? : number | null,
    customer : CustomerReqDTO,
    products : number[],
    status : "pending"|"confirmed"|""

}