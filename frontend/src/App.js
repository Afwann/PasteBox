import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./components/Profile/Profile";
import CreateSnippet from "./components/Snippets/CreateSnippet";
import MySnippets from "./components/Snippets/MySnippets";
import UpdateSnippet from "./components/Snippets/UpdateSnippet";
import SearchUser from "./components/Users/SearchUser";
import SearchSnippet from "./components/Snippets/SearchSnippet";
import UserDetail from "./components/Users/UserDetail";
import SnippetDetail from "./components/Snippets/SnippetDetail";
import NotFound from "./components/NotFound";
import "./styles.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-snippet" element={<CreateSnippet />} />
      <Route path="/my-snippets" element={<MySnippets />} />
      <Route path="/update-snippet/:id" element={<UpdateSnippet />} />
      <Route path="/search-user" element={<SearchUser />} />
      <Route path="/search-snippet" element={<SearchSnippet />} />
      <Route path="/user/:id" element={<UserDetail />} />
      <Route path="/snippet/:id" element={<SnippetDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
