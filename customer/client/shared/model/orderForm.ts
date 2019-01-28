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
import { Customer } from './customer';
import { Desk } from './desk';
import { OrderDetails } from './orderDetails';
import { Store } from './store';


/**
 * The 订单. @author A true hipster
 */
export interface OrderForm { 
    customer?: Customer;
    desk?: Desk;
    id?: number;
    orderDetails?: Array<OrderDetails>;
    store?: Store;
    totalMoney?: number;
}
