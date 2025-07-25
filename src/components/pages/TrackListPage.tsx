import { useContext } from "react";

import { I18nContext, translate } from "../../utils/i18n/i18n";
import CupsList from "../widgets/CupsList";
import RecentTimes from "../widgets/RecentTimes";

const TrackListPage = () => {
  const { lang } = useContext(I18nContext);

  return (
    <>
      <h1>{translate("trackListPageHeading", lang)}</h1>
      <CupsList />
      <RecentTimes canChangeLimit />
    </>
  );
};

export default TrackListPage;
