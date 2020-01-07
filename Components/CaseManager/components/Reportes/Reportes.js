import React, { Component } from "react";
import { render } from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import NumberFormat from "react-number-format";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {
  FormGroup,
  FormLabel,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import styles from "./styles";
import PdfReport from "./Generador";
const firebase = require("firebase");
require("firebase/firestore");
const _ = require("lodash");

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

class Reportes extends React.Component {
  constructor() {
    super();
    this.state = {
      casos: null,
      filteredCasos: null,
      value: null,
      open: false,
      showReport: false,
      tipoReporte: "",
      ageFilterChecked: false,
      tableStatePersist: {
        searchText: "",
        filterList: [],
        columns: []
      },
      reports: []
    };
    this.reports = [];
  }
  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .orderBy("timestamp", "desc")
      .onSnapshot(serverUpdate => {
        const casos = serverUpdate.docs.map(_doc => {
          const data = null;
          data = _doc.data();
          data["Actualizado"] = _doc.data().creadoFecha
            ? new Date(_doc.data().creadoFecha.toDate()).toLocaleDateString()
            : new Date();
          data["actualizado2"] = _doc.data().timestamp
            ? moment(_doc.data().timestamp.toDate()).format(
                "DD/MM/YYYY hh:mm A"
              )
            : null;
          data["id"] = _doc.id;
          return data;
        });
        console.log("Reportes.js componentDidMount", casos);
        this.setState({ casos: casos });
        this.setState({ filteredCasos: casos });
      });
  };
  handleChange = (action, tableState) => {
    console.log("Table state changed || " + JSON.stringify(action));
    if (action !== "propsUpdate") {
      this.setState({
        tableStatePersist: {
          searchText: tableState.searchText,
          filterList: tableState.filterList,
          columns: tableState.columns
        }
      });
    }
  };
  getSearchText = () => {
    return this.state.tableStatePersist.searchText;
  };
  getColumns = () => {
    let columns = [
      {
        name: "title",
        label: "Caso",
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: "body",
        label: "Nombre",
        options: {
          filter: false,
          sort: true
        }
      },
      {
        name: "ramo",
        label: "Tipo Materia",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "aseguradora",
        label: "Institucion",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "tiposeguro",
        label: "Tipo Reclamacion",
        options: {
          filter: false,
          display: false,
          sort: true
        }
      },
      {
        name: "asignadoA",
        label: "Asignado",
        options: {
          filter: true,
          sort: true
        }
      },
      {
        name: "etapa",
        label: "Etapa",
        options: {
          filter: true,
          display: false,
          searchable: false,
          sort: true
        }
      },
      {
        name: "monto",
        label: "Monto/Cuantia",
        options: {
          filter: true,
          sort: true,
          filterType: "custom",
          customBodyRender: (value, tableMeta, updateValue) => {
            const nf = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });

            return nf.format(value);
          },
          customFilterListOptions: {
            render: v => {
              console.log(v)
              if(v){
              if (v[0] && v[1] ) {
                return [`Min: $${v[0]}`, `Max: $${v[1]}`];
           //   } else if (v[0] && v[1] && !this.state.ageFilterChecked) {
            //    return `Min: $${v[0]}, Max: $${v[1]}`;
              } else if (v[0]) {
                return `Min: $${v[0]}`;
              } else if (v[1]) {
                return `Max: $${v[1]}`;
              }
              }
              return false;
            },
            update: (filterList, filterPos, index) => {
              if (filterPos === 0) {
                filterList[index].splice(filterPos, 1, "");
              } else if (filterPos === 1) {
                filterList[index].splice(filterPos, 1);
              } else if (filterPos === -1) {
                filterList[index] = [];
              }
              return filterList;
            }
          },
          filterOptions: {
            names: [],
            logic(age, filters) {
              if (filters[0] && filters[1]) {
                filters[0] = filters[0].replace(/\$|,/g, "");
                filters[1] = filters[1].replace(/\$|,/g, "");
                age = age.replace(/\$|,/g, "");
                console.log("monto 1",filters[0],filters[1], age)
                return age < filters[0] || age > filters[1];
              } else if (filters[0]) {
                filters[0] = filters[0].replace(/\$|,/g, "");
                age = age.replace(/\$|,/g, "");
                console.log("monto 2",filters[0], age)
                return age < filters[0];
              } else if (filters[1]) {
                filters[1] = filters[1].replace(/\$|,/g, "");
                age = age.replace(/\$|,/g, "");
                console.log("monto 3",filters[1], age)
                return age > filters[1];
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel>
                  Monto/Cuantia {filterList[index][0]} {filterList[index][1]}
                </FormLabel>
                <FormGroup row>
                  <TextField
                    label="Min"
                    value={filterList[index][0] || ""}
                    onChange={event => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    InputProps={{ inputComponent: NumberFormatCustom }}
                    style={{ width: "45%", marginRight: "5%" }}
                  />
                  <TextField
                    label="Max"
                    value={filterList[index][1] || ""}
                    onChange={event => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    InputProps={{ inputComponent: NumberFormatCustom }}
                    style={{ width: "45%" }}
                  />
                </FormGroup>
              </div>
            )
          },
          print: false
        }
      },
      {
        name: "actualizado2",
        label: "Actualizado",
        options: {
          filter: false,
          download: false,
          searchable: false
        }
      },
      {
        name: "Actualizado",
        label: "Actualizado",
        options: {
          display: "excluded",
          filter: true,
          searchable: false,
          sort: true,
          filterType: "custom",
          customFilterListOptions: {
            render: v => {
              if (v[0] && v[1]) {
                return [
                  `Min: ${moment(v[0]).format("MM-DD-YYYY")}`,
                  `Max: ${moment(v[1]).format("MM-DD-YYYY")}`
                ];
              } else if (v[0] && v[1]) {
                return `Min: ${moment(v[0]).format(
                  "MM-DD-YYYY"
                )}, Max: ${moment(v[1]).format("MM-DD-YYYY")}`;
              } else if (v[0]) {
                return `Min: ${moment(v[0]).format("MM-DD-YYYY")}`;
              } else if (v[1]) {
                return `Max: ${moment(v[1]).format("MM-DD-YYYY")}`;
              }
              return false;
            },
            update: (filterList, filterPos, index) => {
              if (filterPos === 0) {
                filterList[index].splice(filterPos, 1, "");
              } else if (filterPos === 1) {
                filterList[index].splice(filterPos, 1);
              } else if (filterPos === -1) {
                filterList[index] = [];
              }
              return filterList;
            }
          },
          filterOptions: {
            names: [],
            logic(age, filters) {
              if (filters[0] && filters[1]) {
                return (
                  moment(age).format("YYYYMMDD") <
                    moment(filters[0]).format("YYYYMMDD") ||
                  moment(age).format("YYYYMMDD") >
                    moment(filters[1]).format("YYYYMMDD")
                );
              } else if (filters[0]) {
                return (
                  moment(age).format("YYYYMMDD") <
                  moment(filters[0]).format("YYYYMMDD")
                );
              } else if (filters[1]) {
                return (
                  moment(age).format("YYYYMMDD") >
                  moment(filters[1]).format("YYYYMMDD")
                );
              }
              return false;
            },
            display: (filterList, onChange, index, column) => (
              <div>
                <FormLabel>Rango Fechas</FormLabel>
                <FormGroup row>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      style={{ width: "45%", marginRight: "5%" }}
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Fecha Inicio"
                      value={filterList[index][0] || null}
                      onChange={event => {
                        filterList[index][0] = event;
                        onChange(filterList[index], index, column);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                    <KeyboardDatePicker
                      disableToolbar
                      style={{ width: "45%" }}
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Fecha Final"
                      value={filterList[index][1] || null}
                      onChange={event => {
                        filterList[index][1] = event;
                        onChange(filterList[index], index, column);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </FormGroup>
              </div>
            )
          },
          print: false
        }
      },
      {
        name: "filterEjecAmp",
        label: "Amparos Resueltos",
        options: {
          download: false,
          filter: true,
          searchable: false,
          display: "excluded",
          filterType: "checkbox",
          customFilterListOptions: { render: v => `Amparos Resueltos` },
          filterOptions: {
            names: [true]
          }
        }
      },
      {
        name: "filterPresentRecApe",
        label: "Apelacion",
        options: {
          filter: true,
          download: false,
          searchable: false,
          display: "excluded",
          filterType: "checkbox",
          customFilterListOptions: { render: v => `Apelacion` },
          filterOptions: {
            names: [true]
          }
        }
      },
      {
        name: "filterAutoAdmiActora",
        label: "Fechas Futuras",
        options: {
          filter: true,
          download: false,
          searchable: false,
          display: "excluded",
          filterType: "checkbox",
          customFilterListOptions: { render: v => `Fechas Futuras` },
          filterOptions: {
            names: [true]
          }
        }
      },
      {
        name: "filterCitaSent",
        label: "Amparos por Resolver",
        options: {
          filter: true,
          download: false,
          searchable: false,
          display: "excluded",
          filterType: "checkbox",
          customFilterListOptions: { render: v => `Amparos por Resolver` },
          filterOptions: {
            names: [true]
          }
        }
      }
    ];
    for (let i = 0; i < columns.length; i++) {
      columns[i].options.filterList = this.state.tableStatePersist.filterList[
        i
      ];
      if (this.state.tableStatePersist.columns[i] !== undefined) {
        if (this.state.tableStatePersist.columns[i].hasOwnProperty("display"))
          columns[i].options.display = this.state.tableStatePersist.columns[
            i
          ].display;
        if (
          this.state.tableStatePersist.columns[i].hasOwnProperty(
            "sortDirection"
          )
        ) {
          if (this.state.tableStatePersist.columns[i].sortDirection != "none")
            columns[
              i
            ].options.sortDirection = this.state.tableStatePersist.columns[
              i
            ].sortDirection;
        }
      }
    }
    return columns;
  };
  generateReport = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleReports = e => {
    this.setState({ tipoReporte: e.target.value });
  };
  handleGenerar = () => {
    this.setState({ showReport: !this.state.showReport, open: false });
  };
  handleSelect = data => {
    const caso = this.state.casos.filter(obj => {
      return obj.title == data[0];
    });
    const reports = this.state.reports;
    reports.unshift(caso[0]);
    this.setState({ reports: reports });
  };
  handleDelete = chipToDelete => () => {
    const filtered = this.state.reports.filter(
      chip => chip.id !== chipToDelete
    );
    this.setState({ reports: filtered });
  };
  //****************************************************** */
  render() {
    console.log(this.state.tableStatePersist)
    const { classes } = this.props;
    const { filteredCasos } = this.state;
    if (this.state.casos) {
      if (!this.state.showReport) {
        return (
          <div>
            {this.state.reports.length > 0 ? (
              <div style={{ display: "flex", marginBottom: "10px" }}>
                <Paper className={classes.boxSelected}>
                  {this.state.reports.map((data, index) => {
                    console.log(data);
                    return (
                      <Chip
                        key={index}
                        label={data.title}
                        onDelete={this.handleDelete(data.id)}
                        className={classes.chip}
                      />
                    );
                  })}
                </Paper>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.generateReport}
                >
                  Generar
                </Button>
              </div>
            ) : null}
            <MUIDataTable
              title={"Reportes"}
              data={filteredCasos ? filteredCasos : []}
              columns={this.getColumns()}
              options={{
                selectableRows: "none",
                downloadOptions: { filename: `Reporte.csv`, separator: "," },
                onRowClick: (rowData, rowMeta) => {
                  this.handleSelect(rowData);
                },
                searchText: this.getSearchText(),
                onTableChange: (action, tableState) => {
                  this.handleChange(action, tableState);
                },
                textLabels: {
                  body: {
                    noMatch: "No se Encontraron Datos",
                    toolTip: "Ordenar",
                    columnHeaderTooltip: column => `Ordenar por ${column.label}`
                  },
                  pagination: {
                    next: "Siguiente Pagina",
                    previous: "Pagina Previa",
                    rowsPerPage: "Rows per page:",
                    displayRows: "de"
                  },
                  toolbar: {
                    search: "Buscar",
                    downloadCsv: "Descargar CSV",
                    print: "Imprimir",
                    viewColumns: "Ver Columnas",
                    filterTable: "Filtrar Datos"
                  },
                  filter: {
                    all: "Todos",
                    title: "Filtros",
                    reset: "Restablecer"
                  },
                  viewColumns: {
                    title: "Mostrar Columnas",
                    titleAria: "Show/Hide Table Columns"
                  },
                  selectedRows: {
                    text: "row(s) selected",
                    delete: "Delete",
                    deleteAria: "Delete Selected Rows"
                  }
                }
              }}
            />
            <div>
              <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={this.state.open}
                onClose={this.handleClose}
              >
                <DialogTitle>Tipo de Reporte</DialogTitle>
                <DialogContent>
                  <form className={classes.container}>
                    <FormControl className={classes.formControl}>
                      <InputLabel htmlFor="demo-dialog-native">
                        Tipo de Reporte
                      </InputLabel>
                      <Select
                        native
                        value={this.state.tipoReporte}
                        onChange={this.handleReports}
                        input={<Input id="demo-dialog-native" />}
                      >
                        <option value={0}>Reporte de Materia</option>
                        <option value={1}>Reporte de Usuario</option>
                        <option value={2}>Reporte de Caso general</option>
                        <option value={3}>Reporte de Amparos Resueltos</option>
                        <option value={4}>Reporte de Apelacion</option>
                        <option value={5}>Reporte de Montos/Cuantias</option>
                        <option value={6}>Reporte por Fechas Futuras</option>
                      </Select>
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancelar
                  </Button>
                  <Button onClick={this.handleGenerar} color="primary">
                    Generar
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        );
      } else {
        return (
          <PdfReport
            reports={this.state.reports}
            showReport={this.handleGenerar}
            tipoReporte={this.state.tipoReporte}
          />
        );
      }
    } else {
      return <div />;
    }
  }
}
export default withStyles(styles)(Reportes);
