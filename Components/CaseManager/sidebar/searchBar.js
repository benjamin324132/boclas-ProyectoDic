import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AddIcon from "@material-ui/icons/Add";
import { Divider, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
  }
}));

export default function CustomizedInputBase(props) {
  const classes = useStyles();

  return (
    <div style={{spacing: "15px"}}>
      <div style={{width: "100%", display: "flex", justifyContent: "flex-end"}}>
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Buscar Caso"
            onChange={props.setSearchTerm}
            inputProps={{ "aria-label": "busca caso" }}
          />
          <IconButton className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<AddIcon />}
          onClick={props.newNote}
        >
          Nuevo
        </Button>
      </div>
      <Paper square style={{ width: "100%", marginTop: "10px" }}>
        <Tabs
          value={props.estado - 1}
          // onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Activos" onClick={props.setCasosActivos} />
          <Tab label="Inactivos" onClick={props.setCasosInactivos} />
          <Tab label="Concluidos" onClick={props.setCasosConcluidos} />
        </Tabs>
      </Paper>
      {/*  <Button
        className={classes.button}
        onClick={props.setCasosActivos}
        variant="contained"
        color={ props.estado == 1 ? "primary" : "default"}
      >
        Activos
      </Button>
      <Button
        className={classes.button}
        onClick={props.setCasosInactivos}
        variant="contained"
        color={ props.estado == 2 ? "primary" : "default"}
      >
        Inactivos
      </Button>
      <Button
        className={classes.button}
        onClick={props.setCasosConcluidos}
        variant="contained"
        color={ props.estado == 3 ? "primary" : "default"}
      >
        Concluidos
      </Button>*/}
    </div>
  );
}
