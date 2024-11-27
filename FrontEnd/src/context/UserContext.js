import React, { useState, useEffect } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  const userDefault = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };

  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState(userDefault);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };
  const updateContext = (account) => {
    setUser((prevUser) => ({
      ...prevUser, // Giữ nguyên các thuộc tính khác của user
      account: account, // Cập nhật lại phần `account`
    }));
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...userDefault, isLoading: false });
  };

  const fetchUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let token = response.DT.access_token;
      let email = response.DT.email;
      let username = response.DT.username;
      let firstName = response.DT.firstName;
      let lastName = response.DT.lastName;
      let phone = response.DT.phone;
      let gender = response.DT.gender;
      let avatar = response.DT.avatar;
      let address = response.DT.address;

      let data = {
        isAuthenticated: true,
        token,
        account: {
          groupWithRoles,
          email,
          username,
          firstName,
          lastName,
          phone,
          gender,
          avatar,
          address,
        },
        isLoading: false,
      };
      setUser(data);
    } else {
      setUser({ ...userDefault, isLoading: false });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <UserContext.Provider
      value={{ user, loginContext, updateContext, logoutContext }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
