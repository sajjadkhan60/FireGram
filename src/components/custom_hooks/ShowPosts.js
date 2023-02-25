import React, { useEffect, useState } from "react";
import SinglePost from "./SinglePost";
import { motion } from "framer-motion";
function ShowPosts({ posts }) {
  const [postsNumber, setPostsNumber] = useState(20);
  const [postsFinished, setpostsFinished] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (posts.length <= 20) {
      setpostsFinished(false);
    } else {
      setpostsFinished(true);
    }
  }, [posts.length]);
  const loadMore = (e) => {
    setLoading(true);
    setTimeout(() => {
      var newValue = postsNumber + 20;
      setPostsNumber(newValue);
      setLoading(false);
      if (postsNumber >= posts.length) {
        setpostsFinished(false);
      }
    }, 500);
  };

  return (
    <div>
      <motion.div
        className="all-posts"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {posts.slice(0, postsNumber).map((ele) => {
          return <SinglePost ele={ele} />;
        })}
      </motion.div>
      {postsFinished ? (
        <motion.div
          className="load-more"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {loading ? (
            <button className="loadingbtn" disabled>
              Loading...
            </button>
          ) : (
            <button className="loadmorebtn" onClick={loadMore}>
              Load More
            </button>
          )}
        </motion.div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ShowPosts;
