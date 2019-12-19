import React, { Component } from 'react';
import { render } from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import 'react-big-calendar/lib/css/react-big-calendar.css';
require('moment/locale/es.js');
require('firebase/firestore');
const firebase = require('firebase');
 
const localizer = momentLocalizer(moment);

class Principal extends React.Component {
  constructor() {
    super();
    this.state = {
        notes: null,
        fechas: [],
        casosActivos: 0,
        '1-Directa': 0,
        '2-Condusef': 0,
        '3-Oral': 0,
        '3-Mercantil': 0
    };
  }

componentDidMount = () => {
    firebase
      .firestore()
      .collection('notificaciones')
      .orderBy("timestamp", "desc")
      .limit(10)
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        this.setState({ notes: notes });
      });
      firebase
      .firestore()
      .collection('fechas')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = {};
          data['allDay'] = true;
          data['title'] = _doc.data().text;
           data['start'] =new Date( _doc.data().fecha.seconds*1000);
           data['end'] =new Date(  _doc.data().fecha.seconds*1000);
          data['id'] = _doc.id;
          return data;
        });
        this.setState({ fechas: notes });
      });

      firebase
      .firestore()
      .collection('casos')
      .orderBy("timestamp", "desc")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          this.setState({ [data.etapa]: this.state[data.etapa]+1});
          return data;
        });
        this.setState({ casosActivos: notes.length});
      });
  }
 


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.header}>
            <Grid item xs={12}>
               <Paper className={classes.paper}>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Total de Casos {this.state.casosActivos}
                  </Button>
                  <Button variant="contained" color="primary" className={classes.button}>
                    R. Directa {this.state['1-Directa']}
                  </Button>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Condusef {this.state['2-Condusef']}
                  </Button>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Juicios Orales {this.state['3-Oral']}
                  </Button>
                  <Button variant="contained" color="primary" className={classes.button}>
                    Juicios Ordinarios {this.state['3-Mercantil']}
                  </Button>
               </Paper>
           </Grid>
        </div>
        
        <div className={classes.content}>
           <Paper className={classes.paper}>
            <Grid item xs={12} sm={12}>
               <div style={{height:'100vh', maxWidth: '150vh'}} className="bigCalendar-container">
                 <Calendar
                    localizer={localizer}
                    popup={true}
                    events={this.state.fechas}
                    eventPropGetter={(this.eventStyleGetter)}
                    onSelectEvent={event => console.log(event.id)}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={moment().toDate()}
                   messages={{
                    next: "Sig",
                    today: "Hoy",
                    previous: "Ant",
                    month: "Mes",
                    week: "Semana",
                    day: "Día"
                    }}
                    />
                </div>
            </Grid>
            </Paper>
        </div>
        <div className={classes.notification}>
            <Paper className={classes.paperNotCont}>
             <Grid item xs={12} sm={12}>
              <List>
                {this.state.notes ? 
                this.state.notes.map((item,id) =>{
                  return(
                    <Card key={item.id} className={classes.card}>
                       <div>
                          <ListItem
                              alignItems='flex-start'>
                                <div className={classes.textSection}>
                                    <Typography variant="subtitle2" gutterBottom>
                                       {item.text}
                                    </Typography>
                                 </div> 
                               <DeleteIcon className={classes.deleteIcon}
                                           onClick={() => this.deleteNoti(item.id)}
                               ></DeleteIcon>
                          </ListItem>
                      </div>
                    </Card>
                    )
                })
                :
                null
                }
               </List> 
              </Grid>
             </Paper>
        </div>
      </div>
    );
  }
  deleteNoti = (id) => {
    //alert(`Confirmacion para eliminar caso:${id}`)
     firebase
      .firestore()
      .collection('notificaciones')
      .doc(id)
      .delete();
  }
  eventStyleGetter=(event, start, end, isSelected) => {
    var now = moment(new Date()); 
     var end = moment(start); 
     var duration = moment.duration(now.diff(end));
     var days = duration.asDays();
    var style = {
        backgroundColor: '#D60405',
        borderRadius: '10px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
    };
    if (days < -4){
    return{ 
        style: null}
    }else{
       return{ 
        style: style}
        }
}

}
 
export default withStyles(styles)(Principal)