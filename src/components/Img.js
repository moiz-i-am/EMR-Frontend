// import React, { Component } from "react";
// import axios from "axios";
// import { Button } from "semantic-ui-react";

// class Image extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedFile: null
//     };
//   }

//   onChangeHandler = event => {
//     this.setState({
//       selectedFile: event.target.files[0],
//       loaded: 0
//     });
//     console.log(event.target.files[0]);
//   };

//   onClickHandler = () => {
//     const formData = new FormData();
//     formData.append("image", this.state.selectedFile);

//     axios.post("v1/uploading/profilePicture", formData).then(res => {
//       console.log(res.data);
//     });
//   };

//   render() {
//     return (
//       <div style={{ textAlign: "center", padding: "25px" }}>
//         <input
//           id="myInput"
//           type="file"
//           //accept=".jpg, .png, .jpeg|image/*"
//           onChange={this.onChangeHandler}
//         />

//         <Button
//           color="teal"
//           icon="cloud upload"
//           content="Upload file"
//           onClick={() => this.onClickHandler()}
//         />
//       </div>
//     );
//   }
// }

// export default Image;

import React, { Component } from "react";
import Image from "../data/Image";
import axios from "axios";
import "./SinglePost.css";

class Img extends Component {
  state = {
    title: "",
    author: "",
    date: "",
    image: "",
    content: ""
  };

  componentDidMount() {
    const postId = "5f05cf0c7e0ac3644308141d";

    axios
      .get(`v1/uploading/post/${postId}`)
      .then(res => {
        console.log(res.data.post);
        this.setState({
          image: "http://localhost:3001/" + res.data.post.fileURL
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.image);
    return (
      <section className="single-post">
        <h1>wow</h1>
        <h2>Created by khan on 99999</h2>
        <div className="single-post__image">
          <Image contain fileURL={this.state.image} />
        </div>
      </section>
    );
  }
}

export default Img;
