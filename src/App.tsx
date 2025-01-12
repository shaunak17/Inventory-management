import { useState } from "react";
import { Switch } from "@mui/material";
import AdminView from "./views/AdminView";
import UserView from "./views/UserView";
import './App.css'

const App = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  const handleSwitchChange = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="App">
      <div className="topbar-container">
        <div className="admin-user-text">admin</div>
        <Switch
          checked={!isAdmin}
          onChange={handleSwitchChange}
          color="success"
        />
        <span className="admin-user-text">user</span>
      </div>

      {isAdmin ? <AdminView /> : <UserView />}
    </div>
  );
};

export default App;
