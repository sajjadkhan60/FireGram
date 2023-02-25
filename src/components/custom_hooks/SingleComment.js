import React from "react";
import profile from "../../pages/dashboard_page/profile123.png";
function SingleComment({ ele }) {
  return (
    <div>
      <div className="single-comment">
        <div className="user-picture">
          <img src={profile} />
        </div>
        <div>
          <div className="comment-details">
            <h3>{ele.username}</h3>
            <p>{ele.comment_data}</p>
          </div>
          <p className="cdate">{ele.comment_date}</p>
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
