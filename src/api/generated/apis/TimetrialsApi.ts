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


import * as runtime from '../runtime';
import type {
  Player,
  PlayerBasic,
  PlayerStats,
  Region,
  Score,
  ScoreWithPlayer,
  StandardLevel,
  Track,
  TrackCup,
} from '../models/index';
import {
    PlayerFromJSON,
    PlayerToJSON,
    PlayerBasicFromJSON,
    PlayerBasicToJSON,
    PlayerStatsFromJSON,
    PlayerStatsToJSON,
    RegionFromJSON,
    RegionToJSON,
    ScoreFromJSON,
    ScoreToJSON,
    ScoreWithPlayerFromJSON,
    ScoreWithPlayerToJSON,
    StandardLevelFromJSON,
    StandardLevelToJSON,
    TrackFromJSON,
    TrackToJSON,
    TrackCupFromJSON,
    TrackCupToJSON,
} from '../models/index';

export interface TimetrialsPlayersRetrieveRequest {
    id: number;
}

export interface TimetrialsPlayersScoresListRequest {
    category: TimetrialsPlayersScoresListCategoryEnum;
    id: number;
    isLap?: boolean;
}

export interface TimetrialsPlayersStatsListRequest {
    category: TimetrialsPlayersStatsListCategoryEnum;
    id: number;
    isLap?: boolean;
}

export interface TimetrialsRankingsListRequest {
    category: TimetrialsRankingsListCategoryEnum;
    metric: Array<TimetrialsRankingsListMetricEnum>;
    isLap?: boolean;
}

export interface TimetrialsRecordsListRequest {
    category: TimetrialsRecordsListCategoryEnum;
    isLap?: boolean;
}

export interface TimetrialsStandardsListRequest {
    isLegacy?: boolean;
}

export interface TimetrialsTracksScoresListRequest {
    category: TimetrialsTracksScoresListCategoryEnum;
    id: number;
    isLap?: boolean;
}

/**
 * 
 */
export class TimetrialsApi extends runtime.BaseAPI {

