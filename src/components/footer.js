import React from "react";
import { Grid, List, Header, Icon, Button } from "semantic-ui-react";
import moment from "moment";

import background from "../assets/footer_bg.png";

const footer = () => {
  return (
    <div>
      <footer>
        <div class="footer-main" data-background={background}>
          <div class="footer-area footer-padding">
            <div class="container">
              <div class="row d-flex justify-content-between">
                <div class="col-lg-3 col-md-4 col-sm-8">
                  <div class="single-footer-caption mb-50">
                    <div class="single-footer-caption mb-30">
                      <div class="footer-logo">
                        <a href="index.html">
                          <img src="assets/img/logo/logo2_footer.png" alt="" />
                        </a>
                      </div>
                      <div class="footer-tittle">
                        <div class="footer-pera">
                          <p class="info1">
                            International Islamic University, <br /> Islamabad,
                            Pakistan
                          </p>
                        </div>
                      </div>
                      <div class="footer-social">
                        <Button
                          circular
                          size="tiny"
                          color="facebook"
                          icon="facebook"
                        />
                        <Button
                          circular
                          size="tiny"
                          color="twitter"
                          icon="twitter"
                        />
                        <Button
                          circular
                          size="tiny"
                          color="linkedin"
                          icon="linkedin"
                        />
                        <Button
                          circular
                          size="tiny"
                          color="google plus"
                          icon="google plus"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-5">
                  <div class="single-footer-caption mb-50">
                    <div class="footer-tittle">
                      <h4>Quick Links</h4>
                      <ul>
                        <li>
                          <a href="about.html">About</a>
                        </li>
                        <li>
                          <a href="about.html">Features</a>
                        </li>
                        <li>
                          <a href="single-blog.html">Pricing</a>
                        </li>
                        <li>
                          <a href="blog.html">Blog</a>
                        </li>
                        <li>
                          <a href="contact.html">Contact</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-2 col-md-4 col-sm-7">
                  <div class="single-footer-caption mb-50">
                    <div class="footer-tittle">
                      <h4>Support</h4>
                      <ul>
                        <li>
                          <a href="#">Privacy Policy</a>
                        </li>
                        <li>
                          <a href="#">Terms & Conditions</a>
                        </li>
                        <li>
                          <a href="#"> Sitemap</a>
                        </li>
                        <li>
                          <a href="#">FAQs</a>
                        </li>
                        <li>
                          <a href="#">Report a bugb</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-5">
                  <div class="single-footer-caption mb-50">
                    <div class="footer-tittle">
                      <h4>Core Features</h4>
                      <ul>
                        <li>
                          <a href="#">Email Marketing</a>
                        </li>
                        <li>
                          <a href="#"> Offline SEO</a>
                        </li>
                        <li>
                          <a href="#">Social Media Marketing</a>
                        </li>
                        <li>
                          <a href="#">Lead Generation</a>
                        </li>
                        <li>
                          <a href="#"> 24/7 Support</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="footer-bottom-area footer-bg">
            <div class="container">
              <div class="footer-border">
                <div class="row d-flex align-items-center">
                  <div class="col-xl-12 ">
                    <div class="footer-copy-right text-center">
                      <p>Copyright &copy; All rights reserved | HEALTH-E </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    //   style={{
    //     background: "rgb(245,90,150)",
    //     background:
    //       "linear-gradient(90deg, rgba(245,90,150,1) 0%, rgba(139,0,175,1) 85%)",
    //     color: "#DFE6E9",
    //     paddingTop: "50px"
    //   }}
    // >
    //   <Grid padded="horizontally" textAlign="center">
    //     <Grid.Row columns={2}>
    //       <Grid.Column>
    //         <Header sub>
    //           <div style={{ color: "#FFFFFF", fontSize: "20px" }}>About</div>
    //         </Header>
    //         <List>
    //           <List.Item style={{ color: "#DFE6E9" }} as="a">
    //             Privacy Policy
    //           </List.Item>
    //           <List.Item style={{ color: "#DFE6E9" }} as="a">
    //             Terms of Service
    //           </List.Item>
    //         </List>
    //       </Grid.Column>
    //       <Grid.Column>
    //         <Header style={{ color: "#DFE6E9" }} sub>
    //           <div style={{ color: "#FFFFFF", fontSize: "20px" }}>
    //             Community
    //           </div>
    //         </Header>
    //         <List link>
    //           <List.Item
    //             style={{ color: "#DFE6E9" }}
    //             style={{ color: "#DFE6E9" }}
    //             as="a"
    //           >
    //             Become an Affiliate
    //           </List.Item>
    //           <List.Item style={{ color: "#DFE6E9" }} as="a">
    //             Doctors
    //           </List.Item>
    //           <List.Item style={{ color: "#DFE6E9" }} as="a">
    //             Hospitals
    //           </List.Item>
    //           <List.Item style={{ color: "#DFE6E9" }} as="a">
    //             Laboratries
    //           </List.Item>
    //         </List>
    //       </Grid.Column>
    //     </Grid.Row>
    //     <Grid.Row columns={"equal"}>
    //       <Grid.Column style={{ marginTop: "10px" }}>
    //         <Header disabled sub floated="left" style={{ color: "#DFE6E9" }}>
    //           <Icon name="copyright outline" />
    //           <Header.Content>Health-E</Header.Content>
    //         </Header>
    //       </Grid.Column>
    //       <Grid.Column textAlign="right" floated="right">
    //         <Button circular size="tiny" color="facebook" icon="facebook" />
    //         <Button circular size="tiny" color="twitter" icon="twitter" />
    //         <Button circular size="tiny" color="linkedin" icon="linkedin" />
    //         <Button
    //           circular
    //           size="tiny"
    //           color="google plus"
    //           icon="google plus"
    //         />
    //       </Grid.Column>
    //     </Grid.Row>
    //   </Grid>
  );
};

export default footer;
