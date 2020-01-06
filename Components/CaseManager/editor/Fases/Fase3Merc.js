import React from "react";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Conclusion from "./Conclusion";
import Autocomplete from "./../Autocomplete";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddDialog from "./AddDialog";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
const firebase = require("firebase");
require("firebase/firestore");

class Etapa3Merc extends React.Component {
  constructor() {
    super();
    this.state = {
      created: false,
      numExped: "",
      nombNumJuz: "",
      tribunal: "",
      fechaPrestDem: null,
      fechaRadicDem: null,
      fechaEmplazam: null,
      fechaContestDem: null,
      fechaAdmisConte: null,
      fechaContVistaConte: null,
      fechaCVCDatabase: null,
      fechaAdmisConteVist: null,
      fechaImpugnDoc: null,
      fechaOfrecPrueDem: null,
      fechaAutoAdmiActora: null,
      fechaAAA1Database: null,
      filterAutoAdmiActora: false,
      //** Pruebas Desahogo Admite Actora */
      fechaPDConfesional: null,
      fechaPDCDatabase: null,
      fechaPDTestimonial: null,
      fechaPDTDatabase: null,
      fechaPDDecParte: null,
      fechaPDDPDatabase: null,
      fechaPDDecTercero: null,
      fechaPDDTDatabase: null,
      fechaPDPericial: null,
      fechaPDPDatabase: null,
      fechaPDInspJudic: null,
      fechaPDIJDatabase: null,
      fechaPDRecHechos: null,
      fechaPDRHDatabase: null,
      fechaPDRatifContFir: null,
      fechaPDRCFDatabase: null,
      //************** */
      fechaAutoAdmiDeman: null,
      fechaAAD2Database: null,
      //** Pruebas Desahogo Admite Demanda */
      fechaPD2Confesional: null,
      fechaPD2CDatabase: null,
      fechaPD2Testimonial: null,
      fechaPD2TDatabase: null,
      fechaPD2DecParte: null,
      fechaPD2DPDatabase: null,
      fechaPD2DecTercero: null,
      fechaPD2DTDatabase: null,
      fechaPD2Pericial: null,
      fechaPD2PDatabase: null,
      fechaPD2InspJudic: null,
      fechaPD2IJDatabase: null,
      fechaPD2RecHechos: null,
      fechaPD2RHDatabase: null,
      fechaPD2RatifContFir: null,
      fechaPD2RCFDatabase: null,
      //************** */
      resumen1: "",
      fechaApertuAleg: null,
      fechaCitaSent: null,
      filterCitaSent: false,
      fechaSentDefin: null,
      resumenResol: "",
      fechaPresentRecApe: null,
      fechaPRADatabase: null,
      filterPresentRecApe: false,
      fechaResSegInst: null,
      resumenReso2: "",
      fechaPresentAmp: null,
      fechaPADatabase: null,
      fechaEjecAmp: null,
      filterEjecAmp: false,
      resumenReso3: "",
      fechaCumplim: null,
      otrosResum: "",
      coment1: "",
      coment2: "",
      coment3: "",
      coment4: "",
      coment5: "",
      coment6: "",
      coment7: "",
      coment8: "",
      coment9: "",
      coment10: "",
      coment11: "",
      coment12: "",
      coment13: "",
      coment14: "",
      coment15: "",
      coment16: "",
      coment17: "",
      coment18: "",
      coment19: "",
      descr: "",
      open: false,
    };
    this.handlePrestDem = this.handlePrestDem.bind(this);
    this.handleRadicDeman = this.handleRadicDeman.bind(this);
    this.handleEmplaza = this.handleEmplaza.bind(this);
    this.handleContestDeman = this.handleContestDeman.bind(this);
    this.handleAdmisiContest = this.handleAdmisiContest.bind(this);
    this.handleContestVistContest = this.handleContestVistContest.bind(this);
    this.handleAdisiContestLitis = this.handleAdisiContestLitis.bind(this);
    this.handleImpugnDoc = this.handleImpugnDoc.bind(this);
    this.handleOfrecPruebDem = this.handleOfrecPruebDem.bind(this);
    this.handleAutoAdmitAct = this.handleAutoAdmitAct.bind(this);

    this.handlePDConfesional = this.handlePDConfesional.bind(this);
    this.handlePDTestimonial = this.handlePDTestimonial.bind(this);
    this.handlePDDecParte = this.handlePDDecParte.bind(this);
    this.handlePDDecTercero = this.handlePDDecTercero.bind(this);
    this.handlePDPericial = this.handlePDPericial.bind(this);
    this.handlePDInspJudic = this.handlePDInspJudic.bind(this);
    this.handlePDRecHechos = this.handlePDRecHechos.bind(this);
    this.handlePDRatifContFir = this.handlePDRatifContFir.bind(this);

    this.handleAutoAdmitDem = this.handleAutoAdmitDem.bind(this);

    this.handlePD2Confesional = this.handlePD2Confesional.bind(this);
    this.handlePD2Testimonial = this.handlePD2Testimonial.bind(this);
    this.handlePD2DecParte = this.handlePD2DecParte.bind(this);
    this.handlePD2DecTercero = this.handlePD2DecTercero.bind(this);
    this.handlePD2Pericial = this.handlePD2Pericial.bind(this);
    this.handlePD2InspJudic = this.handlePD2InspJudic.bind(this);
    this.handlePD2RecHechos = this.handlePD2RecHechos.bind(this);
    this.handlePD2RatifContFir = this.handlePD2RatifContFir.bind(this);

    this.handleSentDef = this.handleSentDef.bind(this);
    this.handleCitSen = this.handleCitSen.bind(this);
    this.handlePresRecApel = this.handlePresRecApel.bind(this);
    this.handleResSegInst = this.handleResSegInst.bind(this);
    this.handlePresentAmp = this.handlePresentAmp.bind(this);
    this.handleEjecAmp = this.handleEjecAmp.bind(this);
    this.handleCumplim = this.handleCumplim.bind(this);
    this.handleApertAleg = this.handleApertAleg.bind(this);
  }

