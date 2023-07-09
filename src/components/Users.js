import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const [username,setUsers] = useState();
  const [userEmail,setUserEmail] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  //const effectRun = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.abort(),
        });
        const userNames = response.data.map((user) => user.username);
        const userEmail = response.data.map((user) => user.email);
        //TODO delete log
        console.log(response.data);
        //isMounted && setUsers(response.data);
        isMounted && setUsers(userNames) && setUserEmail(userEmail);
      } catch (error) {
        console.error(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      //controller.abort();
      isMounted && controller.abort();
      //effectRun.current = true;
    };
  }, [axiosPrivate, location, navigate]);

  return (
    <article>
      <h2>Users List</h2>
      {username?.length ? (
        <ul>
          {username.map((userN, i) => (
            //{/* <li key={i}>{user?.username}</li> */}
            <li key={i}>{userN}</li>
          ))}

        </ul>
      ) : (
        <p>No User to Display</p>
      )}
    </article>
  );
};

export default Users;
