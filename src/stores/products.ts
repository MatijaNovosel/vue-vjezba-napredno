import { IProduct, IProductsResponse } from "@/models/productModels";
import { ProductService } from "@/services/productService";
import { defineStore } from "pinia";
import { reactive } from "vue";

const LOCAL_STORAGE_KEY = "products";

export const useProductStore = defineStore("products", () => {
  const state = reactive<{ products: IProductsResponse[] }>({
    products: []
  });

  const service = new ProductService();

  const loadProductsFromLocalStorage = () => {
    const products = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (products) {
      state.products = JSON.parse(products);
    }
  };

  const saveProductToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.products));
  };

  const getPaginatedProducts = async (pageSize: number, pageNumber: number) => {
    loadProductsFromLocalStorage();
    if (!state.products.length) {
      state.products = await service.getAllProductsAsync(pageSize, pageNumber);
      saveProductToLocalStorage();
      return state.products;
    }
  };

  const getProductById = async (id: string) => {
    const product = await service.getProductByIdAsync(id);
    return product;
  };

  const createProduct = async (newProduct: IProduct) => {
    await service.createProductAsync(newProduct);
  };

  const updateProduct = async (newProduct: IProduct) => {
    if (newProduct.id != 0) {
      await service.createProductAsync(newProduct);
    }
  };

  const deleteProduct = async (id: string) => {
    if (id != "0") {
      await service.deleteProductAsync(id);
    }
  };

  return {
    state,
    getAllProducts: getPaginatedProducts,
    getProductById,
    saveProductToLocalStorage,
    createProduct,
    updateProduct,
    deleteProduct
  };
});
