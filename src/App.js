import qr from './assets/qr_img_small.png';
import qrCode from './assets/qr_code_small.png';
import g_r from './assets/g_r.png';
import b_r from './assets/b_r.png';
import scan_icon from './assets/scan_icon.png';
import up_icon from './assets/up_icon.png';
import question_icon from './assets/question_icon.png';
import home_icon from './assets/home.png';
import rr from './assets/rr.png';
import finished from './assets/finished.png';

import './App.css';
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

function App() {
    let [time,setTime] = useState('')
    let [second,setSecond] = useState('')
    let toolbarRef = useRef();
    let qrRef = useRef();
    let [toolbarHeight,setToolbarHeight] = useState(45);
    let [qrHeight,setQrHeight] = useState(425);
    let [nickName,setNickName] = useState("");
    let [errLevel,setErrLevel] = useState('0');

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
        let level = localStorage.getItem('err_level');
        setErrLevel(level == null ? '0' : level);
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
        if(nickName.length === 3){
            return "* *";
        }
        if(nickName.length === 2){
            return  "*";
        }
    }

    function mouseDown(){
    }

    function mouseUp(){
        if(errLevel === '0'){
            if(window.confirm("确认切换黄码？")){
                localStorage.setItem('err_level','1')
                setErrLevel('1');
            }
        }

        if(errLevel === '1'){
            if(window.confirm("确认切换红码？")){
                localStorage.setItem('err_level','2')
                setErrLevel('2');
            }
        }

        if(errLevel === '2'){
            if(window.confirm("确认切换绿码？")){
                localStorage.setItem('err_level','0')
                setErrLevel('0');
            }
        }
    }

  return (
    <div className="qr-app">
        <div className={'qr-img-wrapper'} style={{paddingTop:toolbarHeight + 20}}>
            <YKToolbar reference={toolbarRef}/>
            <YKToolbarTip/>
            <QRCode qrHeight={qrHeight}/>
            {
                errLevel === '0' && <img onMouseDown={mouseDown} onMouseUp={mouseUp} className={'qr-style'} src={qr}  alt={""} ref={qrRef}/>
            }
            <div className={'qr-time'}>{time}<span>{second}</span></div>
            {
                nickName !== '' && <div className={'qr-nickname'} style={{height:(qrHeight/4),top:errLevel !== '0'?toolbarHeight + (qrHeight/8) - 20:toolbarHeight + (qrHeight/8) - 8,paddingLeft:nickName.length === 3?'40px':'65px'}}>{NickNamePre()}{" "}{nickName[nickName.length - 1]}</div>
            }
            <div className={'qr-name'} style={{height:(qrHeight/4),top:toolbarHeight}}>
                <div className={'change-qr-name'} onClick={()=>{EditName()}}>
                    切换亮码人员
                </div>
            </div>
        </div>
        <ResultWrapper/>
        <BtnWrapper/>

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

function YKToolbar(props){
    let {reference} = props;
    return(
        <div className={'yk-toolbar'} ref={reference}>
            <div className={'yk-toolbar-l-w'}>
                <img src={home_icon} className={'yk-toolbar-home'}/>
                <span>首页</span>
            </div>
            <div className={'yk-toolbar-title'}>我的渝康码</div>
            <div className={'yk-toolbar-r-w'}>
                <div className={'yk-toolbar-r-w-b'}>
                    <img src={rr} className={'yk-toolbar-img'}/>
                </div>
            </div>

        </div>
    )
}

function YKToolbarTip(props){
    return(
        <div className={'yk-toolbar-tip'}>
            <span>温馨提示：代人申领已移至首页防疫服务的"亲友代领"</span>
        </div>
    )
}

function QRCode(props){
    let {qrHeight} = props;
    return(
        <div className={'qr-code-wrapper'} style={{height:qrHeight}}>
            <div className={'qr-code'}>
                <img className={'qr-code-img'} src={qrCode}/>
                <img className={'qr-code-finished'} src={finished}/>
            </div>
            <div className={'qr-code-type'}>
                <span>绿码</span>
            </div>
        </div>
    )
}

function ResultWrapper(){
    return(
        <div className={'result-wrapper'}>
            <div className={'result-hs'}>
                <ResultTools src={g_r} text={'核酸检测'}/>
                <TextWrapper hour={'24'} h_c={'#03992d'} t={'小时'} b={'阴性'}/>
            </div>
            <div className={'result-ym'}>
                <ResultTools src={b_r} text={'疫苗接种'}/>
                <TextWrapper hour={'3'} h_c={'#333333'} t={'剂'} b={'(共3剂)'}/>
            </div>
        </div>
    )
}

function ResultTools(props){
    let {src,text} = props;
    return(
        <div className={'result-tools'}>
            <img className={'result-tools-icon'} src={src}/>
            <div className={'result-tools-text'}>{text}</div>
            <div className={'result-tools-right'}>></div>
        </div>
    )
}

function TextWrapper(props){
    let {hour,h_c,t,b} = props;
    return(
        <div className={'text-wrapper'} style={{color:h_c}}>
            <div className={'text-wrapper-l'}>
                <span>{hour}</span>
            </div>
            <div className={'text-wrapper-r'}>
                <div className={'text-wrapper-r-t'}>{t}</div>
                <div className={'text-wrapper-r-b'}>{b}</div>
            </div>
        </div>
    )
}

function BtnWrapper(){
    return(
        <div className={'btn-wrapper'}>
            <Link className={'none-text-dec'} to={'/scan'}><InfoBtn icon={scan_icon} text={'场所码|入渝码'}/></Link>
            <InfoBtn icon={up_icon} text={'通信行程卡'}/>
            <InfoBtn icon={question_icon} text={'我有疑问'}/>
        </div>
    )
}

function InfoBtn(props){
    let {icon,text} = props;
    return(
        <div className={'info-btn'}>
            <img src={icon}/>
            <span>{text}</span>
        </div>
    )
}

export default App;
