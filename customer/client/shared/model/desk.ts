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
import { Store } from './store';


/**
 * The 桌号. @author A true hipster
 */
export interface Desk { 
    id?: number;
    name?: string;
    /**
     * fieldName
     */
    no?: number;
    store?: Store;
}
