import React, { Component } from "react";
import { Input, Select, Button, GridColumn, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DoctorsList from "./DoctorsList";

const options = [
  { key: 'doctor', text: 'Doctor', value: 'doctor' },
  { key: 'hospital', text: 'Hospital', value: 'hospital' },
  { key: 'lab', text: 'Lab', value: 'lab' },
]

const initialState = {
  category: "",
  name: ""
}

export class Home extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;

    this.searchHandler = this.searchHandler.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  onChangeSelect = (e, {value}) => {
    this.setState({ category: value })
  }

  searchHandler = () => {
    const searchParams = {
      category: this.state.category,
      name: this.state.name
    };
    //<DoctorsList searchName={searchParams.name} searchCategory={searchParams.category}/>
  }

  render() {
    const{category} = this.state
    return (
      <Grid textAlign='center' verticalAlign='middle' padded='vertically'>
        <GridColumn style={{ maxWidth: 500 }}>
          <Input fluid size='small' name="name" type='text' placeholder='Enter Name...' onChange={this.onChange} action value={this.state.name}>
          <input />
          <Select name="category" compact options={options} placeholder='Category...' onChange={this.onChangeSelect} value={this.state.category}/>
          <Button size='small' as={Link} to={{ pathname:'/listDoctors',
                                  state:{ name: this.state.name, 
                                          category: this.state.category}
                                }}>Search</Button>
          </Input>
        </GridColumn>
      </Grid>
    );
  }
}

export default Home;
