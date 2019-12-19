import React from "react"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import EditorComponent from './editor'
import Fase1 from './Fases/Fase1'
import Fase2 from './Fases/Fase2'
import Fase3Merc from './Fases/Fase3Merc'
import Fase3Oral from './Fases/Fase3Oral'

class Switcher extends React.Component{
  constructor(props){
    super(props)

  }
render(){
  switch(this.props.index){
    case 0:
      return(<EditorComponent 
              selectedNote={this.props.selectedNote}
              noteUpdate={this.props.noteUpdate} 
              selectedNoteIndex={this.props.selectedNoteIndex}
              datosAutoc={this.props.datosAutoc}
              notes={this.props.notes}/>
              );
    case 1:
      return(<Fase1 
                selectedNote={this.props.selectedNote}/>); 
    case 2:
      return(<Fase2 
                 selectedNote={this.props.selectedNote}
                 datosAutoc={this.props.datosAutoc}/>); 
    case 3:
      return(<div><SubSwitch 
                       selectedNote={this.props.selectedNote}
                       datosAutoc={this.props.datosAutoc}/></div>);     
  }

}




}
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1200,
  },
}));

function SubSwitch(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValueC] = React.useState(0);

  function handleChange(event, newValue) {
    setValueC(newValue);
  }

  function handleChangeIndex(index) {
    setValueC(index);
  }

  return (
    <div>
     <Paper square>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Oral Mercantil" onClick={() =>  setValueC(0)}/>
          <Tab label="Ordinaria Mercantil"  onClick={() =>  setValueC(1)}/>
        </Tabs>
    </Paper>
    <div>
       {value == 0 ?
         (<div><Fase3Oral 
                 selectedNote={props.selectedNote}
                 datosAutoc={props.datosAutoc}/></div>):
             <div><Fase3Merc 
                selectedNote={props.selectedNote}
                datosAutoc={props.datosAutoc}/></div> }
      </div>        
    </div>
  );
}


 
export default Switcher;