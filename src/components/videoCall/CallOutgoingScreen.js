// import React, { Component } from "react";
// import Peer from "simple-peer";

// class CallOutgoingScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       yourID: this.props.location.socketIdProps,
//       receivingCall: false,
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

//     // this.props.location.socketCurrentProps.on("hey", data => {
//     //   this.setState({ receivingCall: true });
//     // });
//     setTimeout(() => {
//       const peer = new Peer({
//         initiator: true,
//         trickle: false,
//         stream: this.state.stream
//       });
//       peer.on("signal", data => {
//         this.props.location.socketCurrentProps.emit("callUser", {
//           userToCall: this.props.location.partnerSocketIdProps,
//           signalData: data,
//           from: this.state.yourID
//         });
//       });

//       peer.on("stream", stream => {
//         if (this.partnerVideo) {
//           console.log("partner ahsdjasdkasjhdkjh");
//           this.partnerVideo.srcObject = stream;
//         }
//       });
//       this.props.location.socketCurrentProps.on("callAccepted", signal => {
//         this.setState({ callAccepted: true });
//         peer.signal(signal);
//       });
//     }, 2000);
//   }

//   // componentDidUpdate() {
//   //   ////////////////// call sending working fine //////////////
//   //   const peer = new Peer({
//   //     initiator: true,
//   //     trickle: false,
//   //     stream: this.state.stream
//   //   });
//   //   peer.on("signal", data => {
//   //     this.props.location.socketCurrentProps.emit("callUser", {
//   //       userToCall: this.props.location.partnerSocketIdProps,
//   //       signalData: data,
//   //       from: this.state.yourID
//   //     });
//   //   });

//   //   peer.on("stream", stream => {
//   //     if (this.partnerVideo) {
//   //       console.log("partner ahsdjasdkasjhdkjh");
//   //       this.partnerVideo.srcObject = stream;
//   //     }
//   //   });
//   //   this.props.location.socketCurrentProps.on("callAccepted", signal => {
//   //     this.setState({ callAccepted: true });
//   //     peer.signal(signal);
//   //   });
//   // }

//   render() {
//     console.log(
//       "socketID call screen: " +
//         this.state.yourID +
//         " sa:  " +
//         this.props.location.socketCurrentProps
//     );
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

// export default CallOutgoingScreen;

import React, { Component } from "react";
import Peer from "simple-peer";
import { Grid, Button, Image } from "semantic-ui-react";

import EndCallIcon from "../../assets/end-call.png";
import MuteCallIcon from "../../assets/mute.png";
import Background from "../../assets/call-background.jpg";

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

    console.log(
      "socketID call screen: " +
        this.state.yourID +
        " sa:  " +
        this.props.location.socketCurrentProps +
        " partner ID:  " +
        this.props.location.partnerSocketIdProps
    );
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

export default CallOutgoingScreen;
