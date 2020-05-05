import React, { Component } from "react";
import Peer from "simple-peer";

class CallOutgoingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yourID: this.props.location.socketIdProps,
      receivingCall: false,
      stream: "",
      callAccepted: false
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

    // this.props.location.socketCurrentProps.on("hey", data => {
    //   this.setState({ receivingCall: true });
    // });
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

  // componentDidUpdate() {
  //   ////////////////// call sending working fine //////////////
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream: this.state.stream
  //   });
  //   peer.on("signal", data => {
  //     this.props.location.socketCurrentProps.emit("callUser", {
  //       userToCall: this.props.location.partnerSocketIdProps,
  //       signalData: data,
  //       from: this.state.yourID
  //     });
  //   });

  //   peer.on("stream", stream => {
  //     if (this.partnerVideo) {
  //       console.log("partner ahsdjasdkasjhdkjh");
  //       this.partnerVideo.srcObject = stream;
  //     }
  //   });
  //   this.props.location.socketCurrentProps.on("callAccepted", signal => {
  //     this.setState({ callAccepted: true });
  //     peer.signal(signal);
  //   });
  // }

  render() {
    console.log(
      "socketID call screen: " +
        this.state.yourID +
        " sa:  " +
        this.props.location.socketCurrentProps
    );
    return (
      <div className="call-screen">
        <div className="video-partner" style={{ border: "1px solid white" }}>
          <video
            width="100%"
            height="100%"
            playsInline
            ref={ref => {
              this.partnerVideo = ref;
            }}
            autoPlay
          />
          <div
            style={{
              position: "absolute",
              bottom: -50,
              right: 0,
              border: "1px solid white"
            }}
          >
            <video
              width="100%"
              height="220"
              playsInline
              muted
              ref={ref => {
                this.userVideo = ref;
              }}
              autoPlay
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CallOutgoingScreen;
