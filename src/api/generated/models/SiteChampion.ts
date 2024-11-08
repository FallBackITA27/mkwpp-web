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
import type { Player } from './Player';
import {
    PlayerFromJSON,
    PlayerFromJSONTyped,
    PlayerToJSON,
} from './Player';
import type { CategoryEnum } from './CategoryEnum';
import {
    CategoryEnumFromJSON,
    CategoryEnumFromJSONTyped,
    CategoryEnumToJSON,
} from './CategoryEnum';

/**
 * 
 * @export
 * @interface SiteChampion
 */
export interface SiteChampion {
    /**
     * 
     * @type {number}
     * @memberof SiteChampion
     */
    readonly id: number;
    /**
     * 
     * @type {CategoryEnum}
     * @memberof SiteChampion
     */
    category: CategoryEnum;
    /**
     * 
     * @type {Date}
     * @memberof SiteChampion
     */
    dateInstated?: Date;
    /**
     * 
     * @type {Player}
     * @memberof SiteChampion
     */
    player: Player;
}



/**
 * Check if a given object implements the SiteChampion interface.
 */
export function instanceOfSiteChampion(value: object): value is SiteChampion {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('category' in value) || value['category'] === undefined) return false;
    if (!('player' in value) || value['player'] === undefined) return false;
    return true;
}

export function SiteChampionFromJSON(json: any): SiteChampion {
    return SiteChampionFromJSONTyped(json, false);
}

export function SiteChampionFromJSONTyped(json: any, ignoreDiscriminator: boolean): SiteChampion {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'category': CategoryEnumFromJSON(json['category']),
        'dateInstated': json['date_instated'] == null ? undefined : (new Date(json['date_instated'])),
        'player': PlayerFromJSON(json['player']),
    };
}

export function SiteChampionToJSON(value?: Omit<SiteChampion, 'id'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'category': CategoryEnumToJSON(value['category']),
        'date_instated': value['dateInstated'] == null ? undefined : ((value['dateInstated']).toISOString()),
        'player': PlayerToJSON(value['player']),
    };
}
