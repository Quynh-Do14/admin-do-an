import React, { useEffect, useState, useRef } from 'react';
import '../../common/Style/Dashboard.css'

import DoughnutChart from './DoughnutChart';

function Dashboard() {
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])
    const [revenue, setRevenue] = useState([])
    const [total, setTotal] = useState([])

    useEffect(() => {
        const DataList = async () => {
            const getAmount1 = await fetch(`http://localhost:8080/review/api/info/getAmountPost`)
            setData1(await getAmount1.json())

            const getAmount2 = await fetch(`http://localhost:8080/review/api/info/getAmountLocation`)
            setData2(await getAmount2.json())

            const getAmount3 = await fetch(`http://localhost:8080/review/api/info/getAmountCategory`)
            setData3(await getAmount3.json())

            const getAmount4 = await fetch(`http://localhost:8080/review/api/info/getAmount/4`)
            setData4(await getAmount4.json())

            const getRevenue = await fetch(`http://localhost:8080/review/api/info/getRevenue/2`)
            setRevenue(await getRevenue.json())

            const totalAmount = await fetch(`http://localhost:8080/review/api/info/totalAmount`)
            setTotal(await totalAmount.json())
        };
        DataList()
    }, [])

    return (
        <div className='dashboard-main'>
            <div className='dashboard-layout'>

                {/* <div className='count-tour'>
                    <div className='count-tour-box'>
                        <div className='title-box'>Đang chờ xác nhận </div>
                        <div>
                            <div>{data1.count} </div>
                        </div>
                    </div>

                    <div className='count-tour-box'>
                        <div className='title-box'>Đang đi du lịch </div>
                        <div>

                            <div>{data2.count} </div>
                        </div>
                    </div>

                    <div className='count-tour-box'>
                        <div className='title-box'>Đã hoàn thành </div>
                        <div>
                            <div>{data3.count} </div>
                        </div>
                    </div>

                    <div className='count-tour-box'>
                        <div className='title-box'>Đã hủy </div>
                        <div>
                            <div>{data4.count} </div>
                        </div>
                    </div>
                </div>


                <div className='revenue-total'>
                    <div className='count-tour-box'>
                        <div className='title-box'>Tổng doanh thu</div>
                        <div >{(revenue.revenue)} </div>
                    </div>

                    <div className='count-tour-box'>
                        <div className='title-box'>Số lượng đã đặt </div>
                        <div >{total.totalamount}  </div>
                    </div>
                </div> */}

                <div className='chart-main'>
                    <DoughnutChart />
                    <ul>
                        <li className='list-count'>Tổng số Bài viết: {data1.count}  </li>
                        <li className='list-count'>Tổng số Địa điểm Du lịch: {data2.count}  </li>
                        <li className='list-count'>Tổng số Danh mục Địa điểm: {data3.count}  </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}

export default Dashboard