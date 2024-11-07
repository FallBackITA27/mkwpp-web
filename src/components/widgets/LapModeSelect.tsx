import { useContext } from "react";
import { I18nContext } from "../../utils/i18n/i18n";
import Dropdown, { DropdownData, DropdownItemSetDataChild } from "./Dropdown";

import { FormContext } from "./Form";

export enum LapModeEnum {
  Course = "course",
  Lap = "lap",
  Overall = "overall",
}

export interface LapModeSelectProps {
  /** Whether to include Overall as an option. Defaults to false if not defined. */
  includeOverall?: boolean;
  /** The currently selected option. If included, the value for Overall is `undefined`. */
  value: LapModeEnum;
  /** Callback to invoke when user attempts to select a new lap mode */
  onChange: (lapMode: LapModeEnum) => void;
  /** Whether this element is disabled */
  disabled?: boolean;
}

const LapModeSelect = ({ includeOverall, value, onChange, disabled }: LapModeSelectProps) => {
  disabled = !!disabled;
  const { translations, lang } = useContext(I18nContext);

  const options = [
    ...(includeOverall ? [LapModeEnum.Overall] : []),
    LapModeEnum.Course,
    LapModeEnum.Lap,
  ];

  return (
    <Dropdown
      data={
        {
          type: "Normal",
          value: value,
          valueSetter: onChange,
          disabled: disabled,
          defaultItemSet: 0,
          data: [
            {
              id: 0,
              children: options.map((option) => {
                return {
                  type: "DropdownItemData",
                  element: {
                    text:
                      option === LapModeEnum.Overall
                        ? translations.constantLapModeOverall[lang]
                        : option === LapModeEnum.Course
                          ? translations.constantLapModeCourse[lang]
                          : translations.constantLapModeLap[lang],
                    value: option,
                  },
                } as DropdownItemSetDataChild;
              }),
            },
          ],
        } as DropdownData
      }
    />
  );
};

export interface LapModeFieldProps {
  /** Categories to include in select element. Default to all categories if not defined. */
  includeOverall?: boolean;
  /** Name of the state property to manage */
  field: string;
  /** Field label */
  label: string;
}

export const LapModeField = ({ includeOverall, field, label }: LapModeFieldProps) => {
  const { getValue, setValue, disabled } = useContext(FormContext);

  return (
    <div className="field">
      <p>{label}</p>
      <LapModeSelect
        includeOverall={includeOverall}
        value={getValue(field) as LapModeEnum}
        onChange={(lapMode) => {
          setValue(field, lapMode);
        }}
        disabled={disabled}
      />
    </div>
  );
};

export default LapModeSelect;
