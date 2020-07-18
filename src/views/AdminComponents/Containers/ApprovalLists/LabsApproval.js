import React, { Component } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";

import LabApprovalCard from "../cards/LabApprovalCard";

class LabApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labs: []
    };
  }

  componentDidMount() {
    axios.get(`/v1/users`).then(res => {
      this.setState({ labs: res.data });
    });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.labs !== this.state.labs) {
  //     axios.get(`/v1/users`).then(res => {
  //       this.setState({ labs: res.data });
  //     });
  //   }
  // }

  render() {
    return (
      <Container style={{ width: "90%" }}>
        <div className="main_DocList-div" style={{ backgroundColor: "white" }}>
          {this.state.labs.length === 0 ? (
            <h1>No Doctors Found</h1>
          ) : (
            this.state.labs.map(labs => {
              if (labs.role === "lab") {
                if (labs.verified === false) {
                  return (
                    <div key={labs.id}>
                      <LabApprovalCard
                        labId={labs.id}
                        labName={labs.name}
                        labEmail={labs.email}
                        labSpec={labs.specializations}
                        labLocation={`${labs.location_city}, ${labs.location_state}, ${labs.location_country}`}
                      />
                    </div>
                  );
                }
              }
            })
          )}
        </div>
      </Container>
    );
  }
}

export default LabApproval;

//////////////////////// by hooks ///////////////////

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import { Container } from "semantic-ui-react";

// import LabApprovalCard from "../cards/LabApprovalCard";

// const LabsApproval = () => {
//   const [labs, setLabs] = useState({ labs: [] });

//   useEffect(() => {
//     axios
//       .get(`/v1/users`)
//       .then(res => {
//         setLabs({ labs: res.data });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   });

//   return (
//     <Container style={{ width: "90%" }}>
//       <div className="main_DocList-div" style={{ backgroundColor: "white" }}>
//         {labs.labs.length === 0 ? (
//           <h1>No Doctors Found</h1>
//         ) : (
//           labs.labs.map(lab => {
//             if (lab.role === "lab") {
//               if (lab.verified === false) {
//                 return (
//                   <div key={lab.id}>
//                     <LabApprovalCard
//                       labId={lab.id}
//                       labName={lab.name}
//                       labEmail={lab.email}
//                       labSpec={lab.specializations}
//                       labLocation={`${lab.location_city}, ${labs.location_state}, ${labs.location_country}`}
//                     />
//                   </div>
//                 );
//               }
//             }
//           })
//         )}
//       </div>
//     </Container>
//   );
// };

// export default LabsApproval;
