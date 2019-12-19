import React, { Component } from "react";
import { render } from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SearchIcon from "@material-ui/icons/Search";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Divider, Button } from "@material-ui/core";
const firebase = require("firebase");
require("firebase/firestore");

function getColTitle(data) {
  switch (data) {
    case 0:
      return "Tipo";
      break;
    case 1:
      return "Materia";
      break;
    case 2:
      return "Materia";
      break;
    case 3:
      return "Materia";
      break;
    case 4:
      return "Ubicacion";
      break;
  }
}

class Catalogos extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      materia: "",
      open: false,
      isEdit: false,
      idElem: "",
      searchTerm: "",
      seccion: "tribunales",
      indexTab: 0,
      bancos: null
    };
  }
  componentDidMount = () => {
    firebase
      .firestore()
      .collection("datosAutocompletado")
      .orderBy("text", "asc")
      .onSnapshot(serverUpdate => {
        const bancos = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        this.setState({ bancos });
      });
  };
  returnArrAuto = data => {
    console.log("returnArrAuto", data);
    switch (data) {
      case 0:
        return ["Estatal", "Federal"];
        break;
      case 1:
        return this.state.bancos
          ? this.state.bancos
              .filter(item => item.seccion === "materia")
              .map(obj => obj.text)
          : [];
        break;
      case 2:
        return [];
        break;
      case 3:
        return this.state.bancos
          ? this.state.bancos
              .filter(item => item.seccion === "materia")
              .map(obj => obj.text)
          : [];
        break;
      case 4:
        return [];
        break;
    }
  };
  handleChange = e => {
    this.setState({ text: e.target.value });
  };
  newEntry = () => {
    this.setState({ open: !this.state.open });
  };
  handleAdd = async () => {
    if (!this.state.isEdit) {
      await firebase
        .firestore()
        .collection("datosAutocompletado")
        .add({
          text: this.state.text,
          materia: this.state.materia,
          seccion: this.state.seccion
        });
    } else {
      await firebase
        .firestore()
        .collection("datosAutocompletado")
        .doc(this.state.idElem)
        .update({
          text: this.state.text,
          materia: this.state.materia
          // seccion: this.state.seccion
        });
    }
    this.setState({
      text: "",
      materia: "",
      isEdit: false,
      idElem: "",
      open: !this.state.open
    });
  };
  handleClose = () => {
    this.setState({
      text: "",
      materia: "",
      isEdit: false,
      idElem: "",
      open: !this.state.open
    });
  };
  editNote = async note => {
    await this.setState({
      text: note.text,
      materia: note.materia,
      isEdit: true,
      idElem: note.id,
      open: !this.state.open
    });
  };
  deleteNote = async note => {
    firebase
      .firestore()
      .collection("datosAutocompletado")
      .doc(note.id)
      .delete();
  };

  render() {
    const { classes } = this.props;
    const { searchTerm, bancos } = this.state;

    const filteredData = this.state.bancos
      ? this.state.bancos.filter(
          item =>
            item.text
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase()) &&
            item.seccion === this.state.seccion
        )
      : null;
    return (
      <div>
        <div style={{ spacing: "15px" }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end"
            }}
          >
            <Paper className={classes.root}>
              <InputBase
                className={classes.input}
                placeholder="Buscar"
                onChange={e => this.setState({ searchTerm: e.target.value })}
                inputProps={{ "aria-label": "busca caso" }}
              />
              <IconButton className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <Button
              variant="contained"
              color="primary"
              onClick={this.newEntry}
              className={classes.button}
              endIcon={<AddIcon />}
            >
              Nuevo
            </Button>
          </div>
          <Paper square style={{ width: "100%", marginTop: "10px" }}>
            <Tabs
              value={this.state.indexTab}
              // onChange={handleChange}
              indicatorColor="secondary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab
                label="Tribunales"
                onClick={() =>
                  this.setState({ indexTab: 0, seccion: "tribunales" })
                }
              />
              {/*<Tab
                label="Asuntos"
                onClick={() =>
                  this.setState({ indexTab: 1, seccion: "asuntos" })
                }
              />*/}
              <Tab
                label="Instituciones"
                onClick={() =>
                  this.setState({ indexTab: 1, seccion: "instituciones" })
                }
              />
              <Tab
                label="Materia"
                onClick={() =>
                  this.setState({ indexTab: 2, seccion: "materia" })
                }
              />
              <Tab
                label="Reclamos"
                onClick={() =>
                  this.setState({ indexTab: 3, seccion: "reclamos" })
                }
              />
              <Tab
                label="Juzgados"
                onClick={() =>
                  this.setState({ indexTab: 4, seccion: "juzgados" })
                }
              />
            </Tabs>
          </Paper>
        </div>
        <List>
          <Card>
            <ListItem alignItems="flex-start">
              <div className={classes.textSection}>
                <h4 className={classes.itemText} style={{ width: "33%" }}>
                  Nombre
                </h4>
                <h4
                  className={classes.itemText}
                  style={{
                    width: "33%",
                    visibility: this.state.indexTab === 2 ? "hidden" : "visible"
                  }}
                >
                  {getColTitle(this.state.indexTab)}
                </h4>
                <h4 className={classes.itemText} style={{ width: "33%" }}>
                  Opciones
                </h4>
              </div>
            </ListItem>
          </Card>
        </List>
        {filteredData ? (
          <List>
            {filteredData.map((item, _index) => {
              return (
                <Card key={_index} className={classes.card}>
                  <ListItem alignItems="flex-start">
                    <div className={classes.textSection}>
                      <h4 className={classes.itemText} style={{ width: "33%" }}>
                        {item.text}
                      </h4>
                      <h4
                        className={classes.itemText}
                        style={{
                          width: "33%",
                          visibility:
                            this.state.indexTab === 2 ? "hidden" : "visible"
                        }}
                      >
                        {item.materia}
                      </h4>
                      <div
                        className={classes.itemText}
                        style={{ width: "33%" }}
                      >
                        <DeleteIcon
                          onClick={() => this.deleteNote(item)}
                          className={classes.deleteIcon}
                        />
                        <EditIcon
                          onClick={() => this.editNote(item)}
                          className={classes.editIcon}
                        />
                      </div>
                    </div>
                  </ListItem>
                </Card>
              );
            })}
          </List>
        ) : null}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <div style={{ width: "400px" }}>
            <DialogTitle id="form-dialog-title">Nuevo Elemento</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Agregue elemento a catalogo.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={this.state.text}
                onChange={e => this.setState({ text: e.target.value })}
                label="Nombre"
                type="name"
                fullWidth
              />
              {/*<TextField
                margin="dense"
                id="name"
                value={this.state.materia}
                onChange={e => this.setState({ materia: e.target.value })}
                label={getColTitle(this.state.indexTab)}
                type="name"
                fullWidth
              />
              <div style={{ width: "100%"}}>*/}
              {this.state.indexTab != 2 ? (
                <Autocomplete
                  id="free-solo-demo"
                  value={this.state.materia}
                  onInputChange={(obj, str) => this.setState({ materia: str })}
                  freeSolo
                  options={this.returnArrAuto(this.state.indexTab)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label={getColTitle(this.state.indexTab)}
                      margin="dense"
                      fullWidth
                    />
                  )}
                />
              ) : null}
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={this.handleAdd} color="primary">
                Guardar
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(Catalogos);
