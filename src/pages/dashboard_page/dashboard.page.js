import React, { useEffect, useState, useReducer } from "react";
import { useNavigate, Link } from "react-router-dom";
import AddPost from "../../components/custom_hooks/AddPost";
import ShowPosts from "../../components/custom_hooks/ShowPosts";
import profile from "./profile123.png";
import "./dashboard.page.css";

export const ACTIONS = {
  SET_USER_NAME: "SET_USER_NAME",
  SET_USER_ID: "SET_USER_ID",
  SET_POST_LENGTH: "SET_POST_LENGTH",
  SET_POSTS: "SET_POSTS",
  SET_POPUP: "SET_POPUP",
  SET_MENU: "SET_MENU",
};

const initialState = {
  posts: [],
  menu: false,
  postsLength: null,
  userName: "___",
  userId: 2,
  popup: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER_NAME:
      return {
        ...state,
        userName: action.payload,
      };
    case ACTIONS.SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case ACTIONS.SET_POST_LENGTH:
      return {
        ...state,
        postsLength: action.payload,
      };
    case ACTIONS.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case ACTIONS.SET_POPUP:
      return {
        ...state,
        popup: action.payload,
      };
    case ACTIONS.SET_MENU:
      return {
        ...state,
        menu: action.payload,
      };
    default:
      return state;
  }
};

function Dashboard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { posts, menu, postsLength, userName, userId, popup } = state;

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userEmail") === null) {
      navigate(`/`);
    } else {
      const userEmail = window.localStorage.getItem("userEmail");
      // Fetch User details and posts
      fetch(
        "https://sajjad-ahmad.com/projects/firegram/load-all-posts.php?email=" + userEmail + "",
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: ACTIONS.SET_USER_ID,
            payload: data.userid,
          });
          if (data.username.length > 5) {
            var username = data.username.slice(0, 5) + "..";
            dispatch({
              type: ACTIONS.SET_USER_NAME,
              payload: username,
            });
          } else {
            dispatch({
              type: ACTIONS.SET_USER_NAME,
              payload: data.username,
            });
          }

          if (data.posts.length == 0) {
            dispatch({
              type: ACTIONS.SET_POST_LENGTH,
              payload: true,
            });
          } else {
            dispatch({
              type: ACTIONS.SET_POSTS,
              payload: data.posts,
            });
            dispatch({
              type: ACTIONS.SET_POST_LENGTH,
              payload: false,
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  function logout() {
    window.localStorage.removeItem("userEmail");
    navigate(`/`);
  }
  function profile() {
    navigate(`/profile`);
  }
  function menuToggle() {
    if (menu == true) {
      dispatch({
        type: ACTIONS.SET_MENU,
        payload: false,
      });
    } else {
      dispatch({
        type: ACTIONS.SET_MENU,
        payload: true,
      });
    }
  }
  function togglePopup() {
    if (popup == true) {
      dispatch({
        type: ACTIONS.SET_POPUP,
        payload: false,
      });
    } else {
      dispatch({
        type: ACTIONS.SET_POPUP,
        payload: true,
      });
    }
  }
  document.title = "FireGram | Dashboard";

  return (
    <div>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <Link
          to="/dashboard"
          style={{ color: "black", textDecoration: "none" }}
        >
          <div>
            <h1>FireGram!</h1>
          </div>
        </Link>
        <div className="add-post" onClick={togglePopup}>
          <i class="fa-regular fa-square-plus"></i>
        </div>
        <div className="top-menu">
          <div
            className={"user " + (menu && "user-active")}
            onClick={menuToggle}
          >
            <img src={profile} />
            <h1>{userName}</h1>
            {menu && (
              <div className="menu1">
                <div className="menu-item" onClick={profile}>
                  Profile
                </div>
                <div className="menu-item" onClick={logout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container" style={{ marginBottom: "10px" }}>
        <h3>Feed</h3>
        {postsLength ? (
          <div className="no-posts" style={{ color: "black" }}>
            No Posts Found!
          </div>
        ) : (
          <div>
            <ShowPosts posts={posts} />
          </div>
        )}
      </div>
      {popup && (
        <AddPost
          togglePopup={togglePopup}
          userId={userId}
          posts={posts}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default Dashboard;
