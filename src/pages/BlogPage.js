import React from 'react';
import Navbar from '../layout/Navbar';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Blog from '../components/blogcard/Blog';
import db from '../firebase/firebase';
import { format } from 'date-fns';
import { Link, Route, Routes } from 'react-router-dom';


export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    const q = query(collection(db, 'blogs'), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    let blogs = [];
    querySnapshot.forEach((doc) => {
      const timestamp = doc.get('created_at');
      const formattedDate = format(timestamp, 'dd.MM.yyyy');
      blogs.push({ ...doc.data(), id: doc.id, created_at: formattedDate });
    });

    setBlogs(blogs);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <Navbar backgroundColor={1} />
      <div className=' px-2  lg:px-24'>
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3   items-center justify-items-center m-4 mt-10'>
          {blogs.map((blog) => (
            
            <Link to={`/blog/${blog.id}`}>
            <Blog
           
            key={blog.id}
            title={blog.title}
            created_at={blog.created_at}
            photoUrls={blog.photoUrls}
            content={blog.content1}
          />
            </Link>
           
          ))}
        </div>
      </div>
    </div>
  );
}
