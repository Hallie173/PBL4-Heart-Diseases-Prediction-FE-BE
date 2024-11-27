import React, { useContext, useEffect, useState } from "react";
import "./EditProfile.css";
import { UserContext } from "../../context/UserContext";
import _ from "lodash";
import { updateCurrentUser } from "../../services/userService";
import { toast } from "react-toastify";

function EditProfile() {
  const { user, updateContext } = useContext(UserContext);
  const defaultValue = {
    email: user.account.email,
    username: user.account.username,
    firstName: user.account.firstName,
    lastName: user.account.lastName,
    phone: user.account.phone,
    gender: user.account.gender,
    avatar: user.account.avatar,
    address: user.account.address,
  };

  const [userData, setUserData] = useState(defaultValue);

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };

  const updateUser = async () => {
    let response = await updateCurrentUser(userData);
    if (response && +response.EC === 0) {
      toast.success(response.EM);
      let token = response.DT.access_token;
      localStorage.setItem("jwt", token);
      updateContext(userData);
    } else toast.error(response.EM);
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <div
      className="modal fade"
      id="edit-form-modal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title" id="exampleModalLabel">
              Edit Profile
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={userData.email}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="number"
                  className="form-control"
                  value={userData.phone}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.firstName}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "firstName")
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.lastName}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "lastName")
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sexuality</label>
                <div>
                  <label for="male-radio" className="sexuality-radio">
                    <input
                      type="radio"
                      id="male-radio"
                      name="sexuality"
                      className="form-check-inline form-check-input"
                      value={true}
                      checked={userData.gender === "true"}
                      onChange={(e) =>
                        handleOnChangeInput(e.target.value, "gender")
                      }
                    />
                    Male
                  </label>
                  <label for="female-radio" className="sexuality-radio">
                    <input
                      type="radio"
                      id="female-radio"
                      name="sexuality"
                      className="form-check-inline form-check-input"
                      value={false}
                      checked={userData.gender === "false"}
                      onChange={(e) =>
                        handleOnChangeInput(e.target.value, "gender")
                      }
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.address}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "address")
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Avatar</label>
                <input
                  type="text"
                  className="form-control"
                  value={userData.avatar}
                  onChange={(event) =>
                    handleOnChangeInput(event.target.value, "avatar")
                  }
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => updateUser()}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
