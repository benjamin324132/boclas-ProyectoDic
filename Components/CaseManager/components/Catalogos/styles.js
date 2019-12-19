const styles = theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  },
  button: {
    marginLeft: 10
  },
  textSection: {
    display: "flex",
    flex: "1",
    color: "#1506A5"
  },
  itemText: {
    padding: "5px"
  },
  card: {
    marginBottom: "8px"
  },
  deleteIcon: {
    cursor: "pointer",
    position: "absolute",
    // right: '5px',
    top: "calc(50% - 15px)",
    "&:hover": {
      color: "red"
    }
  },
  editIcon: {
    cursor: "pointer",
    position: "absolute",
    marginLeft: '35px',
    top: "calc(50% - 15px)",
    "&:hover": {
      color: "red"
    }
  }
});

export default styles;
