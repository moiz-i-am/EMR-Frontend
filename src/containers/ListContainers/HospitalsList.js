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

import SearchHospitalStack from "../../components/SearchBar/SearchHospitalStack";
import Filter from "../../components/SearchBar/Filter";

class HospitalsList extends Component {
  state = {
    hospitals: [],
    word: "",
    filterDisplay: [],
    loading: false,
    searchButton: false
  };

  componentDidMount() {
    axios.get(`v1/hospital`).then(res => {
      this.setState({ loading: true });
      const removeEmptyOrNull = obj => {
        Object.keys(obj).forEach(
          k =>
            (obj[k] &&
              typeof obj[k] === "object" &&
              removeEmptyOrNull(obj[k])) ||
            (!obj[k] && obj[k] !== undefined && delete obj[k])
        );
        return obj;
      };
      setTimeout(() => {
        this.setState({
          loading: false,
          hospitals: removeEmptyOrNull(res.data)
        });
      }, 2000);
    });
  }

  handleChange = e => {
    this.setState({
      word: e
    });

    let oldList = this.state.hospitals.map(hospital => {
      return {
        id: hospital.id,
        name: hospital.name,
        email: hospital.email,
        location_city: hospital.location_city,
        location_state: hospital.location_state,
        location_country: hospital.location_country
      };
    });

    if (this.state.word !== "") {
      let newList = [];

      newList = oldList.filter(hospital =>
        hospital.name.includes(this.state.word)
      );

      this.setState({
        filterDisplay: newList
      });
    } else {
      this.setState({
        filterDisplay: this.state.hospitals
      });
    }
  };

  handleSearch = () => {
    this.setState({
      searchButton: true
    });
  };

  render() {
    console.log(this.state.hospitals);
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
          {/* <Filter
            value={this.state.word}
            handleChange={e => this.handleChange(e.target.value)}
          /> */}
          {this.state.hospitals.length === 0 ? (
            this.state.loading ? null : (
              <h1>No Hospital Found</h1>
            )
          ) : (
            <SearchHospitalStack
              HospitalPersons={
                this.state.word.length < 1
                  ? this.state.hospitals
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

export default HospitalsList;
