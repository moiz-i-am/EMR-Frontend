import React, { Component } from "react";
import Peer from "simple-peer";

class CallIncomingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yourID: this.props.location.socketIdProps,
      receivingCall: false,
      caller: this.props.location.callerProps,
      callerSignal: this.props.location.callerSignalProps,
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
  }

  render() {
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

export default CallIncomingScreen;
