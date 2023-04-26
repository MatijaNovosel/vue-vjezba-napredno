import { IProduct, IProductsResponse } from "@/models/productModels";
import { IToken } from "@/models/userModels";
import router from "@/router/routes";
import { ProductService } from "@/services/productService";
import { ROUTE_NAMES } from "@/utils/constants";
import { defineStore } from "pinia";
import { reactive } from "vue";

const LOCAL_STORAGE_KEY = "products";

export const useProductStore = defineStore("products", () => {
  const state = reactive<{ products: IProductsResponse[] }>({
    products: []
  });

  const tokenJson = localStorage.getItem("token");
  const token: IToken | null = tokenJson ? JSON.parse(tokenJson) : null;
  const service = token ? new ProductService(token) : null;
  if (!token || !service) {
    router.push(ROUTE_NAMES.LOGIN);
  }

  const loadProductsFromLocalStorage = () => {
    const products = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (products) {
      state.products = JSON.parse(products);
    }
  };

  const saveProductToLocalStorage = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.products));
  };

  const getAllProducts = async (pageSize: number, pageNumber: number) => {
    loadProductsFromLocalStorage();

    if (!state.products.length) {
      state.products = await service!.getAllProductsAsync(pageSize, pageNumber);

      saveProductToLocalStorage();

      return state.products;
    }
  };

  const getProductById = async (id: string) => {
    const product = await service!.getProductByIdAsync(id);
    return product;
  };

  const createProduct = async (newProduct: IProduct) => {
    await service!.createProductAsync(newProduct);
  };

  const updateProduct = async (newProduct: IProduct) => {
    if (newProduct.id != 0) {
      await service!.createProductAsync(newProduct);
    }
  };

  const deleteProduct = async (id: string) => {
    if (id != "0") {
      await service!.deleteProductAsync(id);
    }
  };

  return {
    state,
    getAllProducts,
    getProductById,
    saveProductToLocalStorage,
    createProduct,
    updateProduct,
    deleteProduct
  };
});
