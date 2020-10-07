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

// tagged unions

interface VideoCut {
  kind: "video";
}

interface TextCut {
  kind: "text";
}

type Cut = VideoCut | TextCut;
type CutKind = Cut["kind"]; // "video" | "text"

type GlobalStateKeys = keyof GlobalState; // "userId" | "pageTitle" | "recentFiles" | "pageContents"

function getUserInfo(userId: string) {
  // ...
  return {
    userId,
    name,
    age,
    height,
    weight,
  };
}

type UserInfo = ReturnType<typeof getUserInfo>;
