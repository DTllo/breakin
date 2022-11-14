import React, {useEffect, useRef, useState} from "react";
import "./scan-result.css";
import ScanResultImg from './assets/scan_result.png';
import ScanResultRight from './assets/scan_result_right.png';
import ScanBtns from './assets/scan_btns.png';
import ScanBg from './assets/scan_bg.png';
import { Outlet, Link } from "react-router-dom";
function ScanResult(){
    let scanBtnRef = useRef();
    let scanResultRef = useRef();
    let RightRef = useRef();
    let [btnHeight,setBtnHeight] = useState(0);
    let [resultHeight,setResultHeight] = useState(675);
    let [rightHeight,setRightHeight] = useState(156);
    let [time,setTime] = useState('');

    let [location,setLocation] = useState('莎莎一号舞厅91号入口');
    let [area,setArea] = useState('莎莎区');
    let [road,setRoad] = useState('莎莎街道');

    let [list,setList] = useState([]);

    let [showList,setShowList] = useState(false);

    useEffect(()=>{
        let times = setInterval(()=>{
            setBtnHeight(scanBtnRef.current.offsetHeight);
            setResultHeight(scanResultRef.current.offsetHeight);
            setRightHeight(RightRef.current.offsetHeight);
        },300)
        return () => {
            clearInterval(times);
        }
    })

    function CheckTime(i){
        if(i < 10){
            i = '0' + i;
        }
        return i;
    }

    function GetTime(){
        let d= new Date();
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        let date = d.getDate()
        let h=d.getHours();
        let m=d.getMinutes();
        let s=d.getSeconds();
        h=CheckTime(h);
        m=CheckTime(m);
        s=CheckTime(s);
        let result = year + '-' + month + '-' + date + " " + h + ":" + m + ":" + s
        setTime(result);
    }

    function HaveHistory(){
        return list.length > 0;
    }

    function AddHistory(){
        let area = prompt('请输入所在大区', '江北区');
        if(area !== null && area !== "") {
            let road = prompt('请输入所在街道', '莎莎街道');
            if(road !== null && road !== "") {
                let location = prompt('请输入详细地址', '莎莎一号舞厅91号入口');
                if(location !== null && location !== "") {
                    let result = {};
                    result.area = area;
                    result.road = road;
                    result.location = location;
                    let old_list = [...list];
                    old_list.push(result);
                    setList([...old_list]);
                    localStorage.setItem("history_list",JSON.stringify(old_list));
                }
            }
        }
    }

    useEffect(()=>{
        GetTime();
        let str = localStorage.getItem("history_list");
        let history = JSON.parse(str);
        if(history == null){
            setList([]);
        }else{
            setList([...history]);
        }

        let loc = localStorage.getItem('history_location');
        if(loc == null){
            loc = "莎莎一号舞厅91号入口"
        }
        let area = localStorage.getItem('history_area');
        if(area == null){
            area = "莎莎区"
        }
        let road = localStorage.getItem('history_road');
        if(road == null){
            road = "莎莎街道"
        }
        setLocation(loc);
        setArea(area);
        setRoad(road);
    },[])

    function DeleteItem(id){
        let newlist = [];
        for(let i = 0; i < list.length; ++i){
            if(i === id){
                continue;
            }
            newlist.push(list[i]);
        }
        setList([...newlist]);
        localStorage.setItem("history_list",JSON.stringify(newlist));
    }

    return (
        <>
            <div className={'scan-result-wrapper'}>
                <img className={'scan-bg'} src={ScanBg} alt={''}/>
                <div className={'scan-result-img-wrapper'} style={{paddingBottom:btnHeight + 15}}>
                    <img className={'scan-result-img'} src={ScanResultImg} alt={''} ref={scanResultRef}/>
                    <div className={'scan-result-right-wrapper'}  style={{top: resultHeight / 2 - rightHeight / 2}}>
                        <img className={'scan-result-right anima'} src={ScanResultRight} alt={''} ref={RightRef}/>
                    </div>
                    <div className={'scan-time'} style={{top:resultHeight / 8 * 2 + 40}}>{time}</div>
                    <div className={'scan-location-location'}>{location}</div>
                    <div className={'scan-location-area'}>重庆市/{area}</div>
                    <div className={'scan-location-road'}>{road}</div>
                    <div className={'scan-edit-location'} style={{height:resultHeight / 4}} onClick={()=>{
                        setShowList(true)
                    }}></div>
                </div>
            </div>
            <img className={'scan-btns'} src={ScanBtns} alt={''} ref={scanBtnRef}/>
            <div className={'scan-btns-click'} style={{height:btnHeight}}>
                <Link to={'/yukang_code_fake/'}><div className={'scan-btn-to-qr'}></div></Link>

                <div></div>
            </div>
            {
                showList && <div className={'history-list-wrapper'}>
                    <div className={'history-list-bg'} onClick={()=>{
                        setShowList(false)
                    }}></div>
                    <div className={'history-list'}>
                        {
                            HaveHistory() ?
                                <>
                                    {
                                        list.map((value,index)=>{
                                            return (
                                                <div className={'history-item'} key={index} onClick={()=>{
                                                    setLocation(value.location);
                                                    setArea(value.area);
                                                    setRoad(value.road);
                                                    localStorage.setItem('history_location',value.location);
                                                    localStorage.setItem('history_area',value.area);
                                                    localStorage.setItem('history_road',value.road);
                                                }}>
                                                    <div className={'history-item-location'}>No.{index} : {value.location}</div>
                                                    <div className={'history-item-area'}>{value.area} - {value.road}</div>
                                                    <div className={'history-item-delete'} onClick={(e)=>{
                                                        // console.log(value.id)
                                                        DeleteItem(index);
                                                    }}>❌</div>
                                                </div>
                                            )
                                        })
                                    }
                                </> :
                                <div className={'no-history'}> -- 暂无历史记录 -- </div>
                        }
                    </div>
                    <div className={'add-location'} onClick={()=>{AddHistory()}}>添加</div>
                </div>
            }

        </>
    )
}

export default ScanResult;