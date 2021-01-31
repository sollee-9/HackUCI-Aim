import UserContext from "../context/UserContext";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

export const EventDescription = (props) => {
  const { goalId } = props.match.params;

  const { userData } = useContext(UserContext);
  const [goals, setGoals] = useState({});

  useEffect(() => {
    const getCurrentGoals = async () => {
      if (userData.token) {
        const goalRes = await axios.get(
          `http://localhost:5000/goals/${goalId}`,
          {
            headers: { "x-auth-token": userData.token },
          }
        );
        setGoals(goalRes.data);
      }
    };
    getCurrentGoals();
  }, []);

  useEffect(() => {
    console.log(goals);
  }, [goals]);

  return (
    <div>
      <p>{goals.title}</p>
      <p>{goals.description}</p>
    </div>
  );
};
export default EventDescription;
