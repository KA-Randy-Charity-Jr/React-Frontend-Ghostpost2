import React from "react";

let api_host = "http://127.0.0.1:8000/api/ghostpost/";

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: [],
      isboast: "BOAST",
    };
  }
  handlechange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let requestmeth = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(this.state),
    };
    fetch(api_host, requestmeth)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.props.history.push("/");
      });
  };
  render() {
    return (
      <div className="container2">
        <h1>Create a Boast Or Roast On GhostPost!</h1>
        <a href="/">Back to Home</a>
        <br />
        <br />
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlfor="text">MESSAGE</label>
            <input
              type="text"
              id="text"
              name="text"
              onChange={this.handlechange}
            />
          </div>
          <div>
            <label htmlfor="isboast">boast or roast</label>
            <select id="isboast" name="isboast" onChange={this.handlechange}>
              <option value="BOAST">Boast</option>
              <option value="ROAST">Roast</option>
            </select>
          </div>

          <button type="submit">Form Submission</button>
        </form>
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default NewPost;
