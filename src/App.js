import Register from "./components/Register.js";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import Layout from "./components/Layout.js";
import Editor from "./components/Editor.js";
import Admin from "./components/Admin.js";
import Missing from "./components/Missing.js";
import Unauthorized from "./components/Unauthorized.js";
import Lounge from "./components/Lounge.js";
import LinkPage from "./components/LinkPage.js";
import RequireAuth from "./components/RequireAuth.js";
// persist login
import PersistLogin from "./components/PersistLogin.js";
import { Routes, Route } from "react-router-dom";

import {ROLES} from "./model/Roles.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/*  protected routes */}

        {/*  with Persistend Login */}
        <Route element={<PersistLogin />}>
        {/* if without Persistend Login, delete <Route element={<PersistLogin />}></Route> */}
        <Route
          element={
            <RequireAuth
              allowedRoles={[ROLES.User , ROLES.Editor, ROLES.Admin]}
            />
          }
        >
          <Route path="/" element={<Home />} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={[ROLES.Editor]} />}
        >
          <Route path="/editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        <Route
          element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
        >
          <Route path="/lounge" element={<Lounge />} />
        </Route>
        {/* if without Persistend Login, delete <Route element={<PersistLogin />}></Route> */}
      </Route>

      {/* catch all */}
      <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
