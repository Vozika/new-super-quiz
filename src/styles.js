export const styles = {
  btn: {
    width: {
      xs: "100%",
      xl: "25%",
    },
    lineHeight: 1,
    height: 40,
  },
  box: {
    margin: 1,
    width: {
      xs: "100%",
      sm: 800,
      xl: 1500,
    },
    backgroundColor: "white",
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
      xs: "50%",
      sm: "50%",
    },
    left: "50%",
    transform: "translate(-50%, -50%)",
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
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 20,
    justifyContent: "center",
  },
  options_title_21: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 21,
    justifyContent: "center",
  },
  divider: {
    marginTop: 1.8,
    marginBottom: 0.8,
  },
};
