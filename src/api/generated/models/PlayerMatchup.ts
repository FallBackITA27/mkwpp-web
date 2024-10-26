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
import type { PlayerMatchupPlayer } from './PlayerMatchupPlayer';
import {
    PlayerMatchupPlayerFromJSON,
    PlayerMatchupPlayerFromJSONTyped,
    PlayerMatchupPlayerToJSON,
} from './PlayerMatchupPlayer';

/**
 * 
 * @export
 * @interface PlayerMatchup
 */
export interface PlayerMatchup {
    /**
     * 
     * @type {PlayerMatchupPlayer}
     * @memberof PlayerMatchup
     */
    p1: PlayerMatchupPlayer;
    /**
     * 
     * @type {PlayerMatchupPlayer}
     * @memberof PlayerMatchup
     */
    p2: PlayerMatchupPlayer;
}

/**
 * Check if a given object implements the PlayerMatchup interface.
 */
export function instanceOfPlayerMatchup(value: object): value is PlayerMatchup {
    if (!('p1' in value) || value['p1'] === undefined) return false;
    if (!('p2' in value) || value['p2'] === undefined) return false;
    return true;
}

export function PlayerMatchupFromJSON(json: any): PlayerMatchup {
    return PlayerMatchupFromJSONTyped(json, false);
}

export function PlayerMatchupFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlayerMatchup {
    if (json == null) {
        return json;
    }
    return {
        
        'p1': PlayerMatchupPlayerFromJSON(json['p1']),
        'p2': PlayerMatchupPlayerFromJSON(json['p2']),
    };
}

export function PlayerMatchupToJSON(value?: PlayerMatchup | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'p1': PlayerMatchupPlayerToJSON(value['p1']),
        'p2': PlayerMatchupPlayerToJSON(value['p2']),
    };
}

