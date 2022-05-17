/* eslint-disable no-unused-vars */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Login from "./LoginPage";

const Profile = () => {
  const { userId, token } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const loginDirection = useNavigate();

  useEffect(() => {
    if (userId) {
      axios({
        method: "get",
        url: `https://60dff0ba6b689e001788c858.mockapi.io/users/${userId}`,
        headers: { Authorization: token },
      }).then(({ data }) => {
        setProfile({
          name: data.name,
          id: data.id,
        });
      });
    }
  }, [userId, token]);

  if (userId === null) {
    return <Login />;
  }

  return (
    <div style={{ margin: 30 }}>
      <p>ID: {profile?.id}</p>
      <p>Name: {profile?.name}</p>
    </div>
  );
};

export default Profile;
