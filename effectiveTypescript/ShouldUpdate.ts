interface ScatterProps {
  xs: number[];
  ys: number[];
  xRange: [number, number];
  yRange: [number, number];
  color: string;
  onClick: (x: number, y: number, index: number) => void;
}

function shouldUpdateBad(
  oldProps: ScatterProps,
  newProps: ScatterProps
): boolean {
  return (
    oldProps.xs !== newProps.xs ||
    oldProps.ys !== newProps.ys ||
    oldProps.xRange !== newProps.xRange ||
    oldProps.yRange !== newProps.yRange ||
    oldProps.color !== newProps.color
  );
  // If we ever add props to ScatterProps this function needs to be updated
}

const REQUIRES_UPDATES: { [k in keyof ScatterProps]: boolean } = {
  xs: true,
  ys: true,
  xRange: true,
  yRange: true,
  color: true,
  onClick: false,
};

function shouldUpdateGood(
  oldProps: ScatterProps,
  newProps: ScatterProps
): boolean {
  let k: keyof ScatterProps;
  for (k in oldProps) {
    if (oldProps[k] !== newProps[k] && REQUIRES_UPDATES[k]) {
      return true;
    }
  }
  return false;
}