  componentDidMount = () => {
    if (this.props.selectedNote.fase3M)
      this.fullFields(this.props.selectedNote.fase3M);
  };

  fullFields = data => {
    this.setState({
      id: data.id,
      nombNumJuz: data.nombNumJuz,
      numExped: data.numExped,
      tribunal: data.tribunal,
      fechaPrestDem: data.fechaPrestDem ? data.fechaPrestDem.toDate() : null,
      coment1: data.coment1,
      fechaRadicDem: data.fechaRadicDem ? data.fechaRadicDem.toDate() : null,
      coment2: data.coment2,
      fechaEmplazam: data.fechaEmplazam ? data.fechaEmplazam.toDate() : null,
      coment3: data.coment3,
      fechaContestDem: data.fechaContestDem
        ? data.fechaContestDem.toDate()
        : null,
      coment4: data.coment4,
      fechaAdmisConte: data.fechaAdmisConte
        ? data.fechaAdmisConte.toDate()
        : null,
      coment5: data.coment5,
      fechaContVistaConte: data.fechaContVistaConte
        ? data.fechaContVistaConte.toDate()
        : null,
      coment6: data.coment6,
      fechaAdmisConteVist: data.fechaAdmisConteVist
        ? data.fechaAdmisConteVist.toDate()
        : null,
      coment7: data.coment7,
      fechaImpugnDoc: data.fechaImpugnDoc ? data.fechaImpugnDoc.toDate() : null,
      coment8: data.coment8,
      fechaOfrecPrueDem: data.fechaOfrecPrueDem
        ? data.fechaOfrecPrueDem.toDate()
        : null,
      coment9: data.coment9,
      fechaAutoAdmiActora: data.fechaAutoAdmiActora
        ? data.fechaAutoAdmiActora.toDate()
        : null,
      filterAutoAdmiActora: this.props.selectedNote.filterAutoAdmiActora,
      coment10: data.coment10,
      fechaPDConfesional: data.fechaPDConfesional
        ? data.fechaPDConfesional.toDate()
        : null,
      fechaPDTestimonial: data.fechaPDTestimonial
        ? data.fechaPDTestimonial.toDate()
        : null,
      fechaPDDecParte: data.fechaPDDecParte
        ? data.fechaPDDecParte.toDate()
        : null,
      fechaPDDecTercero: data.fechaPDDecTercero
        ? data.fechaPDDecTercero.toDate()
        : null,
      fechaPDPericial: data.fechaPDPericial
        ? data.fechaPDPericial.toDate()
        : null,
      fechaPDInspJudic: data.fechaPDInspJudic
        ? data.fechaPDInspJudic.toDate()
        : null,
      fechaPDRecHechos: data.fechaPDRecHechos
        ? data.fechaPDRecHechos.toDate()
        : null,
      fechaPDRatifContFir: data.fechaPDRatifContFir
        ? data.fechaPDRatifContFir.toDate()
        : null,
      fechaAutoAdmiDeman: data.fechaAutoAdmiDeman
        ? data.fechaAutoAdmiDeman.toDate()
        : null,
      fechaPD2Confesional: data.fechaPD2Confesional
        ? data.fechaPD2Confesional.toDate()
        : null,
      fechaPD2Testimonial: data.fechaPD2Testimonial
        ? data.fechaPD2Testimonial.toDate()
        : null,
      fechaPD2DecParte: data.fechaPD2DecParte
        ? data.fechaPD2DecParte.toDate()
        : null,
      fechaPD2DecTercero: data.fechaPD2DecTercero
        ? data.fechaPD2DecTercero.toDate()
        : null,
      fechaPD2Pericial: data.fechaPD2Pericial
        ? data.fechaPD2Pericial.toDate()
        : null,
      fechaPD2InspJudic: data.fechaPD2InspJudic
        ? data.fechaPD2InspJudic.toDate()
        : null,
      fechaPD2RecHechos: data.fechaPD2RecHechos
        ? data.fechaPD2RecHechos.toDate()
        : null,
      fechaPD2RatifContFir: data.fechaPD2RatifContFir
        ? data.fechaPD2RatifContFir.toDate()
        : null,
      coment11: data.coment11,
      resumen1: data.resumen1,
      coment12: data.coment12,
      fechaApertuAleg: data.fechaApertuAleg
        ? data.fechaApertuAleg.toDate()
        : null,
      coment13: data.coment13,
      fechaCitaSent: data.fechaCitaSent ? data.fechaCitaSent.toDate() : null,
      coment14: data.coment14,
      filterCitaSent: this.props.selectedNote.filterCitaSent,
      fechaSentDefin: data.fechaSentDefin ? data.fechaSentDefin.toDate() : null,
      coment15: data.coment15,
      resumenResol: data.resumenResol,
      fechaResSegInst: data.fechaResSegInst
        ? data.fechaResSegInst.toDate()
        : null,
      coment16: data.coment16,
      fechaPresentRecApe: data.fechaPresentRecApe
        ? data.fechaPresentRecApe.toDate()
        : null,
      filterPresentRecApe: this.props.selectedNote.filterPresentRecApe,
      coment17: data.coment17,
      resumenReso2: data.resumenReso2,
      coment18: data.coment18,
      fechaPresentAmp: data.fechaPresentAmp
        ? data.fechaPresentAmp.toDate()
        : null,
      coment19: data.coment19,
      fechaEjecAmp: data.fechaEjecAmp ? data.fechaEjecAmp.toDate() : null,
      filterEjecAmp: this.props.selectedNote.filterEjecAmp,
      resumenReso3: data.resumenReso3,
      fechaCumplim: data.fechaCumplim ? data.fechaCumplim.toDate() : null,
      otrosResum: data.otrosResum
    });
  };

