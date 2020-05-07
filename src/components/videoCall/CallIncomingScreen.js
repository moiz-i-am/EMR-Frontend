// import React, { Component } from "react";
// import Peer from "simple-peer";

// class CallIncomingScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       yourID: this.props.location.socketIdProps,
//       receivingCall: false,
//       caller: this.props.location.callerProps,
//       callerSignal: this.props.location.callerSignalProps,
//       stream: "",
//       callAccepted: false
//     };
//   }

//   componentDidMount() {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then(stream => {
//         this.setState({ stream: stream });
//         if (this.userVideo) {
//           this.userVideo.srcObject = stream;
//         }
//       });

//     setTimeout(() => {
//       /////////////////////// call accept ////////////
//       this.setState({ callAccepted: true });
//       const peer = new Peer({
//         initiator: false,
//         trickle: false,
//         stream: this.state.stream
//       });
//       peer.on("signal", data => {
//         this.props.location.socketCurrentProps.emit("acceptCall", {
//           signal: data,
//           to: this.state.caller
//         });
//       });

//       peer.on("stream", stream => {
//         this.partnerVideo.srcObject = stream;
//       });

//       peer.signal(this.state.callerSignal);
//     }, 2000);
//   }

//   render() {
//     return (
//       <div className="call-screen">
//         <div className="video-partner" style={{ border: "1px solid white" }}>
//           <video
//             width="100%"
//             height="100%"
//             playsInline
//             ref={ref => {
//               this.partnerVideo = ref;
//             }}
//             autoPlay
//           />
//           <div
//             style={{
//               position: "absolute",
//               bottom: -50,
//               right: 0,
//               border: "1px solid white"
//             }}
//           >
//             <video
//               width="100%"
//               height="220"
//               playsInline
//               muted
//               ref={ref => {
//                 this.userVideo = ref;
//               }}
//               autoPlay
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default CallIncomingScreen;

import React, { Component } from "react";
import Peer from "simple-peer";
import { Grid, Button, Image } from "semantic-ui-react";

import EndCallIcon from "../../assets/end-call.png";
import MuteCallIcon from "../../assets/mute.png";
import Background from "../../assets/call-background.jpg";

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
    //////////// style ///////////////////
    // const fixedContainer = {
    //   backgroundColor: "#ddd",
    //   position: "fixed",
    //   width: "458px",
    //   height: "248px",
    //   left: "73.5%",
    //   top: "0%",
    //   marginLeft: "-100px",
    //   zIndex: "300000"
    // };

    return (
      <div style={{ width: "100%", backgroundImage: `url(${Background})` }}>
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
              {/* <div
                style={{ position: "absolute", bottom: "92px", left: "47%" }}
              >
                <Button basic color="red" style={{ width: "50%" }}>
                  <Image src={EndCallIcon} />
                </Button>
              </div> */}
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
                  backgroundColor: "#6c757d",
                  height: "360px",
                  width: "100%",
                  position: "relative"
                }}
              ></div>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={1} style={{ padding: 0 }}>
            <div className="buttons" style={{ height: "670px" }}>
              <div style={{ paddingTop: "215px" }}>
                <Button basic color="black" style={{ margin: "5px" }}>
                  <Image src={MuteCallIcon} />
                </Button>
                <Button basic color="red" style={{ margin: "5px" }}>
                  <Image src={EndCallIcon} />
                </Button>
              </div>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default CallIncomingScreen;
