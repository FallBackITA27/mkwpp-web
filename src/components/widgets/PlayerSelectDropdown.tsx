import { useContext } from "react";
import { useApi } from "../../hooks";
import { PlayerBasic } from "../../api";
import { I18nContext, translate } from "../../utils/i18n/i18n";
import { MetadataContext } from "../../utils/Metadata";
import Dropdown, { DropdownItemSetDataChild } from "./Dropdown";
import { FormContext } from "./Form";
import { FlagIcon } from "./Icon";

export interface PlayerSelectDropdownProps {
  setId: React.Dispatch<React.SetStateAction<number>>;
  id: number;
  restrictSet?: number[];
  blacklist?: boolean;
  disabled?: boolean;
  hideNoneValue?: boolean;
}

const PlayerSelectDropdown = ({
  id,
  setId,
  restrictSet,
  blacklist,
  disabled,
  hideNoneValue = true,
}: PlayerSelectDropdownProps) => {
  const { data: players } = useApi(() => PlayerBasic.getPlayerList(), [], "playerData");
  const metadata = useContext(MetadataContext);
  const { lang } = useContext(I18nContext);
  const defaultValue: DropdownItemSetDataChild = {
    type: "DropdownItemData",
    hidden: hideNoneValue,
    autodeleteText: true,
    element: { text: translate("matchupPageDefaultValue", lang), value: 0 },
  };

  return (
    <Dropdown
      data={{
        type: "TextInput",
        defaultItemSet: 0,
        value: id,
        valueSetter: setId,
        disabled: disabled,
        data: [
          {
            id: 0,
            children: [
              ...((players
                ?.filter((player) =>
                  restrictSet !== undefined
                    ? blacklist
                      ? !restrictSet.includes(player.id)
                      : restrictSet.includes(player.id)
                    : true,
                )
                .sort((a, b) => ((a.alias ?? a.name) < (b.alias ?? b.name) ? -1 : 1))
                .map((player) => {
                  return {
                    type: "DropdownItemData",
                    element: {
                      text: player.alias ?? player.name,
                      value: player.id,
                      rightIcon: (
                        <FlagIcon
                          region={metadata.getRegionById(
                            player.regionId === 1 ? 0 : player.regionId,
                          )}
                        />
                      ),
                    },
                  };
                }) as DropdownItemSetDataChild[]) ?? []),
              defaultValue,
            ],
          },
        ],
      }}
    />
  );
};

export interface PlayerSelectDropdownFieldProps {
  restrictSet?: number[];
  blacklist?: boolean;
  disabled?: boolean;
  /** Name of the state property to manage */
  field: string;
  /** Field label */
  label: string;
  hideNoneValue?: boolean;
}

export const PlayerSelectDropdownField = ({
  restrictSet,
  blacklist,
  field,
  label,
  disabled,
  hideNoneValue = true,
}: PlayerSelectDropdownFieldProps) => {
  const { getValue, setValue, disabled: disabledByForm } = useContext(FormContext);

  return (
    <div className="field">
      <p>{label}</p>
      <PlayerSelectDropdown
        restrictSet={restrictSet}
        blacklist={blacklist}
        id={getValue(field)}
        setId={(id) => {
          setValue(field, id);
        }}
        disabled={disabledByForm || !!disabled}
        hideNoneValue={hideNoneValue}
      />
    </div>
  );
};

export default PlayerSelectDropdown;
