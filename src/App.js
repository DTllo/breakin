import qr from './assets/qr_img.png';
import detail from './assets/detail_img.png';

import './App.css';
import {useEffect, useState} from "react";

function App() {
    let [time,setTime] = useState('')
    let [second,setSecond] = useState('')
    function CheckTime(i){
        if(i < 10){
            i = '0' + i;
        }
        return i;
    }
    function GetTime(){
        let d=new Date();
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        let date = d.getDate()
        let h=d.getHours();
        let m=d.getMinutes();
        let s=d.getSeconds();
        h=CheckTime(h);
        m=CheckTime(m);
        s=CheckTime(s);
        let result = year + '-' + month + '-' + date + " " + h + ":" + m + ":"
        setTime(result);
        setSecond(s)
    }
    useEffect(()=> {
        let times = setInterval(()=>{
            GetTime()
        },1000)
        return ()=>{
            clearInterval(times)
        }
    })
  return (
    <div className="qr-app">
        <div className={'qr-img-wrapper'}>
            <img className={'qr-style'} src={qr}  alt={""}/>
            <div className={'qr-time'}>{time}<span>{second}</span></div>
        </div>
        <img src={detail} className='detail-style' alt={""}/>
        <div className={"footer-wrapper"}>
            <div className={'footer-wrapper-phone'}>
                咨询热线：023-12345
            </div>
            <div className={'footer-wrapper-shit'}>
                数据来源： 依托全国一体化政务服务平台实现跨省（区、
            </div>
            <div className={'footer-wrapper-shit-end'}>
                市）数据共享和互通互认
            </div>
        </div>
    </div>
  );
}

export default App;
