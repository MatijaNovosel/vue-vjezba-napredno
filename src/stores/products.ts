import { defineStore } from "pinia";
import { ref } from "vue";
import { Category, IProduct, IProductsResponse } from "../models/productModels";
import { ProductService } from "../services/productService";

export const useProductStore = defineStore("products", () => {
  const products = ref<IProductsResponse[]>([]);
  const categories = ref<Category[]>([]);
  const productsLoaded = ref(false);
  const service = new ProductService();

  const loadProducts = async (
    pageSize: number,
    pageNumber: number,
    hardrefresh = false
  ) => {
    if (hardrefresh || !productsLoaded.value) {
      productsLoaded.value = true;
      products.value = await service.getPaginatedProductsAsync(
        pageSize,
        pageNumber
      );
    }
  };

  const getBestsellingProducts = async () => {
    products.value = await service.getBestsellingProductsAsync();
  };

  const getSales = async () => {
    return await service.getSalesByMonth();
  };

  const getProductById = async (id: string) => {
    return await service.getProductByIdAsync(id);
  };

  const createProduct = async (newProduct: IProduct) => {
    await service.createProductAsync(newProduct);
  };

  const updateProduct = async (newProduct: IProduct) => {
    if (newProduct.id != 0) {
      await service.updateProductAsync(newProduct);
    }
  };

  const deleteProduct = async (id: number) => {
    if (id != 0) {
      await service.deleteProductAsync(id);
    }
  };
  const getAllCategories = async () => {
    categories.value = await service.GetAllProductCategories();
  };

  return {
    products,
    service,
    categories,
    loadProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getSales,
    getBestsellingProducts,
    getAllCategories
  };
});
