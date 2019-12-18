import React, { Component } from "react";
import InputMess from "../InputMess/InputMess";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, ListGroup, Col, Container, Button} from 'react-bootstrap'
import './Chat.css'
import io from 'socket.io-client'
import { Link } from "react-router-dom";



export default class Chat extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      user: this.props.user.username,
      messages: [],
      userList: [],
    };

    // Recibimos el socket por props, se creó en ChatComponent.js
    this.socket = io('http://192.168.96.121:5000')

    // Creamos un ".on" que escuchará los mensajes nuevos
    this.socket.on("newMessage", message => {
      let mess = this.state.messages;
      mess.push(message);
      this.setState({ ...this.state, messages: mess });
    });

    this.socket.on("list", userList => {
      this.setState({ ...this.state, userList: userList });
    });

  }

  // Este método recibe los textos que vienen del Input de los mensajes en el chat
  sendMessage = text => {
    if(text.trim()==="")return
    let mess = {
      text: text,
      user: this.props.user.username
    };
    // Este ".emit" le envia al server los mensajes que escribamos
    // El server se encargará de propagarlos
    this.socket.emit("messageSent", mess);
  };

  // Con este método nos aseguramos de que el cuadro de chat tenga siempre el scroll
  // abajo, de esta manera el scroll no volverá arriba si el contenedor de mensajes
  // se llena por completo
  componentDidUpdate=()=>{
    document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight
  }

  componentDidMount=()=>{
    this.socket.emit("newUser", this.props.user.username)
  }

  // Renderiza la lista de usuarios, el box con el chat y el input para poder escribir mensajes.
  render() {
    console.log(this.state);
    return (
      <div>
      <div className="wrapper">
        <Link to="/search">
      <Button className="b-chat">Go to Back</Button>
        </Link>
        </div>
      <Container id="cont">
        <Row>

          {/* Lista de usuarios */}
          <Col sm={3} id="userList">
            <h5>ACTIVE USERS:</h5>
            <ListGroup>
              {this.state.userList.map((elem, idx) => {
                return elem===this.state.user ?
                  <ListGroup.Item key={idx}><b>{elem}</b></ListGroup.Item>
                  :
                  <ListGroup.Item key={idx}>{elem}</ListGroup.Item>
              })}
            </ListGroup>
          </Col>

          {/* Box que contiene el chat */}
          <Col sm={9}>
            <div className="chatBox" id="chatBox">
              {this.state.messages.map((elem, idx) => {
                return (
                  <h6 key={idx}>
                    {elem.user} : {elem.text}
                  </h6>
                );
              })}
            </div>

            {/* Input para nuevos mensajes */}
            <div className="textForm">
              <InputMess info={this.sendMessage}></InputMess>
            </div>
          </Col>
        </Row>
       </Container>
       <br></br>
      </div>
    );
  }
}
