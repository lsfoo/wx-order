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
import { Store } from './store';


/**
 * The 会员. @author A true hipster
 */
export interface Vip { 
    /**
     * 余额
     */
    balance?: number;
    custom?: Customer;
    id?: number;
    /**
     * 积分
     */
    integral?: number;
    shore?: Store;
}
