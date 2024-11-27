import { Link } from 'react-router-dom';
import "./history.css";
import { useState } from 'react';

function History() {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const toggleInfo = (index) => {
        if (selectedIndex === index) {
            setSelectedIndex(null);
        } else {
            setSelectedIndex(index);
        }
    };

    const dataList = [
        { date: "30/10/2024", info: "120bmp" },
        { date: "15/10/2024", info: "115bmp" },
        { date: "28/09/2024", info: "118bmp" },
        { date: "20/09/2024", info: "122bmp" },
        { date: "10/09/2024", info: "110bmp" },
    ]
    return (
        <div className="history">
            <h2 className="your-history">Lần đo gần đây</h2>
            <div className="result-list">
                <ul className="list">
                    {dataList.map((item, index) => (
                        <li key={index} onClick={() => toggleInfo(index)}>
                            <span>
                                {item.date}
                                {selectedIndex === index && (
                                    <div className="info-box">
                                        {item.info}
                                    </div>
                                )}
                            </span>
                            <span className="show-detail">
                                <Link to="/" className="show-date-detail">Xem chi tiết</Link></span>
                        </li>
                    ))}
                </ul>
            </div>
            <Link to="/" className="show-recent-result">
                <button>Về trang chủ</button>
            </Link>
        </div>
    )
}

export default History;