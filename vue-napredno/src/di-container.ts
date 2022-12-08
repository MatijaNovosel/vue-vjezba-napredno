import { IUserService } from './interfaces/userService';
import { Container } from "inversify";
import "reflect-metadata";
import { IProductService } from "./interfaces/productService";
import ProductService from "./services/product-service";
import UserService from "./services/user-service";

export function getService<T>(symbol: any): T {
  return DIContainer.get<T>(symbol);
}

export class Types {
  static readonly ProductService = Symbol("IProductService");
  static readonly UserService = Symbol("IUserService");
}

const DIContainer = new Container();

DIContainer.bind<IProductService>(Types.ProductService).to(ProductService).inSingletonScope();

DIContainer.bind<IUserService>(Types.UserService).to(UserService).inSingletonScope();

export default DIContainer;
