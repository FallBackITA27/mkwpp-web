import Deferred from "../widgets/Deferred";
import { useApi } from "../../hooks";
import { BlogPostModule } from "../widgets";
import DiscordEmbed from "../widgets/DiscordEmbed";
import ExpandableModule from "../widgets/ExpandableModule";
import { I18nContext, translate } from "../../utils/i18n/i18n";
import { useContext } from "react";
import CupsList from "../widgets/CupsList";
import RecentTimes from "../widgets/RecentTimes";
import { BlogPost } from "../../api";

const HomePage = () => {
  const { lang } = useContext(I18nContext);
  const { isLoading: blogPostsLoading, data: posts } = useApi(
    () => BlogPost.getList(4),
    [],
    "blogPosts",
  );

  return (
    <>
      <div className="home-page-grid">
        <div style={{ flex: 2, minWidth: "250px" }}>
          <Deferred isWaiting={blogPostsLoading}>
            {posts?.map((post) => <BlogPostModule post={post} />)}
          </Deferred>
        </div>
        <div style={{ flex: 1 }}>
          <DiscordEmbed />
          <RecentTimes defaultLimit={30} />
        </div>
        <ExpandableModule heading={translate("homePageRecentTrackListPart", lang)}>
          <div className="module-content">
            <CupsList />
          </div>
        </ExpandableModule>
        <ExpandableModule heading={translate("homePageWelcomeHeading", lang)}>
          <div className="module-content home-page-welcome-module">
            <img
              src="/mkw/bigbannertop.png"
              alt="banner"
              style={{ userSelect: "none", aspectRatio: "977/288", width: "100%" }}
            />
            <div>
              <p>
                {translate("homePageWelcomeParagraph1", lang)}{" "}
                {translate("homePageWelcomeParagraph2", lang)}{" "}
                {translate("homePageWelcomeParagraph3", lang)}{" "}
                {translate("homePageWelcomeParagraph4", lang)}{" "}
                {translate("homePageWelcomeParagraph5", lang)}{" "}
                {translate("homePageWelcomeParagraph6", lang)}
              </p>
            </div>
          </div>
        </ExpandableModule>
      </div>
    </>
  );
};

export default HomePage;
