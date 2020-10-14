import React from 'react';
import './Notes.css';
import 'materialize-css/dist/css/materialize.min.css';
import Note from './Note';
import M from 'materialize-css/dist/js/materialize.js';
import $ from 'jquery';

export default class Notes extends React.Component {

  state = {
    value: '',
    data: [
      { body: 'Первая заметка. (Удали меня)', id: 0, edit: false }
    ],
    max_id: 1,
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const new_entry = {};
    new_entry.body = this.state.value;
    new_entry.date = new Date().toLocaleString();
    new_entry.edit = false;
    if (this.state.value === '') {
      alert('Нельзя создать пустую заметку!');
      return;
    }
    new_entry.id = this.state.max_id;
    const new_data = this.state.data;
    new_data.push(new_entry)
    this.setState(({ max_id }) => ({
      value: '',
      data: new_data,
      max_id: max_id += 1,
      edit: false
    }));
    alert(`this was submited: ${this.state.value}`, this.state.max_id);
    console.log(this.state.data)
    $('#textarea1').val('');    
    M.textareaAutoResize($('#textarea1'));
  };

  handleDelete = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((item) => item.id === id);
      const prevArr = data.slice(0, idx);
      const postArr = data.slice(idx + 1);
      console.log(postArr)
      const newArr = [...prevArr, ...postArr];
      console.log(newArr)
      return {
        data: newArr
      }
    })
  }

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <h2>Заметки</h2>
        <p>Здесь описание</p>
        <div>
          <h3>Добавить заметку:</h3>
          <div className="row">
            <form className="col s12" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <textarea id="textarea1"
                            className="materialize-textarea"
                            value={this.state.value}
                            onChange={this.handleChange}
                            rows="5"
                            />
                  <button className="btn">Добавить</button>
                  <label htmlFor="textarea1">Новая заметка</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <ul>
         
          { data.length ? data.reverse().map((i, idx) => {
            return (
                <Note key={i.id} 
                  data={i}
                  handleDelete={() => this.handleDelete(i.id)}
                />
            )
          }):
          <h2>Нет Заметок</h2>} 
        </ul>
      </>
    );
  }
}