import qr from './assets/qr_img.png';
import qr_err from './assets/qr_img_error.png';
import qr_toolbar from './assets/toolbar.png';
import detail from './assets/detail_img.png';


import './App.css';
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

function App() {
    let [time,setTime] = useState('')
    let [second,setSecond] = useState('')
    let toolbarRef = useRef();
    let qrRef = useRef();
    let [toolbarHeight,setToolbarHeight] = useState(45);
    let [qrHeight,setQrHeight] = useState(90);
    let [nickName,setNickName] = useState("");
    let detailRef = useRef();
    let [detailHeight,setDetailHeight] = useState(252);
    let [errCode,setErrCode] = useState('false');
    let [start,setStart] = useState(0);
    let [end,setEnd] = useState(0);

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

    function GetToolBarHeight(){
        setToolbarHeight(toolbarRef.current.offsetHeight);
        setQrHeight(qrRef.current.offsetHeight)
        setDetailHeight(detailRef.current.offsetHeight);
    }

    function EditName(){
        let name = prompt('请输入你的姓名', '');
        if(name !== null && name !== "") {
            setNickName(name)
            localStorage.setItem('name',name);
        }
    }
    useEffect(()=>{
        let name = localStorage.getItem('name');
        setNickName(name == null ? '' : name);
        let err = localStorage.getItem('qr_err');
        setErrCode(err == null ? 'false': err);
    },[])

    useEffect(()=> {
        let times = setInterval(()=>{
            GetTime()
        },1000)

        let toolbarConfig = setInterval(()=>{
            GetToolBarHeight();
        },100)
        return ()=>{
            clearInterval(times)
            clearInterval(toolbarConfig)
        }
    })
    function NickNamePre(){
        if(nickName.length == 3){
            return "* *";
        }
        if(nickName.length == 2){
            return  "*";
        }
    }

    function mouseDown(){
        let start = new Date();
    }

    function mouseUp(){
        if(errCode === 'true'){
            if(window.confirm("确认切换绿码？")){
                localStorage.setItem('qr_err','false')
                setErrCode('false');

            }
        }else{
            if(window.confirm("确认切换黄码？")){
                localStorage.setItem('qr_err','true');
                setErrCode('true');
            }
        }
    }

  return (
    <div className="qr-app">
        <div className={'qr-img-wrapper'} style={{paddingTop:toolbarHeight}}>
            <img className={'qr-toolbar'} src={qr_toolbar}  alt={""} ref={toolbarRef}/>
            {
                errCode === 'true' ? <img onMouseDown={mouseDown} onMouseUp={mouseUp} className={'qr-style'} src={qr_err}  alt={""} ref={qrRef}/> : <img onMouseDown={mouseDown} onMouseUp={mouseUp} className={'qr-style'} src={qr}  alt={""} ref={qrRef}/>
            }
            <div className={'qr-time'}>{time}<span>{second}</span></div>
            {
                nickName !== '' && <div className={'qr-nickname'} style={{height:(qrHeight/4),top:errCode === 'true'?toolbarHeight + (qrHeight/8) - 20:toolbarHeight + (qrHeight/8) - 8,paddingLeft:nickName.length == 3?'40px':'65px'}}>{NickNamePre()}{" "}{nickName[nickName.length - 1]}</div>
            }
            <div className={'qr-name'} style={{height:(qrHeight/4),top:toolbarHeight}} onClick={()=>{EditName()}}>{}</div>
        </div>
        <div className={'detail-style-wrapper'} style={{height:detailHeight}}>
            <img src={detail} className='detail-style' alt={""} ref={detailRef}/>
            <Link to={'/yukang_code_fake/scan'}><div className={'detail-click'} style={{height:detailHeight / 3 + 20}}></div></Link>
        </div>

        <div className={"footer-wrapper"}>
            <div className={'footer-wrapper-phone'}>
                咨询热线：023-12345
            </div>
            <div className={'footer-wrapper-shit'}>
                数据来源： 依托全国一体化政务服务平台实现跨省（区、市）数据共享和互通互认
            </div>
        </div>
    </div>
  );
}

export default App;
