const vh = Math.max(
  document.documentElement.clientHeight || 0,
  window.innerHeight || 0
);

export const styles = {
  btn: {
    width: {
      xs: "100%",
      xl: "25%",
    },
    lineHeight: 1.2,
    height: 50,
    letterSpacing: 1,
  },
  btn_outlined: {
    width: {
      xs: "100%",
      xl: "25%",
    },
    lineHeight: 1,
    height: 50,
    backgroundColor: "white",
  },
  box: {
    p: 3,
    width: {
      xs: "100%",
      sm: "800px",
      xl: "1500px",
    },
    // backgroundColor: "red",
  },
  stack: {
    display: "flex",
    flexDirection: {
      xs: "column",
      xl: "row",
    },
    gap: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  options__box: {
    textAlign: "center",
    position: {
      xs: "absolute",
      sm: "absolute",
    },
    top: {
      xs: vh < 700 ? "0%" : "50%",
      sm: "50%",
    },
    left: {
      xs: "50%",
      sm: "50%",
    },
    transform: {
      xs: "translate(-50%, 0%)",
      sm: "translate(-50%, -50%)",
    },
    width: "min(90%, 700px)",
    bgcolor: "background.paper",
    border: "1px solid #bdbdbd",
    boxShadow: 24,
    p: 2,
  },
  modal: {
    height: "100%",
    width: "100%",
    p: 0,
    overflow: "auto",
  },
  options__stack_cancelIcon: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
  options_title: {
    color: "#1976d2",
    fontFamily: "sans-serif",
    fontWeight: "400",
    fontSize: "1.3rem",
    justifyContent: "center",
    mb: 0,
  },
  divider: {
    mt: 2,
    mb: 0.8,
  },
  divider_first: {
    mt: 1.5,
    mb: 0.8,
  },
  start_title: {
    fontSize: {
      xs: 40,
      sm: 80,
      xl: 120,
    },
    fontWeight: "400",
    mt: 1.6,
  },
  title_top: {
    position: "relative",
    top: -5,
    mb: 1,
  },
};
