export interface ProductsSoldPerMonthQueryResponse{
  month: string,
  productSales: ProductSalesDto[]
}

export interface ProductSalesDto{
  name: string,
  total: number
}
