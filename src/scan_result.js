import React, {useEffect, useRef, useState} from "react";
import "./scan-result.css";
import {ScanResultRight,Check24,showImg,ScanBg} from './base64_img';
import { Link } from "react-router-dom";

function ScanResult(){
    let scanBtnRef = useRef();
    let scanResultRef = useRef();
    let RightRef = useRef();
    let [btnHeight,setBtnHeight] = useState(0);
    let [resultHeight,setResultHeight] = useState(675);
    let [rightHeight,setRightHeight] = useState(156);
    // let [time,setTime] = useState('');

    let [location,setLocation] = useState('莎莎一号舞厅91号入口');
    let [area,setArea] = useState('莎莎区');
    let [road,setRoad] = useState('莎莎街道');

    let [list,setList] = useState([]);

    let [showList,setShowList] = useState(false);

    useEffect(()=>{
        let times = setInterval(()=>{
            setBtnHeight(scanBtnRef.current.offsetHeight);
            // setResultHeight(scanResultRef.current.offsetHeight);
            setRightHeight(RightRef.current.offsetHeight);
        },300)
        return () => {
            clearInterval(times);
        }
    })

    function HaveHistory(){
        return list.length > 0;
    }

    function AddHistory(){
        let area = prompt('场所行政区划', '江北区');
        if(area !== null && area !== "") {
            let road = prompt('场所详细地址', '莎莎街道');
            if(road !== null && road !== "") {
                let location = prompt('场所名称', '莎莎一号舞厅91号入口');
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
                    {/*<img className={'scan-result-img'} src={ScanResultImg} alt={''} ref={scanResultRef}/>*/}
                    <ScanPageCard setShowListFnc={setShowList} position={{location:location,area:area,road:road}}/>
                    <div className={'scan-result-right-wrapper'}  style={{top: resultHeight / 2 - rightHeight / 2}}>
                        <img className={'scan-result-right anima'} src={ScanResultRight} alt={''} ref={RightRef}/>
                        <div className={'scan-result-right-text'}>绿码</div>
                    </div>
                    {/*<div className={'scan-time'} style={{top:resultHeight / 8 * 2 + 40}}>{time}</div>*/}
                    {/*<div className={'scan-location-location'}>{location}</div>*/}
                    {/*<div className={'scan-location-area'}>重庆市/{area}</div>*/}
                    {/*<div className={'scan-location-road'}>{road}</div>*/}
                    {/*<div className={'scan-edit-location'} style={{height:resultHeight / 4}} onClick={()=>{*/}
                    {/*    setShowList(true)*/}
                    {/*}}></div>*/}
                </div>
            </div>
            {/*<img className={'scan-btns'} src={ScanBtns} alt={''} ref={scanBtnRef}/>*/}
            <ScanPageBottomBtnSlots reference={scanBtnRef}/>
            {/*<div className={'scan-btns-click'} style={{height:btnHeight}}>*/}
            {/*    <Link to={'/yukang_code_fake/'}><div className={'scan-btn-to-qr'}></div></Link>*/}

            {/*    <div></div>*/}
            {/*</div>*/}
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
                                                    <div className={'history-item-location'}>No.{index + 1} : {value.location}</div>
                                                    <div className={'history-item-area'}>{value.area} - {value.road}</div>
                                                    <div className={'history-item-delete'} onClick={(e)=>{
                                                        // console.log(value.id)
                                                        DeleteItem(index);
                                                    }}>-</div>
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

function ScanPageBottomBtnSlots(props){
    let { reference } = props;
    return(
        <div className={'scan-page-bottom-btn-slots'} ref={reference}>
            <ScanPageBottomBtnGoBackToYuKangPage/>
            <ScanPageBottomBtnOpenXingChengPopup/>
        </div>
    )
}

function ScanPageBottomBtnGoBackToYuKangPage(){
    return(
        <Link className={'spb-back-yk-page'} to={'/yukang_code_fake/'}>
            <ScanPageBottomBtn backgroundColor={'#51be85'} text={'出示渝康码首页'}/>
        </Link>
    )
}

function ScanPageBottomBtnOpenXingChengPopup(){
    return(
        <div className={'spb-open-xc-popup'}>
            <ScanPageBottomBtn backgroundColor={'#5395f5'} text={'出示通信行程卡'}/>
        </div>
    )
}

function ScanPageBottomBtn(props){
    let { backgroundColor, text} = props;
    return(
        <div className={'spb-btn'} style={{backgroundColor:backgroundColor}}>
            <span>{text}</span>
        </div>
    )
}

function ScanPageCard(props){
    let {setShowListFnc,position} = props;

    let [time,setTime] = useState('');

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

    useEffect(()=>{
        GetTime();
    },[])

    return(
        <div className={'sp-card'}>
            <div className={'sp-card-header'} onClick={()=>{ setShowListFnc(true) }}>
                <div className={'scan-location-location'}>{position.location}</div>
                <div className={'scan-location-area'}>重庆市/{position.area}</div>
                <div className={'scan-location-road'}>{position.road}</div>
            </div>
            <div className={'sp-card-virtual-line'}>
                <div className={'sp-card-virtual-line-circle-l'}/>
                <div className={'sp-card-virtual-line-circle-r'}/>
            </div>
            <div className={'sp-card-detail'}>
                <div className={'sp-card-detail-title'}>扫码结果</div>
                <span className={'scan-time'}>{time}</span>
                <ScanCardUserInfo/>
                <img className={'check-24'} src={Check24}/>
            </div>
        </div>
    )
}

function ScanCardUserInfo(){
    let [username,setUsername] = useState('');
    let [phone,setPhone] = useState('');
    let [identity,setIdentity] = useState('');
    useEffect(()=>{
        let u = localStorage.getItem('username');
        let p = localStorage.getItem('phone');
        let i = localStorage.getItem('identity');
        setUsername(u==null?"***":u);
        setPhone(p==null?"188****7389":u);
        setIdentity(i==null?"50*************50":u);

    },[])
    return(
        <div className={'sc-user-info'}>
            <div className={'sc-user-info-title'}>扫码用户信息</div>
            <ScanCardUserEdit name={'姓名'} value={username} setValue={()=>{}}/>
            <ScanCardUserEdit name={'手机号码'} value={phone} setValue={()=>{}}/>
            <ScanCardUserEdit name={'证件号码'} value={identity} setValue={()=>{}}/>
        </div>
    )
}

function ScanCardUserEdit(props){
    let {name,value,setValue} = props;
    return(
        <div className={'sc-user-edit'}>
            <span className={'sc-user-edit-key'}>{name}</span>
            <span className={'sc-user-edit-value'}>{value}</span>
            <img className={'sc-user-edit-show-icon'} src={showImg}></img>
        </div>
    )
}

export default ScanResult;