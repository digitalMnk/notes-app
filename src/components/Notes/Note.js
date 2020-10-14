import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.js';
import $ from 'jquery';


export default class Note extends Component {

  state = {
    value: this.props.data.body,
    isInEditMode: false,
    data: this.props.data
  }

  componentDidMount() {
    M.AutoInit();
    const id = this.state.data.id;
    
    $('#' + id).val('');
    M.textareaAutoResize($('#' + id));
  }

  // Добавить вывод даты редактирования

  // defaultView = () => {
  //   const { handleDelete } = this.props;
  //   const { data } = this.state;
  //   return (
  //     <div className="card blue-grey darken-1 col s10 m6 note">
  //       <i id={data.id} className="material-icons delete-icon"
  //         onClick={handleDelete}>delete</i>
  //       <i id={data.id} className="material-icons"
  //         onClick={this.handleChangeMode}>edit</i>
  //       <div className="card-content white-text">
  //         {/* <span className="card-title">Card Title</span> */}
  //         <pre className="text-format">   
  //           <div className="card-body">
  //             <p>{data.body}</p>
  //             <br/>
  //           </div>
  //         </pre>
  //         <p className="date-typography">{data.date}</p>  
  //       </div>
  //     </div>
  //   )
  // }
  defaultView = () => {
    const { handleDelete } = this.props;
    const { data } = this.state;
    return (
      <div className="card blue-grey darken-1 col s10 m6 note">
        <i className="material-icons"
          onClick={handleDelete}>delete</i>
        <i className="material-icons"
          onClick={this.handleChangeMode}>edit</i>
        {/* <div class="row"> */}
        <div className="input-field col">
          <textarea placeholder={this.state.value}
            style={{ width: '80%'}}
            id={data.id}
            type="text"
            className="materialize-textarea white-text"
            value={this.state.value}
            onChange={this.handleChange}
            readOnly />
          {/* <div > */}
            <i style={{marginLeft: '1rem'}} className="material-icons"
              onClick={this.handleSaveChanges}>save</i>
            <i className="material-icons"
              onClick={this.handleCancelChanges}>cancel</i>
          {/* </div> */}
          {/* <label htmlFor="Редактировать">Редактировать</label> */}
        </div>
      </div>
      // </div>
    )
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  handleSaveChanges = () => {
    const { data } = this.props;
    const newData = { ...data, body: this.state.value, date: 'Отредактировано ' + new Date().toLocaleString() };
    console.log(newData)
    this.setState({
      data: newData,
      isInEditMode: false
    })
  }

  handleCancelChanges = () => {
    this.setState({
      value: this.state.data.body,
      data: this.state.data,
      isInEditMode: false
    })
  }

  componentDidUpdate() {
    const id = this.state.data.id;
    M.textareaAutoResize($('#' + id));
  }

  editView = () => {
    const { handleDelete, data } = this.props;
    
    return (
      <div className="card blue-grey darken-1 col s10 m6 note">
        <i className="material-icons"
          onClick={handleDelete}>delete</i>
        <i className="material-icons"
          style={{color: "yellow",}}
          onClick={this.handleChangeMode}>edit</i>
        {/* <div class="row"> */}
        <div className="input-field col">
          <textarea placeholder={this.state.value}
            style={{ width: '80%', borderBottom: '1px solid yellow'}}
            id={data.id}
            type="text"
            className="materialize-textarea white-text"
            value={this.state.value}
            onChange={this.handleChange}
            />
          {/* <div > */}
            <i style={{marginLeft: '1rem'}} className="material-icons"
              onClick={this.handleSaveChanges}>save</i>
            <i className="material-icons"
              onClick={this.handleCancelChanges}>cancel</i>
          {/* </div> */}

          {/* <label htmlFor="Редактировать">Редактировать</label> */}
        </div>
      </div>
      // </div>
    )
  }

  handleChangeMode = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    })
  }

  render() {
    const { data } = this.state;
    return (
      <li className="row" key={data.id}>
        {!this.state.isInEditMode ?
          this.defaultView() :
          this.editView()}
      </li>
    )
  }
}