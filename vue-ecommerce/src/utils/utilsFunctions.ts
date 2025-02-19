import { AppNames } from "../constants"
import { arrayCategoryType, arrayCurrencyType, arrayInventoryStatusType, currencyType, type ProductDTO } from "../dto/ProductDTO"
import type { StoreDTO } from "../dto/StoreDTO"
import type { CartItemDTO } from "../dto/CartItem"
import { Decimal } from "decimal.js"

export const getCurrentApp = (pathName: string): AppNames | undefined => {
    if (pathName.startsWith("/stores")) {
        return AppNames.FORMS
    }
    else if (pathName.startsWith("/finance")) {
        return AppNames.FINANCE
    }
    else if (pathName.startsWith("/shop")) {
        return AppNames.SHOP
    }
    return undefined;
}

export interface PathData {
    storeName: string | undefined, productName: string | undefined,
    storeId: number | undefined, productId: number | undefined,
    inStores: boolean, inProducts: boolean
}

interface Input {
    styleOverride?: string;
    title: string;
}
export interface InputFormProps extends Input {
    helpText?: string;
    formControl: any;
    required?: boolean;
}
export interface InputTextFormProps extends InputFormProps {
    numberOfLines: number;
}
export interface ButtonProps extends Input {
    functionToDo: () => void;
    id?: string;
}

export interface InputSwitchFormProps extends InputFormProps {
    options: string[];
}

interface NavigationInputsProps extends Input {
    currentPage: number;
    totalPages: number;
    handlerCurrentPage: (page: number) => void;
}

interface MinusPlusInputInterface extends Input {
    modifyValue: (quantity: number) => void;
    id: string;
    value: number;

}

export function getPaginatedItems(array: any[], pageIndex: number, itemsPerPage: number) {
    if (itemsPerPage < 0 || pageIndex < 0) {
        return [];
    }
    const startIndex = pageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return array.slice(startIndex, endIndex);
}

export function calculateTotalPages(totalItems: number, itemsPerPage: number) {
    if (itemsPerPage <= 0) {
        return Math.ceil(totalItems / 10);
    }
    return Math.ceil(totalItems / itemsPerPage);
}


export function productAccordingToTheFilter(product: ProductDTO, text: string, storeId: number | undefined): boolean {
    const textLower = text.toLowerCase();
    return (textLower === "" || product.name.toLowerCase().includes(textLower) || product.description.toLowerCase().includes(textLower)) && (product.storeId === storeId || storeId === undefined);
}

export const getInitialCategoryMap = () => {
    const initialMap = new Map<string, boolean>();
    arrayCategoryType.forEach(item => initialMap.set(item, false));
    return initialMap;
}

export function filterStores(stores: StoreDTO[], text: string): StoreDTO[] {
    const textLower = text.toLowerCase();
    return stores.filter(store =>
        store.name.toLowerCase().includes(textLower) ||
        store.address.city.toLowerCase().includes(textLower) ||
        store.address.zipCode.includes(textLower)
    );
}

export function getQuantityOfProductInCartShop(cartShopList: CartItemDTO[], idOfProduct: number): number {
    let indexOfProduct = cartShopList.findIndex((cartItem) => cartItem.id === idOfProduct)
    return indexOfProduct !== -1 ? cartShopList[indexOfProduct].quantity : 0;
}

export function getTotalPriceCart(cartShopMap: Map<number,CartItemDTO>): string {
    let totalSum =new Decimal(0);
    cartShopMap.forEach((currentValue)=>{
        const currencyIndex = getCurrencyIndexOfACartItem(currentValue);
        totalSum=totalSum.plus(new Decimal(currentValue.price)
        .times(currencyIndex)
        .times(currentValue.quantity));
    });
 
    return formatPrice(totalSum.toNumber());
}

export function getCurrencyIndexOfACartItem(cartItem: CartItemDTO) {
    if (cartItem.currency === currencyType.STERLING) {
        return new Decimal(1.19);
    }
    else if (cartItem.currency === currencyType.DOLLAR) {
        return new Decimal(0.92);
    }
    else {
        return new Decimal(1);
    }
}
export function formatPrice(number: number): string {
    return number.toLocaleString('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
}

export function formatInputNumber(number: number): string {
    return number.toLocaleString('fr-FR', {
        maximumFractionDigits: 0,
    });
}

export function getTotalProductsElements(cartShopList: CartItemDTO[]): number {
    let totalElements = cartShopList.reduce((accumulator, currentValue) => {
        return currentValue.quantity + accumulator;
    }, 0);
    return totalElements;
}

//local methods 
export function getNextId(array: { id: number }[]) {

    let i = 1;
    while (i <= array.length + 1 && array.some((element) => { return element.id === i })) {
        i++;
    }
    return i;
}

export function joinArrayWithComma(arr: string[]): string {
    return arr.join(',');
}


export function productVerificationRestrictFields(productDTO: ProductDTO): boolean {
    let category = productDTO.category;
    let inventoryStatus = productDTO.inventoryStatus;
    let currency = productDTO.currency;
    if (!arrayCategoryType.includes(category)) {
        return false;
    }
    if (!arrayCurrencyType.includes(currency)) {
        return false;
    }
    if (!arrayInventoryStatusType.includes(inventoryStatus)) {
        return false;
    }
    return true;
}

export interface PathData {
    storeName: string | undefined, productName: string | undefined,
    storeId: number | undefined, productId: number | undefined,
    inStores: boolean, inProducts: boolean
}

export function formatString(input: string): string {
    if (input.length === 0) {
        return "";
    }

    let result = input[0].toUpperCase();

    for (let i = 1; i < input.length; i++) {
        const char = input[i];
        if (char >= 'A' && char <= 'Z') {
            result += ' ' + char.toLowerCase();
        } else {
            result += char;
        }
    }

    return result;
}

export function productDTOtoCartItemDTO(product: ProductDTO,cartShopList:CartItemDTO[]): CartItemDTO {
    let quantityInCart: number = cartShopList ? getQuantityOfProductInCartShop(cartShopList, product.id) : 0;
    let cartItem: CartItemDTO = { quantity: quantityInCart, name: product.name, price: product.price, id: product.id, description: product.description, imageUrl: product.imageUrl, currency: product.currency }
    return cartItem;
  }