import React, { Component } from "react";
import Peer from "simple-peer";
import { Redirect } from "react-router-dom";
import { Grid, Button, Icon } from "semantic-ui-react";

// import "../../styles/notes.style.css";
import SyncingPrescriptionEditor from "./SyncingPrescriptionEditor";
import RateDoctor from "./RateDoctor";

class CallIncomingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myId: this.props.location.userId,
      // partnerUId: this.props.location.partnerIdProps,
      yourID: this.props.location.socketIdProps,
      receivingCall: false,
      caller: this.props.location.callerProps,
      callerSignal: this.props.location.callerSignalProps,
      stream: "",
      callAccepted: false,
      redirect: false,
      muted: false,
      ratedoctor: false
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
      /////////////////////// call accept ////////////
      this.setState({ callAccepted: true });
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: this.state.stream
      });
      peer.on("signal", data => {
        this.props.location.socketCurrentProps.emit("acceptCall", {
          signal: data,
          to: this.state.caller
        });
      });

      peer.on("stream", stream => {
        this.partnerVideo.srcObject = stream;
      });

      peer.signal(this.state.callerSignal);
    }, 2000);

    this.props.location.socketCurrentProps.on("new-call-end", data => {
      // this.setState({ redirect: true });
      if (this.props.location.role === "patient") {
        this.setState({ ratedoctor: true });
      } else {
        this.setState({ redirect: true });
      }
    });
  }

  callEndHandler = () => {
    this.state.stream.getTracks().forEach(track => {
      track.stop();
    });

    this.props.location.socketCurrentProps.emit("call-ending", {
      partnerId: this.state.caller
    });
    if (this.props.location.role === "patient") {
      this.setState({ ratedoctor: true });
    } else {
      this.setState({ redirect: true });
    }
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
    console.log("partner user Id: " + this.props.location.partnerUid);

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
        {this.state.ratedoctor ? (
          <RateDoctor
            myId={this.state.myId}
            partnerId={this.props.location.partnerIdProps}
          />
        ) : null}
      </div>
    );
  }
}

export default CallIncomingScreen;
