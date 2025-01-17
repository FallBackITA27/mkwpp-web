import { useContext } from "react";

import Deferred from "../widgets/Deferred";
import api from "../../api";
import { useApi } from "../../hooks/ApiHook";
import { MetadataContext } from "../../utils/Metadata";
import { UserContext } from "../../utils/User";
import { PlayerBasic } from "../../api";
import { useState } from "react";
import { I18nContext, translate, translateRegionNameFull } from "../../utils/i18n/i18n";
import PlayerMention from "../widgets/PlayerMention";
import { useInfiniteScroll } from "../../hooks/ScrollHook";

interface PlayerForFilter extends PlayerBasic {
  simplifiedName: string;
  simplifiedAlias: string;
}

interface PlayerListRowProp {
  player: PlayerForFilter;
  playerFilter: string;
}
const PlayerListRow = ({ player, playerFilter }: PlayerListRowProp) => {
  const metadata = useContext(MetadataContext);
  const { lang } = useContext(I18nContext);
  const { user } = useContext(UserContext);
  const regionNameFull = translateRegionNameFull(metadata, lang, player.region);

  return (
    <tr className={user && player.id === user.player ? "highlighted" : ""}>
      <td>
        <PlayerMention
          precalcPlayer={player}
          precalcRegionId={player.region ?? undefined}
          xxFlag={true}
        />
      </td>
      <td>{regionNameFull}</td>
    </tr>
  );
};

const PlayerListPage = () => {
  const { isLoading, data: players } = useApi(
    () =>
      api.timetrialsPlayersList().then((arr) =>
        (
          arr.map((r) => {
            (r as PlayerForFilter).simplifiedName = r.name.toLowerCase().normalize("NFKD");
            (r as PlayerForFilter).simplifiedAlias = (r.alias ?? r.name)
              .toLowerCase()
              .normalize("NFKD");
            return r;
          }) as PlayerForFilter[]
        ).sort((a, b) => (a.simplifiedAlias > b.simplifiedAlias ? 1 : -1)),
      ),
    [],
    "playerList",
  );
  const { lang } = useContext(I18nContext);
  const metadata = useContext(MetadataContext);

  const [playerFilter, setPlayerFilter] = useState("");

  const [sliceStart, sliceEnd, tbodyElement] = useInfiniteScroll(35, players?.length ?? 0, [
    isLoading,
  ]);

  return (
    <>
      <h1>{translate("playerListPageHeading", lang)}</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 1fr",
          gridGap: "5px",
        }}
      >
        <input
          id="filterText"
          type="text"
          className="module"
          onKeyDown={(e) => {
            if (e.key === "Enter") document.getElementById("searchBtn")?.click();
          }}
        />
        <button
          style={{
            borderRadius: 0,
          }}
          id="searchBtn"
          className="module"
          onClick={(e) => {
            setPlayerFilter(
              (document.getElementById("filterText") as HTMLInputElement).value
                .toLowerCase()
                .normalize("NFKD"),
            );
          }}
        >
          {translate("playerListPageSearchBtn", lang)}
        </button>
      </div>
      <div className="module player-list">
        <Deferred isWaiting={isLoading}>
          <table>
            <thead>
              <tr>
                <th>{translate("playerListPageNameCol", lang)}</th>
                <th>{translate("playerListPageLocationCol", lang)}</th>
              </tr>
            </thead>
            <tbody ref={tbodyElement} className="table-hover-rows">
              {players
                ?.filter((player) => {
                  const regionNameFull = translateRegionNameFull(metadata, lang, player.region);

                  return (
                    playerFilter === "" ||
                    (player as PlayerForFilter).simplifiedName.includes(playerFilter) ||
                    (player as PlayerForFilter).simplifiedAlias.includes(playerFilter) ||
                    regionNameFull.toLowerCase().normalize("NFKD").includes(playerFilter)
                  );
                })
                .map((player, idx) => {
                  if (idx < sliceStart || idx >= sliceEnd) return <></>;
                  return (
                    <PlayerListRow key={player.id} player={player} playerFilter={playerFilter} />
                  );
                })}
            </tbody>
          </table>
        </Deferred>
      </div>
    </>
  );
};

export default PlayerListPage;
