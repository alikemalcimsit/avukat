import { addDays, format } from "date-fns";
import DateModel from "./RandevuCardData";
import trLocale from "date-fns/locale/tr";

export default class DateManager {
  getAll = () => {
    var montAndDate;
    var dayName;

    let dateList = [];

    for (let index = 1; index < 8; index++) {
      const currentDate = new Date();
      const futureDate = addDays(currentDate, index);
      montAndDate = format(futureDate, "dd LLLL", { locale: trLocale });
      dayName = format(futureDate, " EEEE", { locale: trLocale });
      const datemodel = new DateModel(index, `${montAndDate}`, `${dayName}`, [
        "13.00",
        "15.00",
        "17.00",
        "19.00",
        "21.00",
      ]);
      dateList.push(datemodel);
    }

    return dateList;
  };

  getDate = (id, montAndDate, day, time) => {
    const date = { id: id, montAndDate: montAndDate, day: day, time: time };

    return date;
  };
}
