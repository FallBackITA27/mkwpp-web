/* tslint:disable */
/* eslint-disable */
/**
 * Mario Kart Wii Players\' Page API
 * The brains of the Mario Kart Wii Players\' Page.
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { PlayerBasic } from './PlayerBasic';
import {
    PlayerBasicFromJSON,
    PlayerBasicFromJSONTyped,
    PlayerBasicToJSON,
} from './PlayerBasic';

/**
 * 
 * @export
 * @interface UserWithPlayer
 */
export interface UserWithPlayer {
    /**
     * 
     * @type {number}
     * @memberof UserWithPlayer
     */
    readonly id: number;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     * @type {string}
     * @memberof UserWithPlayer
     */
    username: string;
    /**
     * 
     * @type {PlayerBasic}
     * @memberof UserWithPlayer
     */
    readonly player: PlayerBasic;
}

/**
 * Check if a given object implements the UserWithPlayer interface.
 */
export function instanceOfUserWithPlayer(value: object): value is UserWithPlayer {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('username' in value) || value['username'] === undefined) return false;
    if (!('player' in value) || value['player'] === undefined) return false;
    return true;
}

export function UserWithPlayerFromJSON(json: any): UserWithPlayer {
    return UserWithPlayerFromJSONTyped(json, false);
}

export function UserWithPlayerFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserWithPlayer {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'username': json['username'],
        'player': PlayerBasicFromJSON(json['player']),
    };
}

export function UserWithPlayerToJSON(value?: Omit<UserWithPlayer, 'id'|'player'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'username': value['username'],
    };
}
