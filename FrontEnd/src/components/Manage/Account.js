import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "./Account.module.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProfile from "./EditProfile";
import { UserContext } from "../../context/UserContext";

function Account() {
  const { user } = useContext(UserContext);

  return (
    <div className={styles.infoContainer}>
      <div className={styles.avatar}>
        <div className={styles.showAvatar}>
          <img src={user.account.avatar} />
        </div>
        <div className={styles.accountType}>
          <span className={styles.adminAccount}>User</span>
        </div>
      </div>
      <div className={styles.personalInfo}>
        <div className={styles.showInfo}>
          <p>
            <span className={styles.left}>Full name:</span>
            <span className={styles.right}>
              {user.account.firstName + " " + user.account.lastName}
            </span>
          </p>
          <p>
            <span className={styles.left}>Sexuality:</span>
            <span className={styles.right}>
              {user.account.gender === "true" ? "Male" : "Female"}
            </span>
          </p>
          <p>
            <span className={styles.left}>Phone:</span>
            <span className={styles.right}>{user.account.phone}</span>
          </p>
          <p>
            <span className={styles.left}>Email:</span>
            <span className={styles.right}>{user.account.email}</span>
          </p>
          <p>
            <span className={styles.left}>Address:</span>
            <span className={styles.right}>{user.account.address}</span>
          </p>
        </div>
        <div className={styles.changeInfo}>
          <button
            type="button"
            className={styles.changeButton}
            data-bs-toggle="modal"
            data-bs-target="#edit-form-modal"
          >
            <FontAwesomeIcon icon={faPen} /> Edit
          </button>
        </div>
      </div>
      <EditProfile />
    </div>
  );
}

export default Account;
