import { addDays, format } from "date-fns";
import React, { useState } from "react";
import trLocale from "date-fns/locale/tr";
import DateManager from "./DateManager";
import { collection, getDocs, query } from "firebase/firestore";
import db from "../../firebase/firebase";
import { useEffect } from "react";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function RandevuCard({
  monthAndDate,
  day,
  id,
  times,
  setSelectedDate,
  isMobile,
}) {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState();
  const [isLoading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState({});
  const [dates, setDates] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deneme = () => {
    setLoading(true);
    dates.forEach((date) => {
      if (monthAndDate === date.montAndDate) {
        setCurrentDate(date);
     
      }
    });
    setLoading(false);
  };

  const getDates = async () => {
    setLoading(true);
    const dateManager = new DateManager();
    dateManager.getAll();
    const q = query(collection(db, "dates"));
    const querySnapshot = await getDocs(q);
    let dates = [];
    querySnapshot.forEach((doc) => {
      dates.push({ ...doc.data().date });
    });
   
    setDates(dates);
    setLoading(false);
  };

  useEffect(() => {
    deneme();
  }, [deneme, isMobile]);

  useEffect(() => {
    getDates();
  }, []);

  const changeActiveIndex = (index) => {
    setActiveIndex(index);
  };

  const dateManager = new DateManager();
  const notify = () =>{
    toast.warn("Bu randevu doludur!", {
      position: toast.POSITION.BOTTOM_CENTER


    });
  } 

  return (
    <div
      id={monthAndDate}
      className="bg-[#DDDEE6] flex-col items-center justify-center text-[#002E2A] font-light text-xl w-48"
    >
      <div className="ml-2">
        <p>{monthAndDate}</p>
      
        <p>{day}</p>
      </div>

      {isLoading ? (
        <div></div>
      ) : (
        <div className="text-center">
          {times.map((time, index) => (
            <button
            
              id={time}
              ref={ref}
              key={index}
              onClick={() => {
              
                var result =
                  currentDate.time === time &&
                  currentDate.montAndDate === monthAndDate;
                if (result) {
                  notify()
                }
                setSelectedDate(
                  dateManager.getDate(id, monthAndDate, day, time)
                );
                changeActiveIndex(index);
              }}
              onDoubleClick={() => setActiveIndex(null)}
              className={
                currentDate.time === time &&
                currentDate.montAndDate === monthAndDate
                  ? "bg-black/100 text-white px-16 py-2 rounded-lg m-2  duration-200 shadow-black"
                  : activeIndex === index
                  ? "bg-[#002E2A] text-white px-16 py-2 rounded-lg m-2 shadow-md duration-200 shadow-black"
                  : "bg-white px-16 py-2 rounded-lg m-2 hover:shadow-md duration-200 hover:shadow-black/50"
              }
            >
              {time}
            </button>
          ))}
          <ToastContainer autoClose={400} />
        </div>
      )}
    </div>
  );
}
