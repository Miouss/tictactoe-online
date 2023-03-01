export const fullSize = {
  width             : "100%",
  height            : "100%",
};

export const size = (width: string, height: string) => ({
    width,
    height,
});

export const flexColumn = {
  display           : "flex",
  flexDirection     : "column" as const,
};

export const flexRow = {
  display           : "flex",
};

export const flexCenter = {
  justifyContent    : "center",
  alignItems        : "center",
};
