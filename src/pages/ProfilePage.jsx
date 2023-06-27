import { useContext, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../AccountNav";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) subpage = "profile";

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }

  const logout = async () => {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  };

  if (redirect) return <Navigate to={redirect} />;

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary mx-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesFormPage />}
    </div>
  );
};

export default ProfilePage;