  handlePrestDem(date) {
    this.setState({ fechaPrestDem: date });
  }
  handleRadicDeman(date) {
    this.setState({ fechaRadicDem: date });
  }
  handleEmplaza(date) {
    this.setState({ fechaEmplazam: date });
  }
  handleContestDeman(date) {
    this.setState({ fechaContestDem: date });
  }
  handleAdmisiContest(date) {
    this.setState({ fechaAdmisConte: date });
  }
  handleContestVistContest(date) {
    this.setState({ fechaContVistaConte: date, fechaCVCDatabase: date });
  }
  handleAdisiContestLitis(date) {
    this.setState({ fechaAdmisConteVist: date });
  }
  handleImpugnDoc(date) {
    this.setState({ fechaImpugnDoc: date });
  }
  handleOfrecPruebDem(date) {
    this.setState({ fechaOfrecPrueDem: date });
  }
  handleAutoAdmitAct(date) {
    this.setState({
      fechaAutoAdmiActora: date,
      fechaAAA1Database: date,
      filterAutoAdmiActora: true
    });
  }
  handlePDConfesional(date) {
    this.setState({ fechaPDConfesional: date, fechaPDCDatabase: date });
  }
  handlePDTestimonial(date) {
    this.setState({ fechaPDTestimonial: date, fechaPDTDatabase: date });
  }
  handlePDDecParte(date) {
    this.setState({ fechaPDDecParte: date, fechaPDDPDatabase: date });
  }
  handlePDDecTercero(date) {
    this.setState({ fechaPDDecTercero: date, fechaPDDTDatabase: date });
  }
  handlePDPericial(date) {
    this.setState({ fechaPDPericial: date, fechaPDPDatabase: date });
  }
  handlePDInspJudic(date) {
    this.setState({ fechaPDInspJudic: date, fechaPDIJDatabase: date });
  }
  handlePDRecHechos(date) {
    this.setState({ fechaPDRecHechos: date, fechaPDRHDatabase: date });
  }
  handlePDRatifContFir(date) {
    this.setState({ fechaPDRatifContFir: date, fechaPDRCFDatabase: date });
  }
  handleAutoAdmitDem(date) {
    this.setState({ fechaAutoAdmiDeman: date, fechaAAD2Database: date });
  }
  handlePD2Confesional(date) {
    this.setState({ fechaPD2Confesional: date, fechaPD2CDatabase: date });
  }
  handlePD2Testimonial(date) {
    this.setState({ fechaPD2Testimonial: date, fechaPD2TDatabase: date });
  }
  handlePD2DecParte(date) {
    this.setState({ fechaPD2DecParte: date, fechaPD2DPDatabase: date });
  }
  handlePD2DecTercero(date) {
    this.setState({ fechaPD2DecTercero: date, fechaPD2DTDatabase: date });
  }
  handlePD2Pericial(date) {
    this.setState({ fechaPD2Pericial: date, fechaPD2PDatabase: date });
  }
  handlePD2InspJudic(date) {
    this.setState({ fechaPD2InspJudic: date, fechaPD2IJDatabase: date });
  }
  handlePD2RecHechos(date) {
    this.setState({ fechaPD2RecHechos: date, fechaPD2RHDatabase: date });
  }
  handlePD2RatifContFir(date) {
    this.setState({ fechaPD2RatifContFir: date, fechaPD2RCFDatabase: date });
  }
  handleApertAleg(date) {
    this.setState({ fechaApertuAleg: date });
  }
  handleSentDef(date) {
    this.setState({ fechaSentDefin: date });
  }
  handleCitSen(date) {
    this.setState({ fechaCitaSent: date, filterCitaSent: true });
  }
  handlePresRecApel(date) {
    this.setState({
      fechaPresentRecApe: date,
      fechaPRADatabase: date,
      filterPresentRecApe: true
    });
  }
  handleResSegInst(date) {
    this.setState({ fechaResSegInst: date });
  }
  handlePresentAmp(date) {
    this.setState({ fechaPresentAmp: date, fechaPADatabase: date });
  }
  handleEjecAmp(date) {
    this.setState({ fechaEjecAmp: date, filterEjecAmp: true });
  }
  handleCumplim(date) {
    this.setState({ fechaCumplim: date });
  }

  render() {
    const { datosAutoc } = this.props;
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid //direction="column" justify="flex-start" alignItems="flex-start"
          >
            <div style={{ width: "100%", display: "flex" }}>
              <TextField
                style={{ width: "25%", marginRight: "10px" }}
                id="outlined-name"
                label="Numero del Expediente"
                value={this.state.numExped}
                onChange={e => this.setState({ numExped: e.target.value })}
                margin="normal"
                variant="outlined"
              />
              <Autocomplete
                update={this.updateJuzgado}
                onCloseAutocomplete={this.onCloseAutocompleteJuzgado} 
                datosAutoc={
                  datosAutoc
                    ? datosAutoc.filter(i => i.seccion === "juzgados")
                    : null
                }
                text={this.state.nombNumJuz}
                nameFiled={"Nombre del juzgado"}
              />
              <Autocomplete
                update={this.updateTribunales}
                onCloseAutocomplete={this.onCloseAutocompleteTribunales}
                datosAutoc={
                  datosAutoc
                    ? datosAutoc.filter(i => i.seccion === "tribunales")
                    : null
                }
                text={this.state.tribunal}
                nameFiled={"Tribunal"}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Presentacion de Demanda"
                value={this.state.fechaPrestDem}
                onChange={this.handlePrestDem}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment1}
                onChange={e =>
                  this.setState({
                    coment1: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Radicacion de Demanda"
                value={this.state.fechaRadicDem}
                onChange={this.handleRadicDeman}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment2}
                onChange={e =>
                  this.setState({
                    coment2: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Emplazamiento"
                value={this.state.fechaEmplazam}
                onChange={this.handleEmplaza}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment3}
                onChange={e =>
                  this.setState({
                    coment3: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Contestacion de Demanda"
                value={this.state.fechaContestDem}
                onChange={this.handleContestDeman}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment4}
                onChange={e =>
                  this.setState({
                    coment4: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Admis. Contest. Demanda"
                value={this.state.fechaAdmisConte}
                onChange={this.handleAdmisiContest}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment5}
                onChange={e =>
                  this.setState({
                    coment5: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Contest. Vista Contest."
                value={this.state.fechaContVistaConte}
                onChange={this.handleContestVistContest}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment6}
                onChange={e =>
                  this.setState({
                    coment6: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Admis. Contest. Vista..."
                value={this.state.fechaAdmisConteVist}
                onChange={this.handleAdisiContestLitis}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment7}
                onChange={e =>
                  this.setState({
                    coment7: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Impugnacion Documento"
                value={this.state.fechaImpugnDoc}
                onChange={this.handleImpugnDoc}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment8}
                onChange={e =>
                  this.setState({
                    coment8: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label=" Ofrecimiento de Pruebas Demand."
                value={this.state.fechaOfrecPrueDem}
                onChange={this.handleOfrecPruebDem}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment9}
                onChange={e =>
                  this.setState({
                    coment9: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Auto Admite Actora"
                value={this.state.fechaAutoAdmiActora}
                onChange={this.handleAutoAdmitAct}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment10}
                onChange={e =>
                  this.setState({
                    coment10: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap"
              }}
            />

            <h3>Fechas de pruebas a Desahogar (Admite Actora)</h3>
            <div>
              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Confesional"
                value={this.state.fechaPDConfesional}
                onChange={this.handlePDConfesional}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />

              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Testimonial"
                value={this.state.fechaPDTestimonial}
                onChange={this.handlePDTestimonial}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />

              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Declaracion de Parte"
                value={this.state.fechaPDDecParte}
                onChange={this.handlePDDecParte}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />

              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Declaracion de Tercero"
                value={this.state.fechaPDDecTercero}
                onChange={this.handlePDDecTercero}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />

              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Pericial"
                value={this.state.fechaPDPericial}
                onChange={this.handlePDPericial}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />

              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Inspeccion Judicial"
                value={this.state.fechaPDInspJudic}
                onChange={this.handlePDInspJudic}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />

              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Reconstruccion de Hechos"
                value={this.state.fechaPDRecHechos}
                onChange={this.handlePDRecHechos}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />

              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Ratificacion Contenido y Firma"
                value={this.state.fechaPDRatifContFir}
                onChange={this.handlePDRatifContFir}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </div>
               <br />
               <br />
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Auto Admite Demanda"
                value={this.state.fechaAutoAdmiDeman}
                onChange={this.handleAutoAdmitDem}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment11}
                onChange={e =>
                  this.setState({
                    coment11: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <h3>Fechas de pruebas a Desahogar (Admite Demanda)</h3>
            <div>
              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Confesional"
                value={this.state.fechaPD2Confesional}
                onChange={this.handlePD2Confesional}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Testimonial"
                value={this.state.fechaPD2Testimonial}
                onChange={this.handlePD2Testimonial}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Declaracion de Parte"
                value={this.state.fechaPD2DecParte}
                onChange={this.handlePD2DecParte}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Declaracion de Tercero"
                value={this.state.fechaPD2DecTercero}
                onChange={this.handlePD2DecTercero}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Pericial"
                value={this.state.fechaPD2Pericial}
                onChange={this.handlePD2Pericial}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Inspeccion Judicial"
                value={this.state.fechaPD2InspJudic}
                onChange={this.handlePD2InspJudic}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />

              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Reconstruccion de Hechos"
                value={this.state.fechaPD2RecHechos}
                onChange={this.handlePD2RecHechos}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />

              <KeyboardDatePicker
                style={{ marginLeft: "5px", marginRight: "5px" }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Ratificacion Contenido y Firma"
                value={this.state.fechaPD2RatifContFir}
                onChange={this.handlePD2RatifContFir}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </div>
            <br />
            <br />
            <div>
               <KeyboardDatePicker
               style={{visibility: "hidden"}}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Margeeeeeeeeeeeeeeeeeeeeeeeeen"
                value={}
                onChange={}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Resumen"
                value={this.state.resumen1}
                onChange={e => this.setState({ resumen1: e.target.value })}
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Apertura Alegatos"
                value={this.state.fechaApertuAleg}
                onChange={this.handleApertAleg}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment12}
                onChange={e =>
                  this.setState({
                    coment12: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Citacion Sentencia"
                value={this.state.fechaCitaSent}
                onChange={this.handleCitSen}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment13}
                onChange={e =>
                  this.setState({
                    coment13: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Sentencia Definitiva"
                value={this.state.fechaSentDefin}
                onChange={this.handleSentDef}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment14}
                onChange={e =>
                  this.setState({
                    coment14: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
            <KeyboardDatePicker
                style={{visibility: "hidden"}}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Margeeeeeeeeeeeeeeeeeeeeeeeeen"
                value={}
                onChange={}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Resumen de Resolutivos"
                value={this.state.resumenResol}
                onChange={e => this.setState({ resumenResol: e.target.value })}
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Presentacion Rec. Apel."
                value={this.state.fechaPresentRecApe}
                onChange={this.handlePresRecApel}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment15}
                onChange={e =>
                  this.setState({
                    coment15: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Reso. Segu. Inst."
                value={this.state.fechaResSegInst}
                onChange={this.handleResSegInst}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment16}
                onChange={e =>
                  this.setState({
                    coment16: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
            <KeyboardDatePicker
                style={{visibility: "hidden"}}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Margeeeeeeeeeeeeeeeeeeeeeeeeen"
                value={}
                onChange={}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Resumen Reso.(Seg. Inst)"
                value={this.state.resumenReso2}
                onChange={e => this.setState({ resumenReso2: e.target.value })}
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="*Presentacion Amparo"
                value={this.state.fechaPresentAmp}
                onChange={this.handlePresentAmp}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment17}
                onChange={e =>
                  this.setState({
                    coment17: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Ejecutoria Amparo"
                value={this.state.fechaEjecAmp}
                onChange={this.handleEjecAmp}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment18}
                onChange={e =>
                  this.setState({
                    coment18: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
            <KeyboardDatePicker
                style={{visibility: "hidden"}}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Margeeeeeeeeeeeeeeeeeeeeeeeeen"
                value={}
                onChange={}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Resumen Resolutivos"
                value={this.state.resumenReso3}
                onChange={e => this.setState({ resumenReso3: e.target.value })}
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Cumplimentadora"
                value={this.state.fechaCumplim}
                onChange={this.handleCumplim}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Comentario"
                value={this.state.coment19}
                onChange={e =>
                  this.setState({
                    coment19: e.target.value,
                    descr: e.target.value
                  })
                }
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
            <div>
            <KeyboardDatePicker
                style={{visibility: "hidden"}}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Margeeeeeeeeeeeeeeeeeeeeeeeeen"
                value={}
                onChange={}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
              <input
                accept="pdf/*"
                style={{ display: "none" }}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  component="span"
                  style={{ margin: "20px" }}
                >
                  Cargar archivo
                </Button>
              </label>
              <TextField
                id="outlined-name"
                label="Otros Resumenes"
                value={this.state.otrosResum}
                onChange={e => this.setState({ otrosResum: e.target.value })}
                margin="normal"
                variant="outlined"
                style={{ width: "350px" }}
              />
            </div>
          </Grid>
        </MuiPickersUtilsProvider>
        <div style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end"
            }}>
        <Button
          onClick={this.consluir}
          style={{ margin: "6px" }}
          variant="contained"
          color="primary"
        >
          Concluir
        </Button>
         <Button onClick={this.save} 
         style={{ margin: "6px" }}
            variant="contained"
            color="primary"
          >
          Guardar
        </Button>
        </div>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.consluir}
            aria-labelledby="form-dialog-title"
          >
            <Conclusion
              consluir={this.consluir}
              descr={this.state.descr}
              guardarConclusion={this.guardarConclusion}
              text={'Motivo de Conclusion'}
              setDescr={this.setDescr}
            />
          </Dialog>
        </div>
      </div>
    );
  }

  consluir = () => {
    this.setState({ open: !this.state.open });
  };
  updateJuzgado = async val => {
    await this.setState({ nombNumJuz: val});
    // this.update()
  };
  updateTribunales = async val => {
    await this.setState({ tribunal: val});
    // this.update()
  };


  onCloseAutocompleteJuzgado = async () => {

  };

   onCloseAutocompleteTribunales = async () => {

  };

  guardarConclusion = async () => {
    await firebase
      .firestore()
      .collection("notes")
      .doc(this.props.selectedNote.id)
      .update({
        estado: 3,
        descr: this.state.descr,
        etapa: "3-Mercantil",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    this.setState({ open: !this.state.open });
  };
  setDescr = e => {
    this.setState({ descr: e.target.value });
  };
  save = async () => {
    await firebase
      .firestore()
      .collection("notificaciones")
      .add({
        text: `${this.props.selectedNote.name} ha actualizado el caso #${
          this.props.selectedNote.title
        }`,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(doc => console.log("notificacion", doc));

    if (this.state.fechaCVCDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idCVCD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Contestacion de vista a la Contestacion de Demanda`,
          fecha: this.state.fechaCVCDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaAAA1Database) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idAAA1`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Auto que permite Pruebas de Actora(Desahogo)`,
          fecha: this.state.fechaAAA1Database,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPDCDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPDCD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Confesional(Actora)`,
          fecha: this.state.fechaPDCDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPDTDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPDTD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Testimonial(Actora)`,
          fecha: this.state.fechaPDTDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPDDPDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPDDPD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Declaracion de Parte(Actora)`,
          fecha: this.state.fechaPDDPDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPDDTDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPDDTD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Declaracion de Tercero(Actora)`,
          fecha: this.state.fechaPDDTDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPDPDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPDPD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Parcial(Actora)`,
          fecha: this.state.fechaPDPDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPDIJDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPDIJD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Inspeccion Judicial(Actora)`,
          fecha: this.state.fechaPDIJDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPDRHDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPDRHD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Reconstruccion de Hechos(Actora)`,
          fecha: this.state.fechaPDRHDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPDRCFDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPDRCFD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Ratificacion de Contenido y Firma(Actora)`,
          fecha: this.state.fechaPDRCFDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    if (this.state.fechaAAD2Database) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idAAD2`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Auto que permite Pruebas de Demanda(Desahogo)`,
          fecha: this.state.fechaAAD2Database,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPD2CDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPD2CD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Confesional(Demanda)`,
          fecha: this.state.fechaPD2CDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPD2TDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPD2TD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Testimonial(Demanda)`,
          fecha: this.state.fechaPD2TDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPD2DPDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPD2DPD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Declaracion de Parte(Demanda)`,
          fecha: this.state.fechaPD2DPDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPD2DTDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPD2DTD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Declaracion de Tercero(Demanda)`,
          fecha: this.state.fechaPD2DTDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPD2PDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPD2PD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Parcial(Demanda)`,
          fecha: this.state.fechaPD2PDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPD2IJDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPD2IJD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Inspeccion Judicial(Demanda)`,
          fecha: this.state.fechaPD2IJDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPD2RHDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPD2RHD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Reconstruccion de Hechos(Demanda)`,
          fecha: this.state.fechaPD2RHDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPD2RCFDatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPD2RCFD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Pruebas de Desahogo Ratificacion de Contenido y Firma(Demanda)`,
          fecha: this.state.fechaPD2RCFDatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPRADatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPRAD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Presentacion de Recursos de Apelacion`,
          fecha: this.state.fechaPRADatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    if (this.state.fechaPADatabase) {
      await firebase
        .firestore()
        .collection("fechas")
        .doc(`${this.props.selectedNote.title}idPAD`)
        .set({
          text: `Caso ${
            this.props.selectedNote.title
          } Fecha de Presentacion de Amparo`,
          fecha: this.state.fechaPADatabase,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    await firebase
      .firestore()
      .collection("notes")
      .doc(this.props.selectedNote.id)
      .update({
        fase3M: {
          numExped: this.state.numExped,
          nombNumJuz: this.state.nombNumJuz,
          tribunal: this.state.tribunal,
          coment1: this.state.coment1,
          fechaPrestDem: this.state.fechaPrestDem,
          coment2: this.state.coment2,
          fechaRadicDem: this.state.fechaRadicDem,
          coment3: this.state.coment3,
          fechaEmplazam: this.state.fechaEmplazam,
          coment4: this.state.coment4,
          fechaContestDem: this.state.fechaContestDem,
          coment5: this.state.coment5,
          fechaAdmisConte: this.state.fechaAdmisConte,
          coment6: this.state.coment6,
          fechaContVistaConte: this.state.fechaContVistaConte,
          coment7: this.state.coment7,
          fechaAdmisConteVist: this.state.fechaAdmisConteVist,
          coment8: this.state.coment8,
          fechaImpugnDoc: this.state.fechaImpugnDoc,
          coment9: this.state.coment9,
          fechaOfrecPrueDem: this.state.fechaOfrecPrueDem,
          coment10: this.state.coment10,
          fechaAutoAdmiActora: this.state.fechaAutoAdmiActora,
          coment11: this.state.coment11,
          fechaPDConfesional: this.state.fechaPDConfesional,
          fechaPDTestimonial: this.state.fechaPDTestimonial,
          fechaPDDecParte: this.state.fechaPDDecParte,
          fechaPDDecTercero: this.state.fechaPDDecTercero,
          fechaPDPericial: this.state.fechaPDPericial,
          fechaPDInspJudic: this.state.fechaPDInspJudic,
          fechaPDRecHechos: this.state.fechaPDRecHechos,
          fechaPDRatifContFir: this.state.fechaPDRatifContFir,
          fechaAutoAdmiDeman: this.state.fechaAutoAdmiDeman,
          coment12: this.state.coment12,
          fechaPD2Confesional: this.state.fechaPD2Confesional,
          fechaPD2Testimonial: this.state.fechaPD2Testimonial,
          fechaPD2DecParte: this.state.fechaPD2DecParte,
          fechaPD2DecTercero: this.state.fechaPD2DecTercero,
          fechaPD2Pericial: this.state.fechaPD2Pericial,
          fechaPD2InspJudic: this.state.fechaPD2InspJudic,
          fechaPD2RecHechos: this.state.fechaPD2RecHechos,
          fechaPD2RatifContFir: this.state.fechaPD2RatifContFir,
          resumen1: this.state.resumen1,
          coment13: this.state.coment13,
          fechaApertuAleg: this.state.fechaApertuAleg,
          coment14: this.state.coment14,
          fechaCitaSent: this.state.fechaCitaSent,
          coment15: this.state.coment15,
          fechaSentDefin: this.state.fechaSentDefin,
          fechaResSegInst: this.state.fechaResSegInst,
          coment16: this.state.coment16,
          resumenResol: this.state.resumenResol,
          coment17: this.state.coment17,
          fechaPresentRecApe: this.state.fechaPresentRecApe,
          coment18: this.state.coment18,
          resumenReso2: this.state.resumenReso2,
          coment19: this.state.coment19,
          fechaPresentAmp: this.state.fechaPresentAmp,
          fechaEjecAmp: this.state.fechaEjecAmp,
          resumenReso3: this.state.resumenReso3,
          fechaCumplim: this.state.fechaCumplim,
          otrosResum: this.state.otrosResum
        },
        etapa: "3-Mercantil",
        descr: this.state.descr,
        actualizado: this.props.selectedNote.name,
        filterEjecAmp: this.state.filterEjecAmp,
        filterPresentRecApe: this.state.filterPresentRecApe,
        filterAutoAdmiActora: this.state.filterAutoAdmiActora,
        filterCitaSent: this.state.filterCitaSent,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };
}
export default Etapa3Merc;
