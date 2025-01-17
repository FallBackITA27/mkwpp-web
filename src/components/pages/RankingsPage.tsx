import { useContext, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import Deferred from "../widgets/Deferred";
import api from "../../api";
import { PlayerStats, TimetrialsRankingsListMetricEnum as MetricEnum } from "../../api/generated";
import { useApi } from "../../hooks";
import { formatTime } from "../../utils/Formatters";
import { UserContext } from "../../utils/User";
import { getCategorySiteHue } from "../../utils/EnumUtils";
import OverwriteColor from "../widgets/OverwriteColor";
import RegionSelectionDropdown from "../widgets/RegionDropdown";
import {
  useCategoryParam,
  useLapModeParam,
  useRegionParam,
  useRowHighlightParam,
} from "../../utils/SearchParams";
import { I18nContext, translate, TranslationKey } from "../../utils/i18n/i18n";
import { SettingsContext } from "../../utils/Settings";
import PlayerMention from "../widgets/PlayerMention";
import { CategoryRadio } from "../widgets/CategorySelect";
import { LapModeRadio } from "../widgets/LapModeSelect";
import { useInfiniteScroll } from "../../hooks/ScrollHook";

export interface RankingsMetric {
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  metric: MetricEnum;
  metricOrder: number;
  getHighlightValue: (player: PlayerStats) => number;
  getValueString: (player: PlayerStats) => string;
}

export type RankingsMetricMap = {
  [key: string]: RankingsMetric;
};

export const RankingsMetrics: RankingsMetricMap = {
  AverageFinish: {
    titleKey: "rankingsPageAverageFinishTitle",
    descriptionKey: "rankingsPageAverageFinishDescription",
    metric: "total_rank",
    metricOrder: +1,
    getHighlightValue: (stats) =>
      +(stats.totalRank / (stats.isLap === undefined ? 64 : 32)).toFixed(4),
    getValueString: (stats) => String(stats.totalRank / (stats.isLap === undefined ? 64 : 32)),
  },
  AverageStandard: {
    titleKey: "rankingsPageAverageStandardTitle",
    descriptionKey: "rankingsPageAverageStandardDescription",
    metric: "total_standard",
    metricOrder: +1,
    getHighlightValue: (stats) =>
      +(stats.totalStandard / (stats.isLap === undefined ? 64 : 32)).toFixed(4),
    getValueString: (stats) => String(stats.totalStandard / (stats.isLap === undefined ? 64 : 32)),
  },
  AverageRecordRatio: {
    titleKey: "rankingsPageAverageRecordRatioTitle",
    descriptionKey: "rankingsPageAverageRecordRatioDescription",
    metric: "total_record_ratio",
    metricOrder: -1,
    getHighlightValue: (stats) =>
      +((stats.totalRecordRatio / (stats.isLap === undefined ? 64 : 32)) * 100).toFixed(4),
    getValueString: (stats) =>
      ((stats.totalRecordRatio / (stats.isLap === undefined ? 64 : 32)) * 100).toFixed(4) + "%",
  },
  TotalTime: {
    titleKey: "rankingsPageTotalTimeTitle",
    descriptionKey: "rankingsPageTotalTimeDescription",
    metric: "total_score",
    metricOrder: +1,
    getHighlightValue: (stats) => stats.totalScore,
    getValueString: (stats) => formatTime(stats.totalScore),
  },
  TallyPoints: {
    titleKey: "rankingsPageTallyPointsTitle",
    descriptionKey: "rankingsPageTallyPointsDescription",
    metric: "leaderboard_points",
    metricOrder: -1,
    getHighlightValue: (stats) => stats.leaderboardPoints,
    getValueString: (stats) => String(stats.leaderboardPoints),
  },
};

export interface RankingsProps {
  metric: RankingsMetric;
}

const RankingsPage = ({ metric }: RankingsProps) => {
  const searchParams = useSearchParams();
  const { category, setCategory } = useCategoryParam(searchParams, ["hl"]);
  const { lapMode, setLapMode } = useLapModeParam(searchParams, false, ["hl"]);
  const { region, setRegion } = useRegionParam(searchParams);
  const highlight = useRowHighlightParam(searchParams).highlight;

  const { lang } = useContext(I18nContext);
  const { user } = useContext(UserContext);
  const { settings } = useContext(SettingsContext);

  const { isLoading, data: rankings } = useApi(
    () =>
      api.timetrialsRankingsList({
        category,
        lapMode,
        region: region.id,
        metric: metric.metric,
      }),
    [category, lapMode, region],
    "playerRankings",
  );

  const highlightElement = useRef(null);
  useEffect(() => {
    if (highlightElement !== null) {
      (highlightElement.current as unknown as HTMLDivElement)?.scrollIntoView({
        inline: "center",
        block: "center",
      });
    }
  }, [highlightElement, isLoading]);

  const [sliceStart, sliceEnd, tbodyElement] = useInfiniteScroll(35, rankings?.length ?? 0, [
    isLoading,
  ]);

  const siteHue = getCategorySiteHue(category, settings);

  return (
    <>
      <h1>{translate(metric.titleKey, lang)}</h1>
      <p>{translate(metric.descriptionKey, lang)}</p>
      <OverwriteColor hue={siteHue}>
        <div className="module-row wrap">
          <CategoryRadio value={category} onChange={setCategory} />
          <LapModeRadio includeOverall value={lapMode} onChange={setLapMode} />
          <RegionSelectionDropdown
            onePlayerMin={false}
            twoPlayerMin={false}
            ranked={true}
            value={region}
            setValue={setRegion}
          />
        </div>
        <div className="module">
          <Deferred isWaiting={isLoading}>
            <table>
              <thead>
                <tr>
                  <th>{translate("rankingsPageRankCol", lang)}</th>
                  <th>{translate("rankingsPagePlayerCol", lang)}</th>
                  <th>{translate(metric.titleKey, lang)}</th>
                </tr>
              </thead>
              <tbody ref={tbodyElement} className="table-hover-rows">
                {rankings?.map((stats, idx, arr) => {
                  if (idx < sliceStart || idx >= sliceEnd) return <></>;
                  return (
                    <>
                      {highlight &&
                      ((metric.metricOrder < 0 &&
                        metric.getHighlightValue(stats) < highlight &&
                        (arr[idx - 1] === undefined ||
                          metric.getHighlightValue(arr[idx - 1]) > highlight)) ||
                        (metric.metricOrder > 0 &&
                          metric.getHighlightValue(stats) > highlight &&
                          (arr[idx - 1] === undefined ||
                            metric.getHighlightValue(arr[idx - 1]) < highlight))) ? (
                        <>
                          <tr ref={highlightElement} key={highlight} className="highlighted">
                            <td />
                            <td>{translate("genericRankingsYourHighlightedValue", lang)}</td>
                            <td>
                              {metric.metric === "total_record_ratio"
                                ? highlight.toFixed(4) + "%"
                                : metric.metric === "total_score"
                                  ? formatTime(highlight)
                                  : highlight}
                            </td>
                          </tr>
                        </>
                      ) : (
                        <></>
                      )}
                      <tr
                        key={stats.player.id}
                        className={
                          stats.player.id === user?.player ||
                          metric.getHighlightValue(stats) === highlight
                            ? "highlighted"
                            : ""
                        }
                        ref={
                          metric.getHighlightValue(stats) === highlight
                            ? highlightElement
                            : undefined
                        }
                      >
                        <td>{stats.rank}</td>
                        <td>
                          <PlayerMention
                            precalcPlayer={stats.player}
                            precalcRegionId={stats.player.region ?? undefined}
                            xxFlag={true}
                            showRegFlagRegardless={
                              region.type === "country" ||
                              region.type === "subnational" ||
                              region.type === "subnational_group"
                            }
                          />
                        </td>
                        <td>{metric.getValueString(stats)}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </Deferred>
        </div>
      </OverwriteColor>
    </>
  );
};

export default RankingsPage;
