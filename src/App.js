import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./layout/Navbar";
import Randevu from "./pages/Randevu";
import About from "./pages/About";

import BlogPage from "./pages/BlogPage";
import BlogDetails from "./components/blogcard/BlogDetails";



function App() {
  return (
    <div className="App">

<Routes>
  <Route exact  path="/" element={<HomePage></HomePage>}></Route>
  <Route  path="/randevu" element={<Randevu></Randevu>}></Route>
  <Route  path="/about" element={<About></About>}></Route>
  <Route  path="/blog" element={<BlogPage></BlogPage>}></Route>
  <Route path="/blog/:id" element={<BlogDetails />} />
  

</Routes>



    </div>
  );
}

export default App;
