import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function SinglePost({ ele }) {
  // const [like, setLike] = useState(null);
  const [likes, setLikes] = useState(0);
  if (ele.post_description.length > 50) {
    var post_description = ele.post_description.slice(0, 100) + " ...";
  } else {
    var post_description = ele.post_description;
  }

  // useEffect(() => {
  //   setLikes(ele.likes);
  //   if (ele.like == 1) {
  //     setLike(true);
  //   }
  //   if (ele.like == 0) {
  //     setLike(false);
  //   }
  // }, []);
  return (
    <div>
      <Link to={"/post/" + ele.post_id}>
        <div
          className="single-post"
          style={{ backgroundImage: "url(" + ele.post_image + ")" }}
          key={ele.post_id}
        >
          <div className="post-content">
            <div className="post-description">{post_description}</div>
            <div className="post-date">{ele.date}</div>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div className="post-likes">
                {ele.like == 1 ? (
                  <div style={{ color: "red" }}>
                    <i class="fa-solid fa-heart"></i>
                    <span style={{ color: "grey", paddingLeft: "2px" }}>
                      {ele.likes}
                    </span>
                  </div>
                ) : (
                  <div>
                    <i class="fa-solid fa-heart"></i>&nbsp;
                    {ele.likes}
                  </div>
                )}
              </div>
              <div className="post-comments">
                <i class="fa-solid fa-comment"></i> {ele.comments}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default SinglePost;
