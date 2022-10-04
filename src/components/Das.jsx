import {ActionList,AppProvider,Button,ContextualSaveBar,Frame,Loading,Navigation,Page,Toast,TopBar,} from "@shopify/polaris";
import {HomeMajor,} from "@shopify/polaris-icons";
import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GridDataTable from "./GridDataTable";


function Das() {
  const defaultState = useRef({emailFieldValue: "devyadav3001@gmail.com",nameFieldValue: "React Js",});
  const [toastActive, setToastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [nameFieldValue, setNameFieldValue] = useState(defaultState.current.nameFieldValue);
  const [emailFieldValue, setEmailFieldValue] = useState(defaultState.current.emailFieldValue);
  const [storeName, setStoreName] = useState(defaultState.current.nameFieldValue);
  const skipToContentRef = useRef(null);
  let navigate = useNavigate();
  const handleDiscard = useCallback(() => {
    setEmailFieldValue(defaultState.current.emailFieldValue);
    setNameFieldValue(defaultState.current.nameFieldValue);
    setIsDirty(false);
  }, []);
  const handleSave = useCallback(() => {
    defaultState.current.nameFieldValue = nameFieldValue;
    defaultState.current.emailFieldValue = emailFieldValue;
    setIsDirty(false);
    setToastActive(true);
    setStoreName(defaultState.current.nameFieldValue);
  }, [emailFieldValue, nameFieldValue]);
  const handleSearchResultsDismiss = useCallback(() => {
    setSearchActive(false);
    setSearchValue("");
  }, []);
  const handleSearchFieldChange = useCallback((value) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);
  const toggleToastActive = useCallback(
    () => setToastActive((toastActive) => !toastActive),
    []
  );
  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    []
  );
  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );
  const toggleIsLoading = useCallback(
    () => setIsLoading((isLoading) => !isLoading),
    []
  );
 

  const toastMarkup = toastActive ? (
    <Toast onDismiss={toggleToastActive} content="Changes saved" />
  ) : null;

  const userMenuActions = [
    {
      items: [{ content: "Community forums" }],
    },
  ];

  const contextualSaveBarMarkup = isDirty ? (
    <ContextualSaveBar
      message="Unsaved changes"
      saveAction={{
        onAction: handleSave,
      }}
      discardAction={{
        onAction: handleDiscard,
      }}
    />
  ) : null;

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={userMenuActions}
      name="Devendra"
      detail={storeName}
      initials="D"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const searchResultsMarkup = (
    <ActionList
      items={[
        { content: "Shopify help center" },
        { content: "Community forums" },
      ]}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchResultsVisible={searchActive}
      searchField={searchFieldMarkup}
      searchResults={searchResultsMarkup}
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation>
      <Button
        onClick={() => navigate("/:login", { replace: true, state: false })}
      >
        Go Back Home
      </Button>
      <Navigation.Section
        separator
        title="Dashboard App"
        items={[
          {
            label: "Dashboard",
            icon: HomeMajor,
            onClick: toggleIsLoading,
          },
        ]}
      
      />
    </Navigation>
  );

  const loadingMarkup = isLoading ? <Loading /> : null;

  const skipToContentTarget = (
    <a id="SkipToContentTarget" ref={skipToContentRef} tabIndex={-1} />
  );
 
  const actualPageMarkup = <GridDataTable />;

  const loadingPageMarkup = (
   
    <Page title="Click on Dashboard then show The data"></Page>
   
  );

  const pageMarkup = isLoading ? actualPageMarkup : actualPageMarkup;

 

  const logo = {
    width: 124,
    topBarSource:
      "https://d3vlhkqyz4y38a.cloudfront.net/skin/frontend/cedcomnew/default/images/header/logo/ced-logo-web.svg",
    contextualSaveBarSource:
      "https://d3vlhkqyz4y38a.cloudfront.net/skin/frontend/cedcomnew/default/images/header/logo/ced-logo-web.svg",
    url: "http://jadedpixel.com",
    accessibilityLabel: "Cedcommerce",
  };

  return (
    <div style={{ height: "500px" }}>
      <AppProvider
        i18n={{
          Polaris: {
            Avatar: {
              label: "Avatar",
              labelWithInitials: "Avatar with initials {initials}",
            },
            ContextualSaveBar: {
              save: "Save",
              discard: "Discard",
            },
            TextField: {
              characterCount: "{count} characters",
            },
            TopBar: {
              toggleMenuLabel: "Toggle menu",

              SearchField: {
                clearButtonLabel: "Clear",
                search: "Search",
              },
            },
            Modal: {
              iFrameTitle: "body markup",
            },
            Frame: {
              skipToContent: "Skip to content",
              navigationLabel: "Navigation",
              Navigation: {
                closeMobileNavigationLabel: "Close navigation",
              },
            },
          },
        }}
      >
        <Frame
          logo={logo}
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
          skipToContentTarget={skipToContentRef.current}
        >
          {contextualSaveBarMarkup}
          {loadingMarkup}
          {pageMarkup}
          {toastMarkup}
        </Frame>
      </AppProvider>
    </div>
  );
}

export default Das;
