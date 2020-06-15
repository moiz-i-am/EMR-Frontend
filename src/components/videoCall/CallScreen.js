import React, { Component } from "react";
import { Grid, Button, Image, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom";

import SyncingPrescriptionEditor from "./SyncingPrescriptionEditor";

class CallScreen extends Component {
  state = {
    stream: "",
    redirect: false,
    muted: false
  };

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.setState({ stream: stream });
        if (this.userVideo) {
          this.userVideo.srcObject = stream;
        }
        if (this.partnerVideo) {
          this.partnerVideo.srcObject = stream;
        }
      });
  }

  callEndHandler = () => {
    this.state.stream.getTracks().forEach(track => {
      track.stop();
    });
    this.setState({ redirect: true });
  };

  callMuteHandler = () => {
    this.state.stream.getAudioTracks()[0].enabled = false;
    this.setState({ muted: true });
  };

  callUnMuteHandler = () => {
    this.state.stream.getAudioTracks()[0].enabled = true;
    this.setState({ muted: false });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/"} />;
    }

    return (
      <div style={{ width: "100%" }}>
        {/* , backgroundImage: `url(${Background})` */}
        <Grid stackable columns={3} style={{ padding: 0, margin: 0 }} divided>
          <Grid.Column width={10} style={{ padding: 0 }}>
            <div className="partner-video" style={{ height: "670px" }}>
              <video
                style={{ width: "100%" }}
                playsInline
                ref={ref => {
                  this.partnerVideo = ref;
                }}
                autoPlay
              />
            </div>
          </Grid.Column>
          <Grid.Column width={5} style={{ padding: 0 }} divided>
            <Grid.Row>
              <div className="user-video" style={{ height: "280px" }}>
                <video
                  style={{ width: "100%" }}
                  playsInline
                  // muted
                  ref={ref => {
                    this.userVideo = ref;
                  }}
                  autoPlay
                />
              </div>
            </Grid.Row>
            <Grid.Row>
              <div
                style={{
                  backgroundColor: "#faed86",
                  height: "360px",
                  width: "100%",
                  position: "relative"
                }}
              >
                {/* <h3 style={{ backgroundColor: "#faed86", textAlign: "center" }}>
                  Write a prescription
                </h3>

                <textarea class="notes"></textarea>

                <div style={{ textAlign: "right", marginRight: "20px" }}>
                  <Button color="yellow">Save</Button>
                </div> */}
                {/* <SyncingPrescriptionEditor /> */}
              </div>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={1} style={{ padding: 0 }}>
            <div className="buttons" style={{ height: "670px" }}>
              <div style={{ paddingTop: "215px" }}>
                {this.state.muted === false ? (
                  <Button
                    animated="vertical"
                    // inverted
                    color="black"
                    style={{ width: "90%", height: "50px", margin: "5px" }}
                    onClick={() => this.callMuteHandler()}
                  >
                    <Button.Content hidden>Mute Call</Button.Content>
                    <Button.Content visible style={{ paddingTop: "5px" }}>
                      <Icon name="microphone slash" />
                    </Button.Content>
                  </Button>
                ) : null}

                {this.state.muted === true ? (
                  <Button
                    animated="vertical"
                    // inverted
                    color="black"
                    style={{ width: "90%", height: "50px", margin: "5px" }}
                    onClick={() => this.callUnMuteHandler()}
                  >
                    <Button.Content hidden>Unmute Call</Button.Content>
                    <Button.Content visible style={{ paddingTop: "5px" }}>
                      <Icon name="microphone" />
                    </Button.Content>
                  </Button>
                ) : null}

                <Button
                  animated="vertical"
                  inverted
                  color="red"
                  style={{ width: "90%", height: "50px", margin: "5px" }}
                  onClick={() => this.callEndHandler()}
                >
                  <Button.Content hidden>End Call</Button.Content>
                  <Button.Content visible style={{ paddingTop: "5px" }}>
                    <Icon name="call" />
                  </Button.Content>
                </Button>
              </div>
            </div>
          </Grid.Column>
          {/* <Grid.Row>
            
          </Grid.Row> */}
        </Grid>
      </div>
    );
  }
}

export default CallScreen;
