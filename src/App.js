import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      editId: null,
      newData: {
        name: '',
        email: '',
        phone: '',
      },
    };
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        this.setState({data: response.data});
      })
      .catch(error => {
        console.log(error);
      });
  }


  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
      newData: {
        ...prevState.newData,
        [name]: value,
      },
    }));
  }

  handleEdit(id){
    const data = this.state.data.find(obj => obj.id === id);

    this.setState({
      editId: id,
      newData: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    });
  }

  handleUpdate(id){
    const updatedData = [...this.state.data];
    const index = updatedData.findIndex(obj => obj.id === id);
    updatedData[index] = {
      ...updatedData[index],
      name: this.state.newData.name,
      email: this.state.newData.email,
      phone: this.state.newData.phone,
    };

    this.setState({
      data: updatedData,
      editId: null,
      newData: {
        name: '',
        email: '',
        phone: '',
      },
    });
  }

  render() {
    const { data, editId, newData } = this.state;

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map(obj => (
            <tr key={obj.id}>
              <td>{editId === obj.id ? (
                <input type="text" name="name" value={newData.name} onChange={this.handleInputChange} />
              ) : obj.name}</td>
              <td>{editId === obj.id ? (
                <input type="text" name="email" value={newData.email} onChange={this.handleInputChange} />
              ) : obj.email}</td>
              <td>{editId === obj.id ? (
                <input type="text" name="phone" value={newData.phone} onChange={this.handleInputChange} />
              ) : obj.phone}</td>
              <td className='text-center'>
                {editId !== obj.id ? (
                  <button className='btn' onClick={() => this.handleEdit(obj.id)}>Edit <i class="fa-solid fa-pen"></i> </button>
                ) : (
                  <>
                    <button className='btn btn-update' onClick={() => this.handleUpdate(obj.id)}>Update <i class="fa-solid fa-pen-nib"></i></button>
                    <button className='btn' onClick={() => this.setState({editId: null, newData: {name: '', email: '', phone: ''}})}>Cancel <i class="fa-solid fa-xmark"></i></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default App