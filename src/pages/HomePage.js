import React, { useEffect, useState } from "react";
import terazi from "../assets/terazi.png";

import { FiArrowRight } from "react-icons/fi";
import Blog from "../components/blogcard/Blog"
import Navbar from "../layout/Navbar";
import CategoryCard from "../components/categorycard/CategoryCard";
import { CategoryCardData } from "../components/categorycard/CategoryCardData";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import db from "../firebase/firebase";
import DateManager from "../components/randevucard/DateManager";
import { format } from "date-fns";

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);
  const [isMobile, setIsMobile] = useState();
  useEffect(() => {
    const handleResize = () => {
      window.outerWidth <= 768
        ? setIsMobile(1)
        : 768 < window.outerWidth && window.outerWidth <= 1025
        ? setIsMobile(2)
        : setIsMobile(3);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const getBlogs = async () => {
    const dateManager = new DateManager();
    dateManager.getAll();
    const q = query(collection(db, "blogs"), orderBy("created_at", "asc"));

    const querySnapshot = await getDocs(q);
    let blogs = [];

    querySnapshot.forEach((doc) => {
      const timestamp = doc.get("created_at");

      const formattedDate = format(timestamp, "dd.MM.yyyy");

      blogs.push({ ...doc.data(), id: doc.id, created_at: formattedDate });
    });
    setBlogs(blogs.slice(-3).reverse()); // Son 3 veriyi ayarla
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="w-full ">
      <Navbar backgroundColor={0}></Navbar>
      <div className="bg-background object-fill h-[500px] flex md:px-24 t    bg items-end  justify-between ">
        {/* BURAYA YEŞİL ALANIN ÜSTÜNDEKİLER GELİCEK */}
        <div className="text-[#DDDEE6]  mb-12  items-center text-center justify-center  lg:w-fit  translate-full w-full md:items-baseline -translate-y-1/3">
          <h1 className="text-2xl md:text-5xl font-light mb-4 ">
            Hukuki Danışmalık 
          </h1> 
          <h3 className="text-lg md:text:xl font-light mb-4 ">
            Detaylı danışmanlık için hemen
          </h3>
          <Link to="/randevu">
            <button className="text-[#002E2A]  hover:shadow-md duration-200 hover:shadow-black  bg-[#DDDEE6] px-7 py-4 md:px-12  md:py-5 md:text-3xl font-medium">
              Randevu al
            </button>
          </Link>
        </div>

        <div className=" hidden lg:flex  h-full  items-end mb-16 justify-center xl:-translate-x-3/4 ">
          <img alt="" src={terazi}></img>
        </div>
      </div>

      {/* BU ALANA BLOG KISMI GELEECEK */}
      <div className="  mt-7  lg:mx-24 md:mx-12 mx-10   ">
        <div className="-translate-y-[25%]  xl:block">
          <div className="flex flex-wrap  justify-between md:justify-evenly items-center  top-2/4  ">
            {CategoryCardData.slice(0, isMobile === 1  || isMobile===2? 3 : 5).map((item) => (
              <CategoryCard
                key={item.index}
                description={item.description}
              ></CategoryCard>
            ))}
          </div>
          <div className="flex flex-wrap  items-center justify-between  md:justify-evenly  lg:mt-10  mt-2   ">
            {CategoryCardData.slice(
              isMobile === 1 || isMobile===2 ? 3 : 5,
              isMobile === 1  || isMobile===2 ? 6 : CategoryCardData.length
            ).map((item) => (
              <CategoryCard
                key={item.index}
                description={item.description}
              ></CategoryCard>
            ))}
          </div>

          <div className="flex flex-wrap  items-center justify-between md:justify-evenly lg:hidden visible  lg:mt-10 mt-2    ">
            {isMobile === 1 || isMobile===2
              ? CategoryCardData.slice(6, CategoryCardData.length).map(
                  (item) => (
                    <CategoryCard
                      key={item.index}
                      description={item.description}
                    ></CategoryCard>
                  )
                )
              : null}
          </div>
        </div>

        <div className="flex justify-between    items-center">
          <h1 className="text-[#002E2A] text-3xl translate-x-1 font-medium ">
            Blog
          </h1>
          <div className="flex items-center cursor-pointer -translate-x-1">
            <Link className="flex" to="/blog">
              <p className="text-sm">daha fazla gör </p>
              <span>
                <FiArrowRight size={20}></FiArrowRight>
              </span>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap md:gap-x-10 gap-x-6 lg:gap-x-14  items-center mt-7 justify-start ">
          {blogs.map((blog) => (
            <div key={blog.id}>
              <Link to={`/blog/${blog.id}`}>
                <Blog
                  title={blog.title}
                  photoUrls={blog.photoUrls}
                  created_at={blog.created_at}
                  content={blog.content1}
                ></Blog>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
