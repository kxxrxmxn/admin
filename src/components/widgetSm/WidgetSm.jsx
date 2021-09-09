import "./widgetSm.css";
import { useEffect, useState } from "react";
import {axiosInstance} from "../../config";

export default function WidgetSm() {
  const [newUsers, setNewUsers] = useState([]);

  useEffect ( () => {
    const getNewUsers = async () => {
      try{
        const res = await axiosInstance.get("/users?new=true", {
          headers: { 
            token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken, 
        },
         });
         setNewUsers(res.data)
      }catch(err){
        console.log(err);
      }
    }
    getNewUsers();
  }, []);

  return (
    <>
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user) => (
        <li className="widgetSmListItem">
        <img
          src={user.profilePic || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
          alt=""
          className="widgetSmImg"
        />
        <div className="widgetSmUser">
          <span className="widgetSmUsername">{user.username}</span>
        </div>
        <div className="widgetSmButton">{user.email}</div>
      </li>          
        ))}
      </ul>
    </div>
    </>
  );
}