    /**
     */
    async timetrialsCupsListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<TrackCup>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/timetrials/cups/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TrackCupFromJSON));
    }

    /**
     */
    async timetrialsCupsList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<TrackCup>> {
        const response = await this.timetrialsCupsListRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async timetrialsPlayersListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PlayerBasic>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/timetrials/players/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PlayerBasicFromJSON));
    }

    /**
     */
    async timetrialsPlayersList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PlayerBasic>> {
        const response = await this.timetrialsPlayersListRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async timetrialsPlayersRetrieveRaw(requestParameters: TimetrialsPlayersRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Player>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling timetrialsPlayersRetrieve().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/timetrials/players/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayerFromJSON(jsonValue));
    }

    /**
     */
    async timetrialsPlayersRetrieve(requestParameters: TimetrialsPlayersRetrieveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Player> {
        const response = await this.timetrialsPlayersRetrieveRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async timetrialsPlayersScoresListRaw(requestParameters: TimetrialsPlayersScoresListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Score>>> {
        if (requestParameters['category'] == null) {
            throw new runtime.RequiredError(
                'category',
                'Required parameter "category" was null or undefined when calling timetrialsPlayersScoresList().'
            );
        }

        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling timetrialsPlayersScoresList().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['category'] != null) {
            queryParameters['category'] = requestParameters['category'];
        }

        if (requestParameters['isLap'] != null) {
            queryParameters['is_lap'] = requestParameters['isLap'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/timetrials/players/{id}/scores/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ScoreFromJSON));
    }

    /**
     */
    async timetrialsPlayersScoresList(requestParameters: TimetrialsPlayersScoresListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Score>> {
        const response = await this.timetrialsPlayersScoresListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async timetrialsPlayersStatsListRaw(requestParameters: TimetrialsPlayersStatsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PlayerStats>>> {
        if (requestParameters['category'] == null) {
            throw new runtime.RequiredError(
                'category',
                'Required parameter "category" was null or undefined when calling timetrialsPlayersStatsList().'
            );
        }

        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling timetrialsPlayersStatsList().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['category'] != null) {
            queryParameters['category'] = requestParameters['category'];
        }

        if (requestParameters['isLap'] != null) {
            queryParameters['is_lap'] = requestParameters['isLap'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/timetrials/players/{id}/stats/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PlayerStatsFromJSON));
    }

    /**
     */
    async timetrialsPlayersStatsList(requestParameters: TimetrialsPlayersStatsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PlayerStats>> {
        const response = await this.timetrialsPlayersStatsListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async timetrialsRankingsListRaw(requestParameters: TimetrialsRankingsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PlayerStats>>> {
        if (requestParameters['category'] == null) {
            throw new runtime.RequiredError(
                'category',
                'Required parameter "category" was null or undefined when calling timetrialsRankingsList().'
            );
        }

        if (requestParameters['metric'] == null) {
            throw new runtime.RequiredError(
                'metric',
                'Required parameter "metric" was null or undefined when calling timetrialsRankingsList().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['category'] != null) {
            queryParameters['category'] = requestParameters['category'];
        }

        if (requestParameters['isLap'] != null) {
            queryParameters['is_lap'] = requestParameters['isLap'];
        }

        if (requestParameters['metric'] != null) {
            queryParameters['metric'] = requestParameters['metric']!.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/timetrials/rankings/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PlayerStatsFromJSON));
    }

    /**
     */
    async timetrialsRankingsList(requestParameters: TimetrialsRankingsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PlayerStats>> {
        const response = await this.timetrialsRankingsListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async timetrialsRecordsListRaw(requestParameters: TimetrialsRecordsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ScoreWithPlayer>>> {
        if (requestParameters['category'] == null) {
            throw new runtime.RequiredError(
                'category',
                'Required parameter "category" was null or undefined when calling timetrialsRecordsList().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['category'] != null) {
            queryParameters['category'] = requestParameters['category'];
        }

        if (requestParameters['isLap'] != null) {
            queryParameters['is_lap'] = requestParameters['isLap'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/timetrials/records/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ScoreWithPlayerFromJSON));
    }

    /**
     */
    async timetrialsRecordsList(requestParameters: TimetrialsRecordsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ScoreWithPlayer>> {
        const response = await this.timetrialsRecordsListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async timetrialsRegionsListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Region>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/timetrials/regions/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(RegionFromJSON));
    }

    /**
     */
    async timetrialsRegionsList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Region>> {
        const response = await this.timetrialsRegionsListRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async timetrialsStandardsListRaw(requestParameters: TimetrialsStandardsListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<StandardLevel>>> {
        const queryParameters: any = {};

        if (requestParameters['isLegacy'] != null) {
            queryParameters['is_legacy'] = requestParameters['isLegacy'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/timetrials/standards/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(StandardLevelFromJSON));
    }

    /**
     */
    async timetrialsStandardsList(requestParameters: TimetrialsStandardsListRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<StandardLevel>> {
        const response = await this.timetrialsStandardsListRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async timetrialsTracksListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Track>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/timetrials/tracks/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TrackFromJSON));
    }

    /**
     */
    async timetrialsTracksList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Track>> {
        const response = await this.timetrialsTracksListRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async timetrialsTracksScoresListRaw(requestParameters: TimetrialsTracksScoresListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<ScoreWithPlayer>>> {
        if (requestParameters['category'] == null) {
            throw new runtime.RequiredError(
                'category',
                'Required parameter "category" was null or undefined when calling timetrialsTracksScoresList().'
            );
        }

        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling timetrialsTracksScoresList().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['category'] != null) {
            queryParameters['category'] = requestParameters['category'];
        }

        if (requestParameters['isLap'] != null) {
            queryParameters['is_lap'] = requestParameters['isLap'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/api/timetrials/tracks/{id}/scores/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(ScoreWithPlayerFromJSON));
    }

    /**
     */
    async timetrialsTracksScoresList(requestParameters: TimetrialsTracksScoresListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<ScoreWithPlayer>> {
        const response = await this.timetrialsTracksScoresListRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const TimetrialsPlayersScoresListCategoryEnum = {
    NonShortcut: 'nonsc',
    Shortcut: 'sc',
    Unrestricted: 'unres'
} as const;
export type TimetrialsPlayersScoresListCategoryEnum = typeof TimetrialsPlayersScoresListCategoryEnum[keyof typeof TimetrialsPlayersScoresListCategoryEnum];
/**
 * @export
 */
export const TimetrialsPlayersStatsListCategoryEnum = {
    NonShortcut: 'nonsc',
    Shortcut: 'sc',
    Unrestricted: 'unres'
} as const;
export type TimetrialsPlayersStatsListCategoryEnum = typeof TimetrialsPlayersStatsListCategoryEnum[keyof typeof TimetrialsPlayersStatsListCategoryEnum];
/**
 * @export
 */
export const TimetrialsRankingsListCategoryEnum = {
    NonShortcut: 'nonsc',
    Shortcut: 'sc',
    Unrestricted: 'unres'
} as const;
export type TimetrialsRankingsListCategoryEnum = typeof TimetrialsRankingsListCategoryEnum[keyof typeof TimetrialsRankingsListCategoryEnum];
/**
 * @export
 */
export const TimetrialsRankingsListMetricEnum = {
    AverageFinish: 'average_finish',
    AverageStandard: 'average_standard',
    TotalScore: 'total_score'
} as const;
export type TimetrialsRankingsListMetricEnum = typeof TimetrialsRankingsListMetricEnum[keyof typeof TimetrialsRankingsListMetricEnum];
/**
 * @export
 */
export const TimetrialsRecordsListCategoryEnum = {
    NonShortcut: 'nonsc',
    Shortcut: 'sc',
    Unrestricted: 'unres'
} as const;
export type TimetrialsRecordsListCategoryEnum = typeof TimetrialsRecordsListCategoryEnum[keyof typeof TimetrialsRecordsListCategoryEnum];
/**
 * @export
 */
export const TimetrialsTracksScoresListCategoryEnum = {
    NonShortcut: 'nonsc',
    Shortcut: 'sc',
    Unrestricted: 'unres'
} as const;
export type TimetrialsTracksScoresListCategoryEnum = typeof TimetrialsTracksScoresListCategoryEnum[keyof typeof TimetrialsTracksScoresListCategoryEnum];
