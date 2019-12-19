import React, { Component } from 'react';
import { render } from 'react-dom';


class PdfGenerador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    console.log(this.props.tipoReporte)
    switch(this.props.tipoReporte){
      case '0':
      return(<div><button onClick={this.props.showReport}>Volver</button><h4>0</h4></div>);
      break;
      case '1':
      return(<div><button onClick={this.props.showReport}>Volver</button><h4>1</h4></div>);
      break;
      case '2':
      return(<div><button onClick={this.props.showReport}>Volver</button><h4>2</h4></div>);
      break;
      case '3':
      return(<div><button onClick={this.props.showReport}>Volver</button><h4>3</h4></div>);
      break;
      case '4':
      return(<div><button onClick={this.props.showReport}>Volver</button><h4>4</h4></div>);
      break;
      case '5':
      return (
      <div>
         <button onClick={this.props.showReport}>Volver</button>
         <h1>Generador</h1>
         <h2>{this.props.tipoReporte}</h2>
         {this.props.reports.map(i =><h1>{i.title}</h1> )}
      </div>
    );
      break;
      case '6':
      return(<div><button onClick={this.props.showReport}>Volver</button><h4>6</h4></div>);
      break;
      default :
      return(<div><button onClick={this.props.showReport}>Volver</button>default</div>)
    }
    
  }
}

export default PdfGenerador