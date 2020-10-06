interface GlobalState {
  userId: string;
  pageTitle: string;
  pageContents: string;
  recentFiles: string[];
}

interface TopNavState {
  userId: GlobalState["userId"];
  pageTitle: GlobalState["pageTitle"];
  recentFiles: GlobalState["recentFiles"];
}

// or use a mapped type

type BetterTopNavState = {
  [k in "userId" | "pageTitle" | "recentFiles"]: GlobalState[k];
};

// or use Pick

type BestTopNavState = Pick<
  GlobalState,
  "userId" | "pageTitle" | "recentFiles"
>;
