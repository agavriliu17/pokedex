export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          background: "#f2f2f2",
          lowStat: "rgb(253 165 164)",
          mediumStat: "rgb(253 250 165)",
          highStat: "#ABFEA3",
          loading: "#D3D3D3",
        }
      : {
          // palette values for dark mode
          background: "#1c2128",
          lowStat: "#DB817E",
          mediumStat: "#ECE892",
          highStat: "#78C86A",
          loading: "#434549",
        }),
  },
});
