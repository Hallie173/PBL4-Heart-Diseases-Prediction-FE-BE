import React, { Component, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, onValue, off, set } from "firebase/database";
import { app } from "../../setup/firebase"; // Đường dẫn đến file firebase.js

// Khởi tạo Firebase Authentication và Google provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const ECG = () => {
  // Đăng nhập bằng Google
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ECGdata, setECGData] = useState([]);
  const [isRunning, setIsRunning] = useState(false); // Trạng thái bắt đầu/stop
  const [viewData, setViewData] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User already logged in:", user);
      } else {
        // Chỉ gọi popup đăng nhập khi chưa đăng nhập
        signInWithPopup(auth, provider)
          .then((result) => console.log("User logged in:", result.user))
          .catch((error) =>
            console.error("Error during Google Sign-In:", error)
          );
      }
    });

    return () => unsubscribe(); // Dừng lắng nghe khi component unmount
  }, []);

  useEffect(() => {
    if (ECGdata.length > 1500) {
      // Lấy dữ liệu từ stopValue đến stopValue + 500
      setViewData(ECGdata.slice(ECGdata.length - 1500, ECGdata.length - 1));
    } else {
      setViewData(ECGdata);
    }
  }, [ECGdata]);

  let formatECG = viewData.map((value, index) => ({
    index: index + ECGdata.length,
    ECGValue: value,
  }));

  const handleStartButton = () => {
    setIsRunning(true);

    const db = getDatabase(app);
    const stateRef = ref(db, "Data/FxhaovnQlHP8wJvCjvJPXb3U2ch2/run");
    const ecgDataRef = ref(db, "Data/FxhaovnQlHP8wJvCjvJPXb3U2ch2/ecg_data");

    // Gửi state=1 lên Firebase
    set(stateRef, 1);

    // Theo dõi state trên Firebase
    const stateListener = onValue(stateRef, async (snapshot) => {
      const currentState = snapshot.val();
      if (currentState === 0) {
        // Khi state=0, dừng theo dõi và lấy dữ liệu từ ecg_data một lần
        off(stateRef, "value", stateListener); // Dừng lắng nghe state

        const ecgDataSnapshot = await get(ecgDataRef);
        if (ecgDataSnapshot.exists()) {
          const data = ecgDataSnapshot.val();
          console.log(data);

          const arr = data.split(",");
          setECGData(arr); // Ghi đè dữ liệu mới
        } else {
          console.log("No ECG data available");
        }

        setIsRunning(false); // Dừng trạng thái đang chạy
      }
    });
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart data={formatECG}>
          <Line
            type="monotone"
            dataKey="ECGValue"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
            // animationDuration={0}
          />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
      <button
        onClick={handleStartButton}
        disabled={isRunning}
        className="btn btn-success mx-5 mt-2"
      >
        {isRunning ? "Running..." : "Start"}
      </button>
    </div>
  );
};

export default ECG;
