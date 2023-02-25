import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SingleComment from "./SingleComment";
function ShowComments({ comments }) {
  console.log(comments);
  const [commentsNumber, setCommentsNumber] = useState(10);
  const [commentsFinished, setCommentsFinished] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (comments.length <= 10) {
      setCommentsFinished(false);
    } else {
      setCommentsFinished(true);
    }
  }, [comments.length]);
  const loadMore = (e) => {
    setLoading(true);
    setTimeout(() => {
      var newValue = commentsNumber + 10;
      setCommentsNumber(newValue);
      setLoading(false);
      if (commentsNumber >= comments.length) {
        setCommentsFinished(false);
      }
    }, 500);
  };

  return (
    <div>
      <motion.div
        className="all-comments"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {comments.slice(0, commentsNumber).map((ele) => {
          return <SingleComment ele={ele} />;
        })}
      </motion.div>
      {commentsFinished ? (
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {loading ? (
            <div className="loadingc" disabled>
              Loading...
            </div>
          ) : (
            <div className="loadmorec" onClick={loadMore}>
              Load More Comments
            </div>
          )}
        </motion.div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ShowComments;
