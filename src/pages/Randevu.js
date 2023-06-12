import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { addDays, addWeeks, format, setDate } from "date-fns";
import trLocale from "date-fns/locale/tr";
import RandevuCard from "../components/randevucard/RandevuCard";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import db from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import DateManager from "../components/randevucard/DateManager";
import { ToastContainer, toast } from "react-toastify";

export default function Randevu() {
  const [selectedDate, setSelectedDate] = useState();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [text, setText] = useState("");
  const [isChecked, setIsChecked] = useState(0);
  const [isMobile, setIsMobile] = useState(3);
  const [visibleCardsFinish, setVisibleCardsFinish] = useState(4);
  const [visibleCardsStart, setVisibleCardsStart] = useState(0);

  const notify = (item) => {
    toast.warn(`${item}`, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };
  useEffect(() => {
    const handleResize = () => {
      window.outerWidth <= 768
        ? setIsMobile(1)
        : 768 < window.outerWidth && window.outerWidth <= 1025
        ? setIsMobile(2)
        : setIsMobile(3);
    };
    if (isMobile === 1) {
      setVisibleCardsFinish(1);
    }
    if (isMobile === 2) {
      setVisibleCardsFinish(2);
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleSubmit = async (e) => {
    console.log(isChecked);

    e.preventDefault();
    const dateManager = new DateManager();
    dateManager.getDate();

    const date = {
      fullname: name,
      isCheck: isChecked,
      message: text,
      number: phone,
      date: selectedDate,
    };
    if (isChecked) {
      if (name.length > 0) {
        if (phone.length>3) {
        
          if (selectedDate != null) {
            await addDoc(collection(db, "dates"), date);
            setName("");
            setIsChecked(0);
            setText("");
            setPhone("");
            window.location.reload();
          } else {
            notify("Lütfen tarih seçiniz");
          }
        } else {
          notify("Geçerli bir telefon numarası giriniz!");
        }
      } else {
        notify("Lütfen İsim Giriniz!");
      }
    } else {
      notify("Kullanıcı Sözleşmesini Onaylamalısın! ");
    }

  };

  const dateManager = new DateManager();
  const dateList = dateManager.getAll();

  const nextCard = () => {
    if (visibleCardsFinish < 7) {
      setVisibleCardsStart((visibleCardsStart) => visibleCardsStart + 1);
      setVisibleCardsFinish((visibleCardsFinish) => visibleCardsFinish + 1);
    }
  };

  const prevCard = () => {
    if (visibleCardsStart > 0) {
      setVisibleCardsStart((visibleCardsStart) => visibleCardsStart - 1);
      setVisibleCardsFinish((visibleCardsFinish) => visibleCardsFinish - 1);
    }
  };

  const DateCard = dateList
    .slice(visibleCardsStart, visibleCardsFinish)
    .map((date) => (
      <div key={date.id}>
        <RandevuCard
          isMobile={isMobile}
          setSelectedDate={setSelectedDate}
          id={date.id}
          times={date.times}
          monthAndDate={date.montAndDate}
          day={date.day}
        ></RandevuCard>
      </div>
    ));

  return (
    <div>
      <Navbar backgroundColor={1}></Navbar>

      <div className=" lg:px-24  px-3 h-full ">
        <h1 className="text-2xl  text-center mb-5 mt-3 text-[#002E2A] font-medium">
          Saat ve tarih seç
        </h1>
        <div className="flex justify-center items-center gap-x-5 md:gap-x-10 w-full  ">
          <div className="bg-[#002E2A] h-fit w-fit rounded-full   hover:shadow-md duration-200 hover:shadow-black/50 ">
            <AiOutlineLeft
              color="white"
              onClick={prevCard}
              className=" cursor-pointer  m-1"
              size={30}
            ></AiOutlineLeft>
          </div>

          <div className=" flex justify-center items-center md:gap-x-10  ">
            {DateCard}
          </div>

          <div className="bg-[#002E2A] h-fit w-fit rounded-full   hover:shadow-md duration-200 hover:shadow-black/50">
            <AiOutlineRight
              color="white"
              onClick={nextCard}
              className="  cursor-pointer m-1"
              size={30}
            ></AiOutlineRight>
          </div>
        </div>
        <div className="2xl:px-56 md:px-36 px-8 my-4">
          <div className="xl:flex items-center  justify-between ">
            <div>
              <form>
                <h2 className=" text-xl text-[#002E2A]  font-medium">
                  Ad Soyad
                </h2>
                <input
                  value={name}
                  onChange={(e) => {
                    const regex = /^[A-Za-zÇçĞğİıÖöŞşÜü\s]+$/;

                    const inputValue = e.target.value;

                    if (regex.test(inputValue) || inputValue === "") {
                      setName(inputValue);
                    }
                  }}
                  type="text"
                  className="bg-[#DDDEE6] lg:w-96  hover:shadow-md duration-200 hover:shadow-black/50    mb-3 w-full py-3 px-2 "
                ></input>
              </form>
            </div>

            <div className="items-center -translate-y-2">
              <form>
                <h2 className="text-xl text-[#002E2A] font-medium ">
                  İletişim bilgileri
                </h2>
                <PhoneInput
                  inputStyle={{
                    width: isMobile === 1 || isMobile === 2 ? "100%" : "384px",
                    height: "48px",
                  }}
                  country={"tr"}
                  value={phone}
                  onChange={setPhone}
                />
              </form>
            </div>
          </div>
          <div>
            <form>
              <h2 className="text-xl text-[#002E2A] font-medium mt-3">Mesaj</h2>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-[#DDDEE6]  hover:shadow-md duration-200 hover:shadow-black/50  overflow-y-auto h-36   w-full py-2 px-2"
              ></textarea>
            </form>
          </div>
          <form>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="  h-10 w-10 m-2"
              />
              <p className="text-xs md:text-lg text-black font-medium mt-3">
                Kişisel Verilerin Korunması Ve İşlenmesine İlişkin Aydınlatma
                Metni ve Açık Rıza Metni'ni okudum, anladım, onaylıyorum.
              </p>
            </div>
          </form>
          <form>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-[#002E2A] hover:shadow-md duration-200 hover:shadow-black w-full text-xl md:text-2xl text-white font-medium py-3 mt-2 mb-4"
            >
              Randevu al
            </button>
          </form>
          <ToastContainer autoClose={400} />
        </div>
      </div>
    </div>
  );
}
