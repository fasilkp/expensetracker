import React, { useState,useContext,useEffect   } from 'react'
import ListComp from '../ListCompnent/ListCom'
import axios from 'axios'
import './Category.css'
import AuthContext from '../../context/AuthContext'
import { toMonthWords } from '../../actions/toMonthWords'
import ReactApexChart from 'react-apexcharts'
import Loader from '../Loader/Loader'
import toast from 'react-hot-toast';
function Category() {
    const defaultSet={desc:false, createdAt:false, balance:false, month:false}
    const {user, reloadPage}=useContext(AuthContext)
    const [monthDetails,setMonthDetails]=useState({})
    const [seriesList,setSeriesList]=useState([])
    const [loading, setLoading]=useState(false)
    const categories=[
        "entertainment", "transport", "emi",
        "fees", "food", "rent", "shopping", "hospital", "school","savings","other"
    ]
    useEffect(()=>{
        async function fetchData(){
          try{
            setLoading(true)
              const {data}=await axios.get('/item/month/'+toMonthWords(new Date().getMonth())+new Date().getFullYear())
                  setMonthDetails(data);
                  let list=[]
                  categories.forEach(item=>{
                      list.push(data[item])
                  })
                  console.log(list)
                  setSeriesList(list)
          }catch(err){
            console.log("err", err);
            toast.error(err?.response?.data?.message ?? "Internal Server Error")
          }finally{
            setLoading(false)
          }
        }fetchData();
    },[reloadPage])
    const state = {
          
        series: seriesList,
        options: {
          chart: {
            width: 600,
            type: 'donut',
            foreColor:"#fff"
          },
          dataLabels: {
            enabled: true,
           dropShadow:{
                enabled:false
           }
          },
          fill:{
            colors: [
              '#FF4560','#554298','#F60000','#4DC8EF',
              '#FEB019','#00E396','#008FFB','#FF36A3',
              '#FFE600','#22BF58','#0069A5'
            ]
          },
          stroke: {
            colors: ['rgba(255, 30, 0, 0)']
          },
          labels: categories,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 450
              },
              legend: {
                show: true,
                fontSize:"15px",
              }
            }
          }],
          legend: {
            position: 'right',
            offsetY: 0,
            fontWeight:550,
            fontSize:"15px",
            fillColors:["#fff"],
            markers: {
              fillColors:[
                '#FF4560','#554298','#F60000','#00B2EB',
                '#FEB019','#00E396','#008FFB','#FF36A3',
                '#FFE600',"#22BF58",'#0069A5'
              ]
            }
          },
          
        },
      
      
      };
    const list=[
        {amount:monthDetails.entertainment, category:"entertainment", ...defaultSet},
        {amount:monthDetails.transport, category:"transport", ...defaultSet},
        {amount:monthDetails.emi, category:"emi", ...defaultSet},
        {amount:monthDetails.rent, category:"rent", ...defaultSet},
        {amount:monthDetails.fees, category:"fees", ...defaultSet},
        {amount:monthDetails.food, category:"food", ...defaultSet},
        {amount:monthDetails.shopping, category:"shopping", ...defaultSet},
        {amount:monthDetails.hospital, category:"hospital", ...defaultSet},
        {amount:monthDetails.school, category:"school", ...defaultSet},
        {amount:monthDetails.savings, category:"savings", ...defaultSet},
        {amount:monthDetails.other, category:"other", ...defaultSet},
    ]
  return (
    <div className='Category'>
        <div className="category-container">
        <section className="category-banner-sec">
            <div className="category-banner" > 
            <div className="category-banner-div">
            <ReactApexChart options={state.options} series={state.series} type="donut" width={450} />
            </div>
            </div>
        </section>
        <section className="category-list">
            <ListComp list={list}></ListComp>
        </section>
        </div>
        { loading && <Loader/>}

    </div>
  )
}

export default Category

