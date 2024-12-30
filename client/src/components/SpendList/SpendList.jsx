import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toDateFormat } from "../../actions/toDateFormat";
import { toMonthWords } from "../../actions/toMonthWords";
import AuthContext from "../../context/AuthContext";
import ListComp from "../ListCompnent/ListCom";
import "./SpendList.css";
import Loader from "../Loader/Loader";
import toast from 'react-hot-toast';
function SpendList() {
  const { user, reloadPage } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const currentDate = new Date();
  const currentMonth = toMonthWords(currentDate.getMonth()) + currentDate.getFullYear()
  const [month, setMonth] = useState(currentMonth);
  const [allMonthList, setAllMonthList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const { data } = await axios.get("/item?month=" + month);
        let newList = [];
        let prevDate = new Date(data?.[0]?.createdAt);
        setTotalAmount(0);
        data.forEach((item, index) => {
          setTotalAmount((totalAmount) => totalAmount + Number(item.amount));
          let date = new Date(item.createdAt);
          if (index == 0) {
            newList.push({
              ...data?.[0],
              newDate: true,
              date: toDateFormat(prevDate),
              month: false
            });
          } else if (
            date.getDate() != prevDate.getDate() ||
            date.getMonth() != prevDate.getMonth() ||
            date.getFullYear() != prevDate.getFullYear()
          ) {
            prevDate = date;
            newList.push({ ...item, newDate: true, month: false, date: toDateFormat(date) });
          } else {
            newList.push({ ...item, newDate: false, month: false });
          }
        });
        setList(newList)
        const {data:allMonths} = await axios.get("/item/monthly");
        setAllMonthList(allMonths)
      } catch (err) {
        console.log("err", err);
        toast.error(err?.response?.data?.message ?? "Internal Server Error")
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, [month, reloadPage]);
  return (
    <div className="SpendList">
      <div className="spend-list-container">
        <div className="list-header">
          <div>
            <b>Month</b>
            <select
              value={month}
              className="list-month-input"
              onChange={(e) => setMonth(e.target.value)}
            >
              {allMonthList.map((item, index) => {
                return <option key={index} value={item.month}>{item.month}</option>;
              })}
            </select>
          </div>
          <div>
            <b>Total: </b>
            <label> &nbsp; {totalAmount}</label>
          </div>
        </div>
        <ListComp list={list} />
      </div>
      {loading && <Loader />}
    </div>
  );
}

export default SpendList;
