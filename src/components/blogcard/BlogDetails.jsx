import React from "react";
import Navbar from "../../layout/Navbar";
import { useParams } from "react-router-dom";
import {
  collection,
  
  getDocs,

  query,
  where,
} from "firebase/firestore";
import db from "../../firebase/firebase";
import { format } from "date-fns";

import { useState } from "react";
import { useEffect } from "react";
import trLocale from "date-fns/locale/tr";

export default function BlogDetails() {
  const {id} = useParams();
  const [blog, setBlog] = useState({});

  const getBlogs = async (id) => {
    try {
     
    
      const q = query(collection(db, "blogs"), where("id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const blog = querySnapshot.docs[0].data();
        const formattedDate = format(blog.created_at, "dd MMM yyyy HH:mm", {
          locale: trLocale,
        });
        blog.created_at = formattedDate;
        setBlog(blog);
      } else {
        console.log("Belge bulunamadı");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  useEffect(() => {
 
    getBlogs(id);
  }, []);

  return (
    <div className="flex-col items-center justify-center ">
      <Navbar backgroundColor={1}></Navbar>
      <div className=" px-7 lg:px-72 w-full h-full items-center justify-center justify-items-center flex mb-10">
        <div className="">
          <h1 className="text-3xl lg:text-6xl text-black/80 mb-5 mt-5  leading-[40px]  lg:leading-[65px]">
            {blog.title}
          </h1>
          <p className="text-black/50 font-light mb-3">{blog.created_at}</p>
          <hr className="w-full border mb-3 "></hr>
          {blog.photoUrls != null ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              className=" w-[1000px] h-[320px] lg:h-[470px] object-cover mb-5"
              src={blog.photoUrls[0]}
            ></img>
          ) : null}
          <p className="mb-5 text-base whitespace-pre-line lg:text-lg w-full text-justify">
            {blog.content1}
          </p>
          {blog.photoUrls != null && blog.photoUrls[1] != null ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              className=" w-[1000px]  lg:h-[470px] h-[320px] object-cover mb-5"
              src={blog.photoUrls[1]}
            ></img>
          ) : null}
          <p className="text-base whitespace-pre-line lg:text-lg w-full text-justify">
            {blog.content2}
          </p>
        </div>
      </div>
    </div>
  );
}
