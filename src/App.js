import qr from './assets/qr_img.png';
import detail from './assets/detail_img.png';

import './App.css';

function App() {
  return (
    <div className="qr-app">
        <div className={'qr-img-wrapper'}>
            <img className={'qr-style'} src={qr}  alt={""}/>
            <img className={'qr-img-random-qr'} src="https://api.qrserver.com/v1/create-qr-code?data=https://en.wikipedia.org/wiki/On_Liberty&ecc=H&color=44983d"  alt={''}/>
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
