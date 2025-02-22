import { type StoreDTO } from "./StoreDTO";

export interface ProductDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    inventoryStatus: string;
    category: string;
    storeId: number;
    currency: string;
}
export interface ProductListDTO {
    products: ProductDTO[];
    totalPages: number;
}
export interface ProductListDTOwithStoreDTO {
    productListDTO: ProductListDTO;
    store: StoreDTO;
}
export interface ProductWithStore {
    product: ProductDTO;
    store: StoreDTO;
}
export const productKeysToNotDisplayInDetails = ["id", "storeId"]

export const CategoryType = {
    Accessories: 'Accessories',
    Fitness: 'Fitness',
    Electronics: 'Electronics',
    Clothing: 'Clothing'
};

export const inventoryStatusType = {
    INSTOCK: 'INSTOCK',
    LOWSTOCK: 'LOWSTOCK',
    OUTOFSTOCK: 'OUTOFSTOCK'
};

export const currencyType = {
    EUR: '€',
    DOLLAR: '$',
    STERLING: '£'
};

export const arrayCategoryType = Object.values(CategoryType)

export const arrayInventoryStatusType = Object.values(inventoryStatusType)

export const arrayCurrencyType = Object.values(currencyType)