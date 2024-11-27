require("dotenv").config();
import db from "../Models/index.js";
import loginRegisterService from "./loginRegisterService.js";
const { hashUserPassword, checkEmailExist, checkPhoneExist } = loginRegisterService;
import getGroupWithRoles from "../Services/JWTService.js";
import JWTActions from '../Middleware/JWTActions.js';
const { createJWT } = JWTActions;

const getGroups = async () => {
  try {
    // Sử dụng model `Group` để truy vấn và sắp xếp theo `name` tăng dần
    const data = await db.groups.find({}).sort({ name: 1 });

    return {
      EM: "Get group success", // Thông báo thành công
      EC: 0, // Error code = 0 (không lỗi)
      DT: data, // Trả về dữ liệu nhóm
    };
  } catch (error) {
    console.error("Error in getGroups service:", error);

    return {
      EM: "Error from service", // Thông báo lỗi
      EC: 1, // Error code = 1 (có lỗi)
      DT: [], // Không có dữ liệu
    };
  }
};

const getAllUsers = async () => {
  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    if (users) {
      return {
        EM: "get data success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get data success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;

    // Tìm user với phân trang và bao gồm thông tin từ Group
    const [users, count] = await Promise.all([
      db.accounts
        .find({})
        // .select("id username email phone sex address")
        .populate({
          path: "groupId", // Trường tham chiếu đến Group trong schema
          select: "name description id", // Chỉ lấy các trường cần thiết của Group
        })
        .skip(offset)
        .limit(limit)
        .sort({ id: -1 }), // Sắp xếp giảm dần theo id
      db.accounts.countDocuments(), // Đếm tổng số user
    ]);

    const totalPages = Math.ceil(count / limit);

    const data = {
      totalRows: count,
      totalPages: totalPages,
      users: users,
    };

    return {
      EM: "FETCH Ok!",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.error(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const createNewUser = async (data) => {
  try {
    // check email/phone number
    let isEmailExist = await checkEmailExist(data.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is a already exist",
        EC: 1,
        DT: "email",
      };
    }
    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone number is a already exist",
        EC: 1,
        DT: "phone",
      };
    }
    // hash user password
    let hashPassword = hashUserPassword(data.password);

    // create new user
    await db.User.create({ ...data, password: hashPassword });
    return {
      EM: "CREATE Ok!",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const updateUsers = async (data) => {
  try {
    if (!data.groupId) {
      return {
        EM: "Error with empty GroupId",
        EC: 1,
        DT: "group",
      };
    }
    let user = await db.User.findOne({
      where: { id: data.id },
    });

    if (user) {
      // update
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });
      return {
        EM: "Update User Success",
        EC: 0,
        DT: "",
      };
    } else {
      // not found user
      return {
        EM: "User not found",
        EC: 2,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    // xóa user nếu là company
    let company = await db.Company.findOne({
      where: { idAccount: id },
    });
    if (company) {
      await company.destroy();
    }
    if (user) {
      await user.destroy();

      return {
        EM: "DELETE user success",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "user not exist",
        EC: 2,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};

const getUserByEmail = async (email) => {
  try {
    let user = await db.User.findOne({
      attributes: [
        "firstName",
        "lastName",
        "email",
        "username",
        "address",
        "sex",
        "phone",
        "aboutMe",
        "skills",
        "education",
        "experience",
        "avatar",
      ],
      where: { email: email },
    });
    if (user) {
      return {
        EM: "get data user success",
        EC: 0,
        DT: user,
      };
    } else {
      return {
        EM: "get data user success",
        EC: 0,
        DT: [],
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};

const updateUser = async (data) => {
  try {
    // Tìm người dùng theo email
    let user = await db.accounts.findOne({ email: data.email }).exec();

    if (user) {
      // Cập nhật thông tin người dùng
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.gender = data.gender;
      user.address = data.address;
      user.avatar = data.avatar;
      user.groupId = data.group;

      // Lưu lại thay đổi
      await user.save();

      user = await db.accounts.findOne({ email: data.email }).exec();
      let groupWithRoles = await getGroupWithRoles(user);
      let payload = {
        id: user.id,
        groupWithRoles,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        phone: user.phone,
        gender: user.gender,
        avatar: user.avatar,
        address: user.address,
      };
      let token = createJWT(payload);
      return {
        EM: "Update User Success",
        EC: 0,
        DT: {
          access_token: token,
          groupWithRoles,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          phone: user.phone,
          gender: user.gender,
          avatar: user.avatar,
          address: user.address,
        },
      };
    } else {
      // Không tìm thấy người dùng
      return {
        EM: "User not found",
        EC: 2,
        DT: "",
      };
    }
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

export default {
  getGroups,
  getAllUsers,
  createNewUser,
  updateUsers,
  deleteUser,
  getUserWithPagination,
  getUserByEmail,
  updateUser,
};
