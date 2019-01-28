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
import { Category } from './category';
import { Specs } from './specs';
import { Store } from './store';
import { Unit } from './unit';


/**
 * The 商品. @author A true hipster
 */
export interface Product { 
    category?: Category;
    description?: string;
    id?: number;
    name?: string;
    specs?: Array<Specs>;
    store?: Store;
    thumbnail?: string;
    unit?: Unit;
}
