/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Autocomplete({datosAutoc, update, text, nameFiled, onCloseAutocomplete}) {
  return (
   <div style={{ width: "20%", marginRight:"10px"}}>
      <Autocomplete     
        id="free-solo-demo"
        value={text}
        onInputChange={(obj, str)=> update(str)}
        //onChange={(obj, str)=> update(str)}
       // renderOption={(obj, str) => console.log("renderOptionb",str)}
        onClose={() => onCloseAutocomplete()}
        freeSolo
        options={datosAutoc ? datosAutoc.map(option => option.text) : []}
        renderInput={params => (
          (
            <TextField 
              {...params}
              label={nameFiled}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          )
        )}
      />
   </div>
  );
}
