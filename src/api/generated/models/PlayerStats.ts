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
import type { CategoryEnum } from './CategoryEnum';
import {
    CategoryEnumFromJSON,
    CategoryEnumFromJSONTyped,
    CategoryEnumToJSON,
} from './CategoryEnum';

/**
 * 
 * @export
 * @interface PlayerStats
 */
export interface PlayerStats {
    /**
     * 
     * @type {number}
     * @memberof PlayerStats
     */
    rank: number;
    /**
     * 
     * @type {PlayerBasic}
     * @memberof PlayerStats
     */
    player: PlayerBasic;
    /**
     * 
     * @type {number}
     * @memberof PlayerStats
     */
    region: number;
    /**
     * 
     * @type {CategoryEnum}
     * @memberof PlayerStats
     */
    category: CategoryEnum;
    /**
     * OFF for course, ON for lap, and null for both
     * @type {boolean}
     * @memberof PlayerStats
     */
    isLap?: boolean | null;
    /**
     * Number of scores qualifying for the category
     * @type {number}
     * @memberof PlayerStats
     */
    scoreCount: number;
    /**
     * Sum of all lowest scores
     * @type {number}
     * @memberof PlayerStats
     */
    totalScore: number;
    /**
     * Sum of the rank of all lowest scores
     * @type {number}
     * @memberof PlayerStats
     */
    totalRank: number;
    /**
     * Sum of the standard of all lowest scores
     * @type {number}
     * @memberof PlayerStats
     */
    totalStandard: number;
    /**
     * Sum of lowest score to record ratios
     * @type {number}
     * @memberof PlayerStats
     */
    totalRecordRatio: number;
    /**
     * Sum of track records
     * @type {number}
     * @memberof PlayerStats
     */
    totalRecords: number;
    /**
     * Sum of leaderboard points
     * @type {number}
     * @memberof PlayerStats
     */
    leaderboardPoints: number;
}



/**
 * Check if a given object implements the PlayerStats interface.
 */
export function instanceOfPlayerStats(value: object): value is PlayerStats {
    if (!('rank' in value) || value['rank'] === undefined) return false;
    if (!('player' in value) || value['player'] === undefined) return false;
    if (!('region' in value) || value['region'] === undefined) return false;
    if (!('category' in value) || value['category'] === undefined) return false;
    if (!('scoreCount' in value) || value['scoreCount'] === undefined) return false;
    if (!('totalScore' in value) || value['totalScore'] === undefined) return false;
    if (!('totalRank' in value) || value['totalRank'] === undefined) return false;
    if (!('totalStandard' in value) || value['totalStandard'] === undefined) return false;
    if (!('totalRecordRatio' in value) || value['totalRecordRatio'] === undefined) return false;
    if (!('totalRecords' in value) || value['totalRecords'] === undefined) return false;
    if (!('leaderboardPoints' in value) || value['leaderboardPoints'] === undefined) return false;
    return true;
}

export function PlayerStatsFromJSON(json: any): PlayerStats {
    return PlayerStatsFromJSONTyped(json, false);
}

export function PlayerStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlayerStats {
    if (json == null) {
        return json;
    }
    return {
        
        'rank': json['rank'],
        'player': PlayerBasicFromJSON(json['player']),
        'region': json['region'],
        'category': CategoryEnumFromJSON(json['category']),
        'isLap': json['is_lap'] == null ? undefined : json['is_lap'],
        'scoreCount': json['score_count'],
        'totalScore': json['total_score'],
        'totalRank': json['total_rank'],
        'totalStandard': json['total_standard'],
        'totalRecordRatio': json['total_record_ratio'],
        'totalRecords': json['total_records'],
        'leaderboardPoints': json['leaderboard_points'],
    };
}

export function PlayerStatsToJSON(value?: PlayerStats | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'rank': value['rank'],
        'player': PlayerBasicToJSON(value['player']),
        'region': value['region'],
        'category': CategoryEnumToJSON(value['category']),
        'is_lap': value['isLap'],
        'score_count': value['scoreCount'],
        'total_score': value['totalScore'],
        'total_rank': value['totalRank'],
        'total_standard': value['totalStandard'],
        'total_record_ratio': value['totalRecordRatio'],
        'total_records': value['totalRecords'],
        'leaderboard_points': value['leaderboardPoints'],
    };
}

