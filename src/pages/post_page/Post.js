import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/custom_input/custom_input.component";
import profile from "../../pages/dashboard_page/profile123.png";
import "./post.css";
import ShowComments from "../../components/custom_hooks/ShowComments";
function Post() {
  const [post, setPost] = useState([]);
  const [like, setLike] = useState(null);
  let [likes, setLikes] = useState(0);
  const [posting, setPosting] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [postsLength, setPostsLength] = useState(null);
  const [commentsLength, setcommentsLength] = useState("...");
  const [userName, setUserName] = useState("____");
  var { p_id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    // Fetch User details and posts
    const email = window.localStorage.getItem("userEmail");
    fetch(
      "https://sajjad-ahmad.com/projects/firegram/load-specific-post.php?post_id=" +
        p_id +
        "&email=" +
        email +
        "",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.number == 1) {
          setPost(data.post);
          setLikes(Number(data.post.likes));
          setUserName(data.username);
          if (data.comments.length == 0) {
            setcommentsLength(false);
          } else {
            setcommentsLength(true);
            setComments(data.comments);
          }
        } else {
          setPostsLength(true);
        }

        if (data.like == 1) {
          setLike(true);
        } else {
          setLike(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const handleComment = (e) => {
    setComment(e.target.value);
  };
  function redirect() {
    window.history.back();
  }

  const removeLike = () => {
    setLikes(likes - 1);
    setLike(false);
    var userEmail = localStorage.getItem("userEmail");
    let data = new FormData();
    data.append("useremail", userEmail);
    data.append("postid", p_id);
    data.append("likesnumber", likes - 1);
    fetch("https://sajjad-ahmad.com/projects/firegram/remove_like.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.insert == "success") {
          setLike(false);
        } else {
          setLike(true);
        }
      })
      .catch((error) => {
        console.error("Error:", console.log(error));
      });
  };

  const addLike = () => {
    setLikes(likes + 1);
    setLike(true);
    var userEmail = localStorage.getItem("userEmail");
    let data = new FormData();
    data.append("useremail", userEmail);
    data.append("postid", p_id);
    data.append("likesnumber", likes + 1);
    fetch("https://sajjad-ahmad.com/projects/firegram/add_like.php", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.insert == "success") {
          setLike(true);
        } else {
          setLikes(likes - 1);
          setLike(false);
        }
      })
      .catch((error) => {
        console.error("Error:", console.log(error));
      });
  };
  const addComment = (e) => {
    e.preventDefault();
    var userEmail = localStorage.getItem("userEmail");
    if (comment == "") {
    } else {
      setPosting(true);
      setTimeout(() => {
        let data = new FormData();
        data.append("userEmail", userEmail);
        data.append("comment", comment);
        data.append("postid", p_id);
        data.append("commentsnumber", comments.length + 1);

        fetch("https://sajjad-ahmad.com/projects/firegram/add_comment.php", {
          method: "POST",
          body: data,
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.insert == "success") {
              console.log(data);
              setPosting(false);
              setComment("");
              var newComment = {
                comment_data: comment,
                comment_date: data.date,
                comment_id: "",
                post_id: "",
                user_email: "",
                username: data.username,
              };
              if (comments.length == 0) {
                comments.push(newComment);
                setComments(comments);
                setcommentsLength(true);
              } else {
                comments.unshift(newComment);
                setComments(comments);
              }
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, 1000);
    }
  };

  return (
    <div>
      <div className="container">
        <div
          className="link"
          style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#E4E6EB",
            marginBottom: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "20px",
          }}
          onClick={redirect}
        >
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <motion.div initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
          {postsLength ? (
            <div
              className="no-posts"
              style={{ color: "black", fontSize: "20px" }}
            >
              This post does not exist!
            </div>
          ) : (
            <div className="main-post-container">
              <div className="post-picture">
                <img src={post.post_image} />
              </div>
              <div className="post-details">
                <div className="user-details">
                  <div className="img">
                    <img src={profile} />
                  </div>
                  <div className="name">
                    <h1>{userName}</h1>
                    <p>{post.date}</p>
                  </div>
                </div>
                <div className="post-description">
                  <p>{post.post_description}</p>
                </div>
                <div className="comments">
                  <h3>Comments</h3>

                  <div className="comments-area">
                    {commentsLength ? (
                      <div>
                        <ShowComments comments={comments} />
                      </div>
                    ) : (
                      <div className="no-comments" style={{ color: "black" }}>
                        No Comments Yet!
                      </div>
                    )}
                  </div>
                </div>
                <div className="details-bottom">
                  <div className="likes-comments-number">
                    <div>
                      {like ? (
                        <div
                          onClick={removeLike}
                          className="post-likes "
                          style={{ color: "red" }}
                        >
                          <i class="fa-solid fa-heart"></i>
                          <span style={{ color: "#424242" }}>{likes}</span>
                        </div>
                      ) : (
                        <div className="post-likes " onClick={addLike}>
                          <i class="fa-solid fa-heart "></i> {likes}
                        </div>
                      )}
                    </div>
                    <div className="post-comments">
                      <i class="fa-solid fa-comment"></i> {comments.length}
                    </div>
                  </div>
                  <div className="add-comment">
                    <div className="input">
                      <form onSubmit={addComment}>
                        <CustomInput
                          type={"text"}
                          name={"comment"}
                          placeholder={"Add Comment.."}
                          onChange={handleComment}
                          value={comment}
                          style={{
                            borderRadius: "3px",
                            fontSize: "12px",
                            marginBottom: "0px",
                            borderRight: "0px",
                            borderRadius: "3px 0px 0px 3px",
                            height: "30px",
                          }}
                        />
                      </form>
                    </div>
                    {posting ? (
                      <button className="loadingbtn" disabled>
                        Posting...
                      </button>
                    ) : (
                      <button className="postcomment" onClick={addComment}>
                        Post
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Post;
