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
import type { PlayerMatchupStats } from './PlayerMatchupStats';
import {
    PlayerMatchupStatsFromJSON,
    PlayerMatchupStatsFromJSONTyped,
    PlayerMatchupStatsToJSON,
} from './PlayerMatchupStats';
import type { PlayerMatchupScore } from './PlayerMatchupScore';
import {
    PlayerMatchupScoreFromJSON,
    PlayerMatchupScoreFromJSONTyped,
    PlayerMatchupScoreToJSON,
} from './PlayerMatchupScore';

/**
 * 
 * @export
 * @interface PlayerMatchupPlayer
 */
export interface PlayerMatchupPlayer {
    /**
     * 
     * @type {number}
     * @memberof PlayerMatchupPlayer
     */
    readonly id: number;
    /**
     * 
     * @type {string}
     * @memberof PlayerMatchupPlayer
     */
    name: string;
    /**
     * 
     * @type {number}
     * @memberof PlayerMatchupPlayer
     */
    region?: number | null;
    /**
     * Can be anything, but is meant to be the player's online pseudonym.
     * @type {string}
     * @memberof PlayerMatchupPlayer
     */
    alias?: string | null;
    /**
     * 
     * @type {Array<PlayerMatchupScore>}
     * @memberof PlayerMatchupPlayer
     */
    scores: Array<PlayerMatchupScore>;
    /**
     * 
     * @type {PlayerMatchupStats}
     * @memberof PlayerMatchupPlayer
     */
    stats: PlayerMatchupStats;
    /**
     * 
     * @type {number}
     * @memberof PlayerMatchupPlayer
     */
    totalWins: number;
    /**
     * 
     * @type {number}
     * @memberof PlayerMatchupPlayer
     */
    totalTies: number;
}

/**
 * Check if a given object implements the PlayerMatchupPlayer interface.
 */
export function instanceOfPlayerMatchupPlayer(value: object): value is PlayerMatchupPlayer {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('scores' in value) || value['scores'] === undefined) return false;
    if (!('stats' in value) || value['stats'] === undefined) return false;
    if (!('totalWins' in value) || value['totalWins'] === undefined) return false;
    if (!('totalTies' in value) || value['totalTies'] === undefined) return false;
    return true;
}

export function PlayerMatchupPlayerFromJSON(json: any): PlayerMatchupPlayer {
    return PlayerMatchupPlayerFromJSONTyped(json, false);
}

export function PlayerMatchupPlayerFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlayerMatchupPlayer {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'name': json['name'],
        'region': json['region'] == null ? undefined : json['region'],
        'alias': json['alias'] == null ? undefined : json['alias'],
        'scores': ((json['scores'] as Array<any>).map(PlayerMatchupScoreFromJSON)),
        'stats': PlayerMatchupStatsFromJSON(json['stats']),
        'totalWins': json['total_wins'],
        'totalTies': json['total_ties'],
    };
}

export function PlayerMatchupPlayerToJSON(value?: Omit<PlayerMatchupPlayer, 'id'> | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
        'region': value['region'],
        'alias': value['alias'],
        'scores': ((value['scores'] as Array<any>).map(PlayerMatchupScoreToJSON)),
        'stats': PlayerMatchupStatsToJSON(value['stats']),
        'total_wins': value['totalWins'],
        'total_ties': value['totalTies'],
    };
}
