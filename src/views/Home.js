import React, { Component } from "react";
import {
  Input,
  Select,
  Button,
  GridColumn,
  Grid,
  Divider,
  Icon,
  Header,
  Container
} from "semantic-ui-react";
import "../styles/styles.css";
import "../styles/bootstrap.min.css";
import { Link } from "react-router-dom";

// import Styles from "../styles/style";
// import BootStyles from "../styles/boot.style";

import DocCardSegment from "../components/cardSegments/DocCardSegment";
import HospCardSegment from "../components/cardSegments/HospCardSegment";
import LabCardSegment from "../components/cardSegments/LabCardSegment";
import image from "../assets/doc.jpg";
import image2 from "../assets/doc-pc.jpg";

const options = [
  { key: "doctor", text: "Doctor", value: "doctor" },
  { key: "hospital", text: "Hospital", value: "hospital" },
  { key: "lab", text: "Lab", value: "lab" }
];

const initialState = {
  category: "",
  name: ""
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;

    this.searchHandler = this.searchHandler.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeSelect = (e, { value }) => {
    this.setState({ category: value });
  };

  searchHandler = () => {
    const searchParams = {
      category: this.state.category,
      name: this.state.name
    };
    //<DoctorsList searchName={searchParams.name} searchCategory={searchParams.category}/>
  };

  render() {
    return (
      <div>
        {/* 
        <BootStyles /> */}
        <Container style={{ width: "90%" }}>
          <Grid
            stackable
            textAlign="center"
            verticalAlign="middle"
            padded="vertically"
          >
            <Grid.Row>
              <GridColumn style={{ maxWidth: 500 }}>
                <Input
                  fluid
                  size="small"
                  name="name"
                  type="text"
                  placeholder="Enter Name..."
                  onChange={this.onChange}
                  action
                  value={this.state.name}
                >
                  <input />
                  <Select
                    name="category"
                    compact
                    options={options}
                    placeholder="Category..."
                    onChange={this.onChangeSelect}
                    value={this.state.category}
                  />
                  <Button
                    size="small"
                    as={Link}
                    to={{
                      pathname: "/search",
                      state: {
                        name: this.state.name,
                        category: this.state.category
                      }
                    }}
                  >
                    Search
                  </Button>
                </Input>
              </GridColumn>
            </Grid.Row>
          </Grid>
        </Container>
        <div class="slider-area " style={{ background: "white", marginTop: 0 }}>
          <div class="slider-active">
            <div
              class="single-slider slider-height d-flex align-items-center"
              data-background="assets/img/hero/h1_hero.png"
            >
              <div class="container">
                <div class="rows d-flex align-items-center">
                  <div class="col-lg-7 col-md-9 ">
                    <div class="hero__caption">
                      <h1 data-animation="fadeInLeft" data-delay=".4s">
                        We Collect
                        <br /> High Quality Leads
                      </h1>
                      <p data-animation="fadeInLeft" data-delay=".6s">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Quis ipsum suspendisse ultrices gravi.
                      </p>

                      <div
                        class="hero__btn"
                        data-animation="fadeInLeft"
                        data-delay=".8s"
                      >
                        <a href="industries.html" class="btn hero-btn">
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5">
                    <div
                      class="hero__img d-none d-lg-block"
                      data-animation="fadeInRight"
                      data-delay="1s"
                    >
                      <img src={image} style={{ height: "500px" }} alt="" />
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
                      <h2> We are serving you Via​​</h2>
                    </div>
                  </div>
                </div>
                <div class="rows">
                  <div class="col-lg-6 col-md-6">
                    <div class="single-generating d-flex mb-30">
                      <div class="generating-icon">
                        <span class="flaticon-chart"></span>
                      </div>
                      <div class="generating-cap">
                        <h4>
                          {" "}
                          <Icon name="doctor" size="large" />
                          Doctors
                        </h4>
                        <p>
                          Professional Doctors available at one click, all time,
                          everytime{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="single-generating d-flex mb-30">
                      <div class="generating-icon">
                        <span class="flaticon-social-media-marketing"></span>
                      </div>
                      <div class="generating-cap">
                        <h4>
                          {" "}
                          <Icon name="hospital" size="large" />
                          Hospitals
                        </h4>
                        <p>
                          High Standard, Highly regarded hospitals are
                          affiliated with us{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="single-generating d-flex mb-30">
                      <div class="generating-icon">
                        <span class="flaticon-speaker"></span>
                      </div>
                      <div class="generating-cap">
                        <h4>
                          {" "}
                          <Icon name="lab" size="large" />
                          laboratories
                        </h4>
                        <p>
                          Professional and go-to laboratories that are near to
                          your place{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="single-generating d-flex mb-30">
                      <div class="generating-icon">
                        <span class="flaticon-growth"></span>
                      </div>
                      <div class="generating-cap">
                        <h4>
                          {" "}
                          <Icon name="user" size="large" />
                          Patients
                        </h4>
                        <p>
                          Hundreds of users benefit daily from our system,
                          staying healthy{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* rendring doctors etc */}
            <Container style={{ width: "90%" }}>
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
                      <Button size="large" fluid icon="right arrow" />
                    </Link>
                  </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row columns="equal">
                  <Grid.Column width={15}>
                    <HospCardSegment />
                  </Grid.Column>
                  <Grid.Column>
                    <Button size="large" fluid icon="right arrow" />
                  </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row columns="equal">
                  <Grid.Column width={15}>
                    <LabCardSegment />
                  </Grid.Column>
                  <Grid.Column>
                    <Button size="large" fluid icon="right arrow" />
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
                      <h3>
                        We Create a Steps to Build a Successful Digital Product
                      </h3>
                      <p>
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

            <div class="what-we-do we-padding">
              <div class="container">
                <div class="rows d-flex justify-content-center">
                  <div class="col-lg-8">
                    <div class="section-tittle text-center">
                      <h2>What We Will Do For Your Business​</h2>
                    </div>
                  </div>
                </div>
                <div class="rows">
                  <div class="col-lg-4 col-md-6">
                    <div class="single-do text-center mb-30">
                      <div class="do-icon">
                        <span class="flaticon-tasks"></span>
                      </div>
                      <div class="do-caption">
                        <h4>Link Building</h4>
                        <p>
                          Hunky dory barney fanny around up the duff no biggie
                          loo cup of tea jolly good ruddy say arse!
                        </p>
                      </div>
                      <div class="do-btn">
                        <a href="#">
                          <i class="ti-arrow-right"></i> get started
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <div class="single-do active text-center mb-30">
                      <div class="do-icon">
                        <span class="flaticon-social-media-marketing"></span>
                      </div>
                      <div class="do-caption">
                        <h4>Content marketing</h4>
                        <p>
                          Hunky dory barney fanny around up the duff no biggie
                          loo cup of tea jolly good ruddy say arse!
                        </p>
                      </div>
                      <div class="do-btn">
                        <a href="#">
                          <i class="ti-arrow-right"></i> get started
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <div class="single-do text-center mb-30">
                      <div class="do-icon">
                        <span class="flaticon-project"></span>
                      </div>
                      <div class="do-caption">
                        <h4>On Page SEO</h4>
                        <p>
                          Hunky dory barney fanny around up the duff no biggie
                          loo cup of tea jolly good ruddy say arse!
                        </p>
                      </div>
                      <div class="do-btn">
                        <a href="#">
                          <i class="ti-arrow-right"></i> get started
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="choose-best choose-padding">
              <div class="container">
                <div class="rows d-flex justify-content-center">
                  <div class="col-lg-7">
                    <div class="section-tittle text-center">
                      <h2>Choose Your Very Best Pricing Plan </h2>
                    </div>
                  </div>
                </div>
                <div class="rows">
                  <div class="col-lg-4 col-md-6">
                    <div class="single-choose text-center mb-30">
                      <div class="do-icon">
                        <span class="flaticon-growth"></span>
                      </div>
                      <div class="do-caption">
                        <h4>$ 05.00</h4>
                        <ul>
                          <li>Increase traffic 50%</li>
                          <li>Social Media Marketing</li>
                          <li>10 Free Optimization</li>
                          <li>24/7 support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <div class="single-choose active text-center mb-30">
                      <div class="do-icon">
                        <span class="flaticon-award"></span>
                      </div>
                      <div class="do-caption">
                        <h4>$ 20.00</h4>
                        <ul>
                          <li>Increase traffic 50%</li>
                          <li>Social Media Marketing</li>
                          <li>10 Free Optimization</li>
                          <li>24/7 support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6">
                    <div class="single-choose text-center mb-30">
                      <div class="do-icon">
                        <span class="flaticon-project"></span>
                      </div>
                      <div class="do-caption">
                        <h4>$ 30.00</h4>
                        <ul>
                          <li>Increase traffic 50%</li>
                          <li>Social Media Marketing</li>
                          <li>10 Free Optimization</li>
                          <li>24/7 support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="visit-area fix visite-padding">
              <div class="container">
                <div class="rows d-flex justify-content-center">
                  <div class="col-lg-6 pr-0">
                    <div class="section-tittle text-center">
                      <h2>Visit Some Of Our Awsome Stuffs</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container-fluid p-0">
                <div class="rows ">
                  <div class="col-lg-3 col-md-4">
                    <div class="single-visited mb-30">
                      <div class="visited-img">
                        <img src="assets/img/visit/visit_1.jpg" alt="" />
                      </div>
                      <div class="visited-cap">
                        <h3>
                          <a href="#">citmv.com</a>
                        </h3>
                        <p>Email Marketing</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4">
                    <div class="single-visited mb-30">
                      <div class="visited-img">
                        <img src="assets/img/visit/visit_2.jpg" alt="" />
                      </div>
                      <div class="visited-cap">
                        <h3>
                          <a href="#">mvsp.net</a>
                        </h3>
                        <p>Email Marketing</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4">
                    <div class="single-visited mb-30">
                      <div class="visited-img">
                        <img src="assets/img/visit/visit_3.jpg" alt="" />
                      </div>
                      <div class="visited-cap">
                        <h3>
                          <a href="#">dmcal.co</a>
                        </h3>
                        <p>Email Marketing</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-3 col-md-4">
                    <div class="single-visited mb-30">
                      <div class="visited-img">
                        <img src="assets/img/visit/visit_4.jpg" alt="" />
                      </div>
                      <div class="visited-cap">
                        <h3>
                          <a href="#">dmco.net</a>
                        </h3>
                        <p>Email Marketing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="testimonial-area">
              <div class="container">
                <div class="testimonial-main">
                  <div class="rows d-flex justify-content-center">
                    <div class="col-lg-5  col-md-8 pr-0">
                      <div class="section-tittle text-center">
                        <h2>What Client Say About Us</h2>
                      </div>
                    </div>
                  </div>
                  <div class="rows d-flex justify-content-center">
                    <div class="col-lg-10 col-md-9">
                      <div class="h1-testimonial-active">
                        <div class="single-testimonial text-center">
                          <div class="testimonial-caption ">
                            <div class="testimonial-top-cap">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Quis ipsum suspendisse ultrices gravida. Risus
                                commodo viverra maecenas accumsan lacus vel
                                facilisis.{" "}
                              </p>
                            </div>

                            <div class="testimonial-founder d-flex align-items-center justify-content-center">
                              <div class="founder-img">
                                <img
                                  src="assets/img/testmonial/testimonial.png"
                                  alt=""
                                />
                              </div>
                              <div class="founder-text">
                                <span>Oliva jems</span>
                                <p>UIX designer</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="single-testimonial text-center">
                          <div class="testimonial-caption ">
                            <div class="testimonial-top-cap">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                                Quis ipsum suspendisse ultrices gravida. Risus
                                commodo viverra maecenas accumsan lacus vel
                                facilisis.{" "}
                              </p>
                            </div>

                            <div class="testimonial-founder d-flex align-items-center justify-content-center">
                              <div class="founder-img">
                                <img
                                  src="assets/img/testmonial/testimonial.png"
                                  alt=""
                                />
                              </div>
                              <div class="founder-text">
                                <span>Oliva jems</span>
                                <p>UIX designer</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tips-triks-area tips-padding">
              <div class="container">
                <div class="rows d-flex justify-content-center">
                  <div class="col-lg-6 col-md-8 pr-0">
                    <div class="section-tittle text-center">
                      <h2>Tips and Tricks From Our Exparts</h2>
                    </div>
                  </div>
                </div>
                <div class="rows">
                  <div class="col-xl-4 col-lg-4 col-md-6">
                    <div class="single-tips mb-50">
                      <div class="tips-img">
                        <img src="assets/img/tips/tips_1.jpg" alt="" />
                      </div>
                      <div class="tips-caption">
                        <h4>
                          <a href="#">Twice profit than before you ever got</a>
                        </h4>
                        <span>Continue Reading</span>
                        <p>March 3, 2020</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-6">
                    <div class="single-tips mb-50">
                      <div class="tips-img">
                        <img src="assets/img/tips/tips_2.jpg" alt="" />
                      </div>
                      <div class="tips-caption">
                        <h4>
                          <a href="#">Twice profit than before you ever got</a>
                        </h4>
                        <span>Continue Reading</span>
                        <p>March 3, 2020</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-6">
                    <div class="single-tips mb-50">
                      <div class="tips-img">
                        <img src="assets/img/tips/tips_3.jpg" alt="" />
                      </div>
                      <div class="tips-caption">
                        <h4>
                          <a href="#">Twice profit than before you ever got</a>
                        </h4>
                        <span>Continue Reading</span>
                        <p>March 3, 2020</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="have-project">
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
          </div>
        </div>
        {/* <Styles /> */}
      </div>
    );
  }
}

export default Home;
