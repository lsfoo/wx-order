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
import { Product } from './product';
import { Specs } from './specs';


/**
 * The 单位. @author A true hipster
 */
export interface Unit { 
    id?: number;
    name?: string;
    products?: Array<Product>;
    specs?: Array<Specs>;
}
