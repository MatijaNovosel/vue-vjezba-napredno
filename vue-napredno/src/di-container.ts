import { IOrderService } from './interfaces/Iorder-service';
import { IUserService } from './interfaces/iuser-service';
import { Container } from "inversify";
import "reflect-metadata";
import { IProductService } from "./interfaces/iproduct-service";
import ProductService from "./services/product-service";
import UserService from "./services/user-service";
import OrderService from './services/order-service';

export function getService<T>(symbol: any): T {
  return DIContainer.get<T>(symbol);
}

export class Types {
  static readonly ProductService = Symbol("IProductService");
  static readonly UserService = Symbol("IUserService");
  static readonly OrderService = Symbol("IOrderService");
}

const DIContainer = new Container();

DIContainer.bind<IProductService>(Types.ProductService).to(ProductService).inSingletonScope();

DIContainer.bind<IUserService>(Types.UserService).to(UserService).inSingletonScope();

DIContainer.bind<IOrderService>(Types.OrderService).to(OrderService).inSingletonScope();

export default DIContainer;
