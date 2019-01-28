/**
 * gateway API
 * gateway API documentation
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { OrderForm } from './orderForm';
import { Product } from './product';
import { Specs } from './specs';


/**
 * The 订单详情. @author A true hipster
 */
export interface OrderDetails { 
    count?: number;
    id?: number;
    orderCart?: OrderForm;
    product?: Product;
    specs?: Specs;
}
