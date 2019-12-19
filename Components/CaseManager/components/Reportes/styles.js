const styles = theme => ({
  container: {
    boxSizing: "border-box",
    height: "100%",
    width: "100%"
  },
  button: {
    margin: theme.spacing(1)
  },
  rangeBar: {
    width: 250,
    marginLeft: "5px",
    marginRight: "5px"
  },
  boxSelected: {
    marginRight: 10,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 320,
  },
});

export default styles;
