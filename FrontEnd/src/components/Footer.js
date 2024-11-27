import React from "react";
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope, faClockFour } from '@fortawesome/free-solid-svg-icons';

function Footer() {
    return (
        <div className="footer">
            <div className="footer-title"><span className="brand-name">Healthy Heart</span> - Chẩn đoán các vấn đề tim mạch</div>
            <div className="all-info">
                <div className="left-info">
                    <div className="terms">
                        <span className="info-title">Điều khoản</span>
                        <div>
                            <p><a href="#">Chính sách dịch vụ</a></p>
                            <p><a href="#">Chính sách bảo mật</a></p>
                            <p><a href="#">Trách nhiệm và cam kết</a></p>
                        </div>
                    </div>
                    <div className="services">
                        <span className="info-title">Dịch vụ</span>
                        <div>
                            <p><a href="#">Khám sức khỏe cá nhân</a></p>
                            <p><a href="#">Chẩn đoán bệnh online</a></p>
                            <p><a href="#">Tra cứu kết quả khám</a></p>
                        </div>
                    </div>
                </div>
                <div className="center-info">
                    <div className="contact">
                        <span className="info-title">Thông tin liên hệ</span>
                        <div>
                            <p>
                                <FontAwesomeIcon icon={faLocationDot} className="icon" /> { }
                                <span><a href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+B%C3%A1ch+Khoa+-+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+%C4%90%C3%A0+N%E1%BA%B5ng/@16.0736657,108.1472941,17z/data=!3m1!4b1!4m6!3m5!1s0x314218d68dff9545:0x714561e9f3a7292c!8m2!3d16.0736606!4d108.149869!16s%2Fm%2F02qfsrh?entry=ttu&g_ep=EgoyMDI0MTAwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank">54 Nguyễn Lương Bằng, Hoà Khánh Bắc, Liên Chiểu, Đà Nẵng 550000, Việt Nam</a></span>
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faPhone} className="icon" /> { }
                                <span>0987654321</span>
                            </p>
                            <p>
                                <FontAwesomeIcon icon={faEnvelope} className="icon" /> { }
                                <span>healthy_heart@gmail.com</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="right-info">
                    <div className="times">
                        <span className="info-title">Thời gian khám</span>
                        <div>
                            <p>
                                <FontAwesomeIcon icon={faClockFour} className="icon" /> { }
                                <span>07:30 - 20:00</span>
                            </p>
                            <p>Tất cả các ngày trong tuần.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer