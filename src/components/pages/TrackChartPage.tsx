import { useContext, useEffect, useRef } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";

import { Pages, resolvePage } from "./Pages";
import Deferred from "../widgets/Deferred";
import { Icon, Tooltip } from "../widgets";
import api from "../../api";
import { CategoryEnum, TimetrialsTracksScoresListLapModeEnum } from "../../api/generated";
import { useApi } from "../../hooks";
import { formatTime } from "../../utils/Formatters";
import { getStandardLevel, MetadataContext } from "../../utils/Metadata";
import { integerOr } from "../../utils/Numbers";
import { UserContext } from "../../utils/User";
import { getCategorySiteHue, getHighestValid } from "../../utils/EnumUtils";
import OverwriteColor from "../widgets/OverwriteColor";
import RegionSelectionDropdown from "../widgets/RegionDropdown";
import {
  useCategoryParam,
  useLapModeParam,
  useRegionParam,
  useRowHighlightParam,
} from "../../utils/SearchParams";
import { LapModeEnum, LapModeRadio } from "../widgets/LapModeSelect";
import { I18nContext, translate, translateTrack } from "../../utils/i18n/i18n";
import { SettingsContext } from "../../utils/Settings";
import PlayerMention from "../widgets/PlayerMention";
import { CategoryRadio } from "../widgets/CategorySelect";
import ArrayTable, { ArrayTableCellData, ArrayTableData } from "../widgets/Table";
import FormatDateDependable from "../widgets/VariedDate";

const TrackChartPage = () => {
  const { id: idStr } = useParams();
  const id = Math.max(integerOr(idStr, 0), 0);

  const { user } = useContext(UserContext);

  const searchParams = useSearchParams();
  const { category, setCategory } = useCategoryParam(searchParams, ["hl"]);
  const { lapMode, setLapMode } = useLapModeParam(searchParams, true, ["hl"]);
  const { region, setRegion } = useRegionParam(searchParams);
  const highlight = useRowHighlightParam(searchParams).highlight;

  const metadata = useContext(MetadataContext);
  const { settings } = useContext(SettingsContext);
  const { lang } = useContext(I18nContext);

  let track,
    prevTrack,
    nextTrack = undefined;
  for (const t of metadata.tracks ?? []) {
    if (t.id === id) track = t;
    if (t.id === id - 1) prevTrack = t;
    if (t.id === id + 1) nextTrack = t;
  }

  const queryParamsBaseForRedirect = {
    reg: region.id !== 1 ? region.code.toLowerCase() : null,
    lap: lapMode !== LapModeEnum.Course ? lapMode : null,
  };
  const prevTrackCat = getHighestValid(category, prevTrack?.categories ?? []);
  const nextTrackCat = getHighestValid(category, nextTrack?.categories ?? []);

  const { isLoading, data: scores } = useApi(
    () =>
      api.timetrialsTracksScoresList({
        id,
        category,
        lapMode: lapMode as TimetrialsTracksScoresListLapModeEnum,
        region: region.id,
      }),

    [category, lapMode, region, id, metadata.isLoading],
    "trackCharts",
    [{ variable: metadata.regions.length, defaultValue: 1 }],
  );

  const tableArray: ArrayTableCellData[][] = [];
  const tableData: ArrayTableData = {
    iconCellColumns: [-1, -2, -3],
    classNames: [],
    infiniteScrollData: { padding: 45, extraDependencies: [isLoading] },
    rowKeys: [],
  };
  let hasHighlightRow = false;

  scores?.forEach((score, idx, arr) => {
    if (
      highlight &&
      score.value > highlight &&
      (arr[idx - 1] === undefined || arr[idx - 1].value < highlight)
    ) {
      hasHighlightRow = true;
      tableData.classNames?.push({
        rowIdx: idx,
        className: "highlighted",
      });
      tableData.rowKeys?.push("highlight");
      tableArray.push([
        { content: null },
        { content: translate("genericRankingsYourHighlightedValue", lang) },
        { content: formatTime(highlight) },
        { content: null },
        { content: null },
        { content: null },
        { content: null },
        { content: null },
      ]);
    }

    if (user?.player === score.player.id || score.value === highlight)
      tableData.classNames?.push({
        rowIdx: idx + (hasHighlightRow ? 0 : 1),
        className: "highlighted",
      });

    tableData.rowKeys?.push(`${score.rank}-${score.value}`);
    tableArray.push([
      { content: score.rank },
      {
        content: (
          <PlayerMention
            precalcPlayer={score.player}
            precalcRegionId={score.player.region ?? undefined}
            xxFlag={true}
            showRegFlagRegardless={
              region.type === "country" ||
              region.type === "subnational" ||
              region.type === "subnational_group"
            }
          />
        ),
      },
      {
        content: formatTime(score.value),
        className: score.category !== category ? "fallthrough" : undefined,
      },
      { content: getStandardLevel(metadata, score.standard)?.name },
      {
        content: score.date ? (
          <FormatDateDependable
            date={score.date}
            smallClass={"track-chart-page-s1"}
            bigClass={"track-chart-page-b1"}
          />
        ) : (
          "-"
        ),
      },
      {
        content: score?.videoLink && (
          <a href={score.videoLink} target="_blank" rel="noopener noreferrer">
            <Icon icon="Video" />
          </a>
        ),
      },
      {
        content: score?.ghostLink && (
          <a href={score.ghostLink} target="_blank" rel="noopener noreferrer">
            <Icon icon="Ghost" />
          </a>
        ),
      },
      {
        content: score?.comment && (
          <Tooltip text={score.comment}>
            <Icon icon="Comment" />
          </Tooltip>
        ),
      },
    ]);
  });

  const highlightElement = useRef(null);
  useEffect(() => {
    if (highlightElement !== null) {
      (highlightElement.current as unknown as HTMLDivElement)?.scrollIntoView({
        inline: "center",
        block: "center",
      });
    }
  }, [highlightElement, isLoading, metadata.isLoading]);

  const siteHue = getCategorySiteHue(category, settings);

  return (
    <>
      {/* Redirect to courses list if id is invalid or does not exist. */}
      {metadata.tracks && !track && <Navigate to={resolvePage(Pages.TrackList)} />}
      <Link to={resolvePage(Pages.TrackList)}>
        {translate("trackChartPageTrackListButton", lang)}
      </Link>
      <div className="module-row nobr track-chart-page-track-div">
        <div className="track-chart-page-track-div-back">
          {prevTrack !== undefined ? (
            <Link
              to={resolvePage(
                Pages.TrackChart,
                { id: prevTrack.id },
                {
                  ...queryParamsBaseForRedirect,
                  cat: prevTrackCat !== CategoryEnum.NonShortcut ? prevTrackCat : null,
                },
              )}
            >
              <span className="b1">{"« " + translateTrack(prevTrack, lang)}</span>
              <span className="s1">{"« " + prevTrack.abbr}</span>
            </Link>
          ) : (
            <></>
          )}
        </div>
        <h1 className="track-chart-page-track-div-current">{translateTrack(track, lang)}</h1>
        <div className="track-chart-page-track-div-next">
          {nextTrack !== undefined ? (
            <Link
              to={resolvePage(
                Pages.TrackChart,
                { id: nextTrack.id },
                {
                  ...queryParamsBaseForRedirect,
                  cat: nextTrackCat !== CategoryEnum.NonShortcut ? nextTrackCat : null,
                },
              )}
            >
              <span className="b1">{translateTrack(nextTrack, lang) + " »"}</span>
              <span className="s1">{nextTrack.abbr + " »"}</span>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
      <OverwriteColor hue={siteHue}>
        <div className="module-row wrap">
          <CategoryRadio options={track?.categories} value={category} onChange={setCategory} />
          <LapModeRadio value={lapMode} onChange={setLapMode} />
          <RegionSelectionDropdown
            onePlayerMin={true}
            twoPlayerMin={true}
            ranked={false}
            value={region}
            setValue={setRegion}
          />
        </div>
        <div className="module">
          <Deferred isWaiting={metadata.isLoading || isLoading}>
            <ArrayTable
              rows={tableArray}
              headerRows={[
                [
                  { content: translate("trackChartPageRankCol", lang) },
                  { content: translate("trackChartPagePlayerCol", lang) },
                  { content: translate("trackChartPageTimeCol", lang) },
                  { content: translate("trackChartPageStandardCol", lang) },
                  { content: translate("trackChartPageDateCol", lang) },
                  { content: null },
                  { content: null },
                  { content: null },
                ],
              ]}
              tableData={tableData}
            />
          </Deferred>
        </div>
      </OverwriteColor>
    </>
  );
};

export default TrackChartPage;
