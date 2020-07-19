import React, { Component } from "react";
import {
  Input,
  Select,
  Button,
  GridColumn,
  Grid,
  Divider,
  Icon,
  Container
} from "semantic-ui-react";
import "../styles/styles.css";
import "../styles/bootstrap.min.css";
import { Link } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";

import DocCardSegment from "../components/cardSegments/DocCardSegment";

import image from "../assets/home1.jpg";
import image2 from "../assets/home2.jpg";

class Home extends Component {
  render() {
    return (
      <div>
        <div class="slider-area " style={{ background: "white", marginTop: 0 }}>
          <div class="slider-active">
            <div class="single-slider slider-height d-flex align-items-center">
              <div class="container">
                <div class="rows d-flex align-items-center">
                  <div class="col-lg-7 col-md-9 ">
                    <div class="hero__caption">
                      <Zoom>
                        <h1
                          style={{ color: "#8F58AF" }}
                          data-animation="fadeInLeft"
                          data-delay=".4s"
                        >
                          We provide
                          <br /> Best Assistance
                        </h1>
                        <p
                          style={{ color: "#113562" }}
                          data-animation="fadeInLeft"
                          data-delay=".6s"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Quis ipsum suspendisse ultrices
                          gravi.
                        </p>
                      </Zoom>
                    </div>
                  </div>

                  <div class="col-lg-5">
                    <div
                      class="hero__img d-none d-lg-block"
                      data-animation="fadeInRight"
                      data-delay="1s"
                    >
                      <Zoom>
                        <img
                          src={image}
                          style={{ height: "500px", paddingRight: "40px" }}
                          alt=""
                        />
                      </Zoom>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="generating-area ">
              <div class="container">
                <div class="rows d-flex justify-content-center">
                  <div class="col-lg-8">
                    <div class="section-tittle text-center">
                      <Fade top big>
                        <h2 style={{ color: "#8F58AF" }}> Serving You Via​​</h2>
                      </Fade>
                    </div>
                  </div>
                </div>
                <div class="rows">
                  <div class="col-lg-6 col-md-6">
                    <div class="single-generating d-flex mb-30">
                      <Fade left big>
                        <div class="generating-icon">
                          <span class="flaticon-chart"></span>
                        </div>
                        <div class="generating-cap">
                          <h4 style={{ color: "#8F58AF" }}>
                            {" "}
                            <Icon name="doctor" size="large" />
                            Doctors
                          </h4>
                          <p style={{ color: "#113562" }}>
                            Professional Doctors available at one click, all
                            time, everytime{" "}
                          </p>
                        </div>
                      </Fade>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="single-generating d-flex mb-30">
                      <Fade right big>
                        <div class="generating-icon">
                          <span class="flaticon-social-media-marketing"></span>
                        </div>
                        <div class="generating-cap">
                          <h4 style={{ color: "#8F58AF" }}>
                            {" "}
                            <Icon name="hospital" size="large" />
                            Hospitals
                          </h4>
                          <p style={{ color: "#113562" }}>
                            High Standard, Highly regarded hospitals are
                            affiliated with us{" "}
                          </p>
                        </div>
                      </Fade>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="single-generating d-flex mb-30">
                      <Fade left big>
                        <div class="generating-icon">
                          <span class="flaticon-speaker"></span>
                        </div>
                        <div class="generating-cap">
                          <h4 style={{ color: "#8F58AF" }}>
                            {" "}
                            <Icon name="lab" size="large" />
                            laboratories
                          </h4>
                          <p style={{ color: "#113562" }}>
                            Professional and go-to laboratories that are near to
                            your place{" "}
                          </p>
                        </div>
                      </Fade>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="single-generating d-flex mb-30">
                      <Fade right big>
                        <div class="generating-icon">
                          <span class="flaticon-growth"></span>
                        </div>
                        <div class="generating-cap">
                          <h4 style={{ color: "#8F58AF" }}>
                            {" "}
                            <Icon name="sticky note" size="large" />
                            Record Management
                          </h4>
                          <p style={{ color: "#113562" }}>
                            Hundreds of users benefit daily from our system, by
                            getting rid of old paper work{" "}
                          </p>
                        </div>
                      </Fade>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* rendring doctors etc */}

            <Container
              style={{ width: "90%", marginTop: "50px", marginBottom: "50px" }}
            >
              <h1 style={{ color: "#990099", fontWeight: "bolder" }}>
                Doctors
              </h1>
              <Divider />
              <Grid
                stackable
                textAlign="center"
                verticalAlign="middle"
                padded="vertically"
              >
                <Grid.Row columns="equal">
                  <Grid.Column width={15}>
                    <DocCardSegment />
                  </Grid.Column>
                  <Grid.Column>
                    <Link to="/listDoctors">
                      <Button
                        size="large"
                        icon="right arrow"
                        content="More"
                        style={{ backgroundColor: "#990099", color: "#FFFFFF" }}
                      />
                    </Link>
                  </Grid.Column>
                </Grid.Row>
                <Divider />
              </Grid>
            </Container>
            {/* rendring doctors etc ends */}

            <div class="we-create-area">
              <div class="container">
                <div class="rows d-flex align-items-end">
                  <div class="col-lg-6">
                    <div
                      class="we-create-img"
                      data-animation="fadeInRight"
                      data-delay="1s"
                    >
                      <img src={image2} style={{ height: "417px" }} alt="" />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-12">
                    <div class="we-create-cap">
                      <h3 style={{ color: "#8F58AF" }}>
                        We Create a Steps to Build a Successful Digital Product
                      </h3>
                      <p style={{ color: "#113562" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Quis ipsum suspendisse ultrices gravida.
                        Risus commodo viverra maecenas accumsan lacus vel
                        facilisis orem ipsum dolor sit amet, consectetur
                        adipiscing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Flip left>
              <div
                class="have-project"
                style={{ paddingTop: "75px", paddingBottom: "75px" }}
              >
                <div class="container">
                  <div
                    class="haveAproject"
                    style={{
                      background: "rgb(245,90,150)",
                      background:
                        "linear-gradient(90deg, rgba(245,90,150,1) 0%, rgba(139,0,175,1) 85%)"
                    }}
                  >
                    <div class="rows d-flex align-items-center">
                      <div class="col-xl-7 col-lg-9 col-md-12">
                        <div class="wantToWork-caption">
                          <h2>Have project in mind?</h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut.
                          </p>
                        </div>
                      </div>
                      <div class="col-xl-5 col-lg-3 col-md-12">
                        <div class="wantToWork-btn f-right">
                          <a href="#" class="btn btn-ans">
                            Contact Us
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Flip>
          </div>
        </div>
        {/* <Styles /> */}
      </div>
    );
  }
}

export default Home;
