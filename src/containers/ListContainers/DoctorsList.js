import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Segment,
  Dimmer,
  Loader,
  Image,
  Button
} from "semantic-ui-react";

import SearchDoctorStack from "../../components/SearchBar/SearchDoctorStack";
import Filter from "../../components/SearchBar/Filter";

class DoctorsList extends Component {
  state = {
    persons: [],
    word: "",
    filterDisplay: [],
    loading: false,
    searchButton: false
  };

  componentDidMount() {
    axios.get(`v1/users`).then(res => {
      this.setState({ loading: true });
      setTimeout(() => {
        const doctors = res.data.filter(function(doc) {
          return doc.role == "doctor";
        });
        this.setState({ loading: false, persons: doctors });
      }, 2000);
    });
  }

  handleChange = e => {
    this.setState({
      word: e
    });

    let oldList = this.state.persons.map(person => {
      return {
        id: person.id,
        name: person.name.toLowerCase(),
        rating: person.rating,
        email: person.email.toLowerCase(),
        specializations: person.specializations,
        location_city: person.location_city.toLowerCase(),
        location_state: person.location_state.toLowerCase(),
        price: person.price,
        location_state: person.location_state.toLowerCase()
      };
    });

    if (this.state.word !== "") {
      let newList = [];

      newList = oldList.filter(person => person.name.includes(this.state.word));

      this.setState({
        filterDisplay: newList
      });
    } else {
      this.setState({
        filterDisplay: this.state.persons
      });
    }
  };

  handleSearch = () => {
    this.setState({
      searchButton: true
    });
  };

  render() {
    console.log(this.state.persons);
    return (
      <Container style={{ width: "90%" }}>
        <div
          className="main_DocList-div"
          style={{ backgroundColor: "#F7F7F7" }}
        >
          <Button
            circular
            icon="search"
            onClick={() => this.handleSearch()}
            style={{ width: "10%", marginTop: "20px" }}
          />
          {this.state.searchButton ? (
            <Filter
              value={this.state.word}
              handleChange={e => this.handleChange(e.target.value)}
            />
          ) : null}
          {this.state.persons.length === 0 ? (
            this.state.loading ? null : (
              <h1>No Doctors Found</h1>
            )
          ) : (
            <SearchDoctorStack
              persons={
                this.state.word.length < 1
                  ? this.state.persons
                  : this.state.filterDisplay
              }
            />
          )}
        </div>
        {this.state.loading ? (
          <Segment>
            <Dimmer active inverted>
              <Loader size="massive">Loading</Loader>
            </Dimmer>

            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        ) : null}
      </Container>
    );
  }
}

export default DoctorsList;
