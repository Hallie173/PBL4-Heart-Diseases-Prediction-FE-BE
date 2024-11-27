import React from "react";
import ECG from "./ECG/ECG";
import { Link } from 'react-router-dom';
import "./heartrate.css";

function Heartrate({ onShowHistory }) {
  return (
    <div className="homepage">
      <div className="heartrate">
        <h2 className="your-heartrate">Kết quả của bạn</h2>
        <ECG className="ecg-graph"></ECG>
        <div className="diagnosis">
          <div className="preliminary-diagnosis">
            <span className="content-name">Chẩn đoán sơ bộ: </span>
            <span className="diagnosis-content">Bạn có một trái tim khỏe mạnh!</span>
          </div>
          <div className="detailed-diagnosis">
            <span className="content-name">Chẩn đoán chi tiết: </span>
            <span className="diagnosis-content"></span>
          </div>
        </div>
        <div className="buttons">
          <Link to="/history" className="show-history">
            <button>Xem lịch sử đo</button>
          </Link>
          <Link to="/measure-prepare" className="prepare-for-measure">
            <button>Bắt đầu đo</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Heartrate;
