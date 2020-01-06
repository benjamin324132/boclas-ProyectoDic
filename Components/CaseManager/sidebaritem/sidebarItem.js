import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
 
class SidebarItemComponent extends React.Component {
  render() {
    const { _index, _note, classes, selectedNoteIndex } = this.props;
    const updated =_note.timestamp != null ? moment(_note.timestamp.toDate()).format("DD/MM/YYYY") : null;
    return (
      <div key={_index}>
        <ListItem
          className={classes.listItem}
          selected={selectedNoteIndex === _index}
          alignItems="flex-start"
        >
          <div
            className={classes.textSection}
            onClick={() => this.selectNote(_note, _index)}
          >
            <h4 className={classes.itemText} style={{ width: "8%" }}>
              {_note.title}
            </h4>
            <h4 className={classes.itemText} style={{ width: "18%" }}>
              {_note.body}
            </h4>
            <h4 className={classes.itemText} style={{ width: "10%" }}>
              {_note.ramo}
            </h4>
            <h4 className={classes.itemText} style={{ width: "8%" }}>
              {_note.aseguradora}
            </h4>
            <h4 className={classes.itemText} style={{ width: "12%" }}>
              {_note.tiposeguro}
            </h4>
            <h4 className={classes.itemText} style={{ width: "10%" }}>
              {_note.asunto}
            </h4>
            <h4 className={classes.itemText} style={{ width: "7%" }}>
              {_note.etapa}
            </h4>
            {/*<h4 className={classes.itemText} style={{ width: "8%" }}>
              {updated} 
             </h4>*/}
            <h4 className={classes.itemText} style={{ width: "27%" }}>
              {updated}-{_note.descr}
            </h4>
          </div>
          <DeleteIcon
            onClick={() => this.deleteNote(_note)}
            className={classes.deleteIcon}
          />
        </ListItem>
      </div>
    );
  }
  selectNote = (n, i) => this.props.selectNote(n, i);
  deleteNote = note => {
    if (window.confirm(`Confirmacion para eliminar caso: ${note.title}`)) {
      this.props.deleteNote(note);
    }
  };
}
export default withStyles(styles)(SidebarItemComponent);
