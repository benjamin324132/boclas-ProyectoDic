import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

const autData =[
  ["Estado","Federal"],
  ["Afianzadora","Aseguradora","Bancos","Responsabilidad Civil"],
  [],
  ["Banco","Fianza","Seguro","Responabilidad Civil"],
  []]
  const colTitle =["Tipo","Materia","Materia","Materia","Ubicacion"]
export default function AddDialog({openAdd, addText,addMateria,handleClose,handleAdd,updateAddText,updateAddMateria,datosAutoc,addSeccion}) {

  return (
   <div>
     <Dialog
            open={openAdd}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <div style={{ width: "400px"}}>
              <DialogTitle id="form-dialog-title">Nuevo Elemento</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Agregue elemento a catalogo.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  value={addText}
                  onChange={e => updateAddText(  e.target.value )}
                  label="Nombre"
                  type="name"
                  fullWidth
                />
                {/*<TextField
                  margin="dense"
                  id="name"
                  value={addMateria}
                  onChange={e => updateAddMateria( e.target.value )}
                  label={"Materia"}
                  type="name"
                  fullWidth
                />*/}
                {addSeccion != "materia" ? <Autocomplete
                  id="free-solo-demo"
                  value={addMateria}
                  onInputChange={(obj, str) => updateAddMateria( str )}
                  freeSolo
                  options={datosAutoc ? datosAutoc.map(option => option.text) : []}
                  renderInput={params => (
                    <TextField 
                      {...params}
                      label={"Materia"}
                      margin="dense"
                      //variant="outlined"
                      fullWidth
                    />
                  )}
                /> : null}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancelar
                </Button>
                <Button onClick={handleAdd} color="primary">
                  Guardar
                </Button>
              </DialogActions>
            </div>
          </Dialog>
   </div>
  );
}