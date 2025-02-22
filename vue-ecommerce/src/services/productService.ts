import axios from 'axios';
import { currentProducts } from '../LocalData/Products';
import { currentStores } from '../LocalData/Stores';
import { calculateTotalPages, getNextId, getPaginatedItems, joinArrayWithComma, productAccordingToTheFilter, productVerificationRestrictFields } from '../utils/utilsFunctions';
import { inventoryStatusType, type ProductDTO } from '@/dto/ProductDTO';
import type { StoreDTO } from '@/dto/StoreDTO';


const url = import.meta.env.VITE_APP_URL_API ?? "";

export const getProductsPublicUrl = async (categories: string[], pageIndex: number, elementsPerPage: number, textFilter: string, storeId?: number): Promise<{ totalPages: number, products: ProductDTO[] }> => {
    if ( import.meta.env.VITE_APP_ENV === "test") {
        const productsFiltered = currentProducts.filter((product) => {
            return (categories.includes(product.category) || categories.length === 0) && product.inventoryStatus !== inventoryStatusType.OUTOFSTOCK && productAccordingToTheFilter(product, textFilter, storeId)
        });
        return {
            products: getPaginatedItems(productsFiltered, pageIndex - 1, elementsPerPage), totalPages: calculateTotalPages(productsFiltered.length, elementsPerPage)
        }
    }
    try {
        const categoriesQuery = joinArrayWithComma(categories);
        const resp = await axios.get(url + "/products?categories=" + categoriesQuery + "&page=" + pageIndex + "&pagelength=" + elementsPerPage + "&textfilter=" + textFilter +
            (storeId ? "&storeid=" + storeId : ""));
        return resp.data;
    } catch (err) {
        throw err;
    }
};

export const getProductsWithstore = async (storeId: number): Promise<{ store: StoreDTO, products: ProductDTO[] }> => {
    if (import.meta.env.VITE_APP_ENV === "test") {
        const store: StoreDTO | undefined = currentStores.find((store) => { return store.id === storeId });
        if (store) {
            const filterProducts = currentProducts.filter((product) => product.storeId === storeId);
            return { store: store, products: filterProducts };
        }
        else {
            throw new Error('store not found!');
        }
    }
    try {
        const resp = await axios.get(url + "/stores/" + storeId + "/products");
        return resp.data;
    } catch (err) {
        throw err;
    }
};

export const getProductByIdWithstore = async (storeId: number, productId: number): Promise<{ store: StoreDTO, product: ProductDTO }> => {
    if (import.meta.env.VITE_APP_ENV === "test") {
        const store: StoreDTO | undefined = currentStores.find((store) => { return store.id === storeId });
        if (store) {
            const filterProducts = currentProducts.filter((product) => { return product.storeId === storeId && product.id === productId })
            if (filterProducts.length > 0)
                return { store: store, product: filterProducts[0] };
            else {
                throw new Error('product not found!');
            }
        }
        else {
            throw new Error('store not found!');
        }
    }
    try {
        const resp = await axios.get(url + "/stores/" + storeId + "/products/" + productId);
        return resp.data;
    } catch (err) {
        throw err;
    }
};

export const updateProductById = async (storeId: number, productId: number, updateData: ProductDTO): Promise<ProductDTO> => {
    if (import.meta.env.VITE_APP_ENV === "test") {
        const id: number = currentProducts.findIndex((product) => { return product.id === productId && product.storeId === storeId });
        if (id !== -1) {
            currentProducts[id] = updateData;
            return Promise.resolve(currentProducts[id]);
        }
        else {
            throw new Error('product not found!');
        }
    }

    try {
        const resp = await axios.patch(url + "/products/" + productId + "/", updateData);
        return resp.data;
    } catch (err) {
        throw err;
    }
};

export const deleteProductById = async (storeId: number, productId: number): Promise<ProductDTO> => {
    if (import.meta.env.VITE_APP_ENV === "test") {
        const id: number = currentProducts.findIndex((product) => { return product.id === productId && product.storeId === storeId });
        if (id !== -1) {
            const productDeleted = currentProducts[id];
            currentProducts.splice(id, 1)
            return Promise.resolve(productDeleted);
        }
        else {
            throw new Error('product not found!');
        }
    }

    try {
        const resp = await axios.delete(url +"/products/" + productId);
        return resp.data;
    } catch (err) {
        throw err;
    }
};

export const createProductById = async (storeId: number, data: ProductDTO): Promise<ProductDTO> => {
    if (import.meta.env.VITE_APP_ENV === "test") {
        let productToset = data;
        productToset.id = getNextId(currentProducts)
        productToset.storeId = storeId;
        currentProducts.push(data);
        if(!productVerificationRestrictFields(data)){
            return Promise.reject("format is not correct");
        }

        return Promise.resolve(data);
    }

    try {
        const resp = await axios.post(url + "/products/", data);
        return resp.data;
    } catch (err) {
        throw err;
    }
};
