import React, { Component } from "react";
import axios from "axios";
import "./../styles/profileCards.css";

class ProfileCards extends Component {
  state = {
    persons: []
  };

  componentDidMount() {
    axios.get(`v1/users`).then(res => {
      console.log(res);
      this.setState({ persons: res.data });
    });
  }

  render() {
    return (
      /// working get........
      <div className="search">
        {this.state.persons.length === 0 ? (
          <h1>No Doctors Found</h1>
        ) : (
          this.state.persons.map(persons => (
            <div className="container" key={persons.id}>
              <div className="box">
                <div className="profile">
                  <div className="first_section">
                    <div className="section">
                      <div className="back"></div>
                    </div>
                    <div className="section">
                      <h2>{persons.name}</h2>
                      <p style={{ wordWrap: "break-word", width: "50%" }}>
                        lalksdlkajdlhaskjdhaksjhdkjahdkjahdkjhsakjdhakjsdajsdkasdkj
                      </p>
                      <div className="specializations">
                        <h5>nice move</h5>
                        <h5>wtf</h5>
                        <h5>sameer</h5>
                      </div>
                    </div>
                  </div>
                  <div className="second_section">
                    <div className="ratings"></div>
                    <div className="location">
                      <div className="loc">L</div>
                      <div className="loc">Islamabad</div>
                    </div>
                    <div className="check_fee">
                      <div className="fee">F</div>
                      <div className="fee">3000 -/Rs</div>
                    </div>
                  </div>
                </div>
                <div className="third_section">
                  <button>View Profile</button>
                  <button>Book Appointment</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      //setup

      //   <div class="container testimonials">
      //     <div class="row">
      //       <div class="col-md-4 testimonial">
      //         <div class="row">
      //           <div class="avatar col-md-5">
      //             <a href="#">
      //               <img
      //                 class="img-circle"
      //                 src="https://bootdey.com/img/Content/user_3.jpg"
      //                 alt="Taylor Otwell"
      //               />
      //             </a>
      //           </div>

      //           <div class="testimonial-main col-md-7">
      //             <h4 class="media-heading">
      //               <a href="#m">Owenl Ollyt</a>
      //             </h4>
      //             <p class="testimony-body">bootstrap rules!</p>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
    );
  }
}

export default ProfileCards;
