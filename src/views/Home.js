import React, { Component } from "react";
import { Input, Select, Button, GridColumn, Grid, Divider, Icon, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import DoctorsList from "./DoctorsList";
import DocSegment from "../components/infoSegments/DocSegment";
import HospSegment from "../components/infoSegments/HospSegment";
import LabSegment from "../components/infoSegments/LabSegment";
import PatientSegment from "../components/infoSegments/PatientSegment";
import DocCardSegment from "../components/cardSegments/DocCardSegment";
import HospCardSegment from "../components/cardSegments/HospCardSegment";
import LabCardSegment from "../components/cardSegments/LabCardSegment";

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
      <Grid stackable textAlign='center' verticalAlign='middle' padded='vertically'>
        <Grid.Row>
          <GridColumn style={{ maxWidth: 500 }}>
            <Input fluid size='small' name="name" type='text' placeholder='Enter Name...' onChange={this.onChange} action value={this.state.name}>
            <input />
            <Select name="category" compact options={options} placeholder='Category...' onChange={this.onChangeSelect} value={this.state.category}/>
            <Button size='small' as={Link} to={{  pathname:'/search', 
                                                  state:{ name: this.state.name, 
                                                          category: this.state.category
                                                          }}}>Search</Button>
            </Input>
          </GridColumn>
        </Grid.Row>
        <Grid.Row columns='equal'>
          <Grid.Column>
            <DocSegment/>
          </Grid.Column>
          <Grid.Column>
            <HospSegment/>
          </Grid.Column>
        </Grid.Row>
        <Divider/>
        <Grid.Row columns='equal'>
          <Grid.Column>
            <LabSegment/>
          </Grid.Column>
          <Grid.Column>
            <PatientSegment/>
          </Grid.Column>
        </Grid.Row>
        <Divider/>
        <Grid.Row columns='equal'>
          <Grid.Column width={15}>
            <DocCardSegment/>
          </Grid.Column>
          <Grid.Column>
            <Button size='large' fluid icon='right arrow'/>
          </Grid.Column>
        </Grid.Row>
        <Divider/>
        <Grid.Row columns='equal'>
          <Grid.Column width={15}>
            <HospCardSegment/>
          </Grid.Column>
          <Grid.Column>
            <Button size='large' fluid icon='right arrow'/>
          </Grid.Column>
        </Grid.Row>
        <Divider/>
        <Grid.Row columns='equal'>
          <Grid.Column width={15}>
            <LabCardSegment/>
          </Grid.Column>
          <Grid.Column>
            <Button size='large' fluid icon='right arrow'/>
          </Grid.Column>
        </Grid.Row>
        <Divider/>
      </Grid>
    );
  }
}

export default Home;
