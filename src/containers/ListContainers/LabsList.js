import React, { Component } from "react";
// import ProfileCards from "./DoctorsProfileCards";
import axios from "axios";
import {
  Container,
  Segment,
  Dimmer,
  Loader,
  Image,
  Button
} from "semantic-ui-react";

import SearchLabStack from "../../components/SearchBar/SearchLabStack";
import Filter from "../../components/SearchBar/Filter";

class LabsList extends Component {
  state = {
    labs: [],
    word: "",
    filterDisplay: [],
    loading: false,
    searchButton: false
  };

  componentDidMount() {
    axios.get(`v1/lab`).then(res => {
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
        // console.log( o )
        this.setState({ loading: false, labs: removeEmptyOrNull(res.data) });
      }, 2000);
    });
  }

  handleChange = e => {
    this.setState({
      word: e
    });

    let oldList = this.state.labs.map(lab => {
      return {
        id: lab.id,
        name: lab.name,
        email: lab.email,
        location_city: lab.location_city,
        location_state: lab.location_state,
        location_country: lab.location_country
      };
    });

    if (this.state.word !== "") {
      let newList = [];

      newList = oldList.filter(lab => lab.name.includes(this.state.word));

      this.setState({
        filterDisplay: newList
      });
    } else {
      this.setState({
        filterDisplay: this.state.labs
      });
    }
  };

  handleSearch = () => {
    this.setState({
      searchButton: true
    });
  };

  render() {
    console.log(this.state.labs);
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
          {this.state.labs.length === 0 ? (
            this.state.loading ? null : (
              <h1>No Labs Found</h1>
            )
          ) : (
            <SearchLabStack
              LabPersons={
                this.state.word.length < 1
                  ? this.state.labs
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

export default LabsList;
