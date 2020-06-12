import React, { Component } from "react";
import Peer from "simple-peer";
import { Redirect } from "react-router-dom";
import { Grid, Button, Icon } from "semantic-ui-react";

import SyncingPrescriptionEditor from "./SyncingPrescriptionEditor";

class CallOutgoingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myId: this.props.location.userId,
      partnerId: "",
      yourID: this.props.location.socketIdProps,
      receivingCall: false,
      stream: "",
      callAccepted: false,
      redirect: false,
      muted: false
    };
  }

  componentDidMount() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.setState({ stream: stream });
        if (this.userVideo) {
          this.userVideo.srcObject = stream;
        }
      });

    setTimeout(() => {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: this.state.stream
      });
      peer.on("signal", data => {
        this.props.location.socketCurrentProps.emit("callUser", {
          userToCall: this.props.location.partnerSocketIdProps,
          signalData: data,
          from: this.state.yourID
        });
      });

      peer.on("stream", stream => {
        if (this.partnerVideo) {
          console.log("partner ahsdjasdkasjhdkjh");
          this.partnerVideo.srcObject = stream;
        }
      });
      this.props.location.socketCurrentProps.on("callAccepted", signal => {
        this.setState({ callAccepted: true });
        peer.signal(signal);
      });
    }, 2000);
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
    console.log(
      "my id: " +
        this.state.myId +
        "socketID call screen: " +
        this.state.yourID +
        " sa:  " +
        this.props.location.socketCurrentProps +
        " partner ID:  " +
        this.props.location.partnerSocketIdProps
    );

    if (this.state.redirect) {
      return <Redirect push to={`/dashboard/${this.state.myId}`} />;
    }

    return (
      <div style={{ width: "100%" }}>
        <Grid columns={3} style={{ padding: 0, margin: 0 }} divided>
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
                  muted
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
                <SyncingPrescriptionEditor
                  currentSocket={this.props.location.socketCurrentProps}
                  partnerSocketId={this.props.location.partnerSocketIdProps}
                  partnerId={this.props.location.partnerIdProps}
                  partnerName={this.props.location.partnerNameProps}
                />
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
        </Grid>
      </div>
    );
  }
}

export default CallOutgoingScreen;
