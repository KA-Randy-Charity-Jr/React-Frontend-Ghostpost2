import React from "react";

class Ghostpost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  //upvotehandler

  async handlesubmit({ id }) {
    console.log(id);
    const response = await fetch("http://127.0.0.1:8000/api/ghostpost/");
    const data = await response.json();

    const initial_post = data.filter((i) => i.id === id)[0];
    const post = { ...initial_post, upvotes: initial_post.upvotes + 1 };
    let newpost = this.state.posts.filter((i) => i.id !== id);
    newpost = [...newpost, post].sort((a, b) => {
      let date1 = new Date(a.post_date);
      let date2 = new Date(b.post_date);
      return date2 - date1;
    });
    this.setState({ posts: newpost });

    console.log(post, initial_post);
    fetch(`http://127.0.0.1:8000/api/ghostpost/vote/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json)
      .then((data) => console.log(data));
  }

  //downvote handler
  async handlesubmit2({ id }) {
    console.log(id);
    const response = await fetch("http://127.0.0.1:8000/api/ghostpost/");
    const data = await response.json();

    const initial_post = data.filter((i) => i.id === id)[0];
    const post = { ...initial_post, downvotes: initial_post.downvotes + 1 };
    let newpost = this.state.posts.filter((i) => i.id !== id);
    newpost = [...newpost, post].sort((a, b) => {
      let date1 = new Date(a.post_date);
      let date2 = new Date(b.post_date);
      return date2 - date1;
    });

    this.setState({ posts: newpost });

    console.log(post, initial_post);
    fetch(`http://127.0.0.1:8000/api/ghostpost/vote/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
      .then((res) => res.json)
      .then((data) => console.log(data));
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/api/ghostpost/")
      .then((res) => res.json())
      .then((data) => this.setState({ posts: data }));
  }
  render() {
    return (
      <div className="main-container">
        <div className="head">
          <h1>WELCOME TO GHOSTPOST</h1>
          <a href="/newpost"> New Post </a>
          <a href="/boasts"> Boasts </a>
          <a href="/roasts"> Roasts </a>
          <a href="/top"> Top Score </a>
        </div>
        <div className="container2">
          {this.state.posts.map((s, index) => (
            <div className="container2">
              <h2>
                {" "}
                posted: {new Date(s.post_date).getFullYear()}/
                {new Date(s.post_date).getMonth() + 1}/
                {new Date(s.post_date).getDate()}
              </h2>

              <ul className="ghostpost">
                <li>{s.text}</li>
                <li>{s.isboast}</li>

                <span>upvotes:{s.upvotes} </span>
                <span>downvotes:{s.downvotes} </span>
                <span>Total Score: {s.upvotes - s.downvotes}</span>
              </ul>
              <button onClick={() => this.handlesubmit(s)}>Up Vote</button>
              <button onClick={() => this.handlesubmit2(s)}>Down Vote</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Ghostpost;
