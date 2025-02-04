import { ProductdetailDTO } from "./ProductdetailDTO";

export interface InventoryDTO{
    inventoryId? : number|null,
    productId : ProductdetailDTO,
    stockQuantity : number,
    reorderLevel : number,
    supplierName : string,
    lastStockDate? : string|null,
    location : string,
    unitPrice : number,
    totalValue? : number|null,
    isActive? : boolean
    


}