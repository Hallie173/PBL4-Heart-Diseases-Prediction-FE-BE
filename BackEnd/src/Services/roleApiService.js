import db from "../Models/index.js";

const createNewRoles = async (roles) => {
  try {
    let currentRoles = await db.roles.find({}).select("url description").lean();
    const persists = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );

    if (persists.length === 0) {
      return { EM: "Nothing to create...", EC: 0, DT: [] };
    }

    await db.roles.insertMany(persists); // Dùng insertMany để thêm nhiều role
    return {
      EM: `Create roles succeeds: ${persists.length} roles...`,
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const getAllRolesWithPaging = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const roles = await db.roles
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 }) // Sắp xếp theo id giảm dần
      .lean();
    const totalCount = await db.roles.countDocuments(); // Đếm tổng số bản ghi
    const totalPages = Math.ceil(totalCount / limit);
    return {
      EM: "Get all Roles succeeds...",
      EC: 0,
      DT: {
        totalRows: totalCount,
        totalPages: totalPages,
        roles: roles,
      },
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const getAllRoles = async () => {
  try {
    let data = await db.roles.find().sort({ _id: -1 }).lean();
    return {
      EM: "Get all Roles succeeds...",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const deleteRole = async (id) => {
  try {
    let role = await db.roles.findById(id);
    if (role) {
      await role.deleteOne(); // Xóa role
    }
    return {
      EM: "Delete Role succeeds...",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const getRoleByGroup = async (id) => {
  try {
    if (!id) {
      return {
        EM: "Not found any roles",
        EC: 0,
        DT: [],
      };
    }

    const groupRoles = await db.group_role.find({ groupId: id }).lean();

    if (!groupRoles || groupRoles.length === 0) {
      return {
        EM: "No roles found for this group",
        EC: 0,
        DT: [],
      };
    }

    const roleIds = groupRoles.map((gr) => gr.roleId);
    const roles = await db.roles
      .find({ _id: { $in: roleIds } })
      .select("_id url description")
      .lean();

    return {
      EM: "Get Role by group succeeds...",
      EC: 0,
      DT: roles,
    };
  } catch (error) {
    console.log(error);
    return { EM: "something wrong with service", EC: 1, DT: [] };
  }
};

const assignRoleToGroup = async (data) => {
  try {
    const { groupId, groupRoles } = data;

    // Xóa tất cả các liên kết roles với groupId hiện tại
    await db.group_role.deleteMany({ groupId });

    // Tạo liên kết mới
    const newGroupRoles = groupRoles.map((role) => ({
      groupId,
      roleId: role.roleId, // Assuming `roleId` is a field in the `groupRoles` array
    }));
    await db.group_role.insertMany(newGroupRoles);

    return {
      EM: "Assign Roles to Group succeeds...",
      EC: 0,
      DT: [],
    };
  } catch (error) {
    console.error(error);
    return { EM: "Something went wrong with the service", EC: 1, DT: [] };
  }
};

export default {
  createNewRoles,
  getAllRoles,
  getAllRolesWithPaging,
  deleteRole,
  getRoleByGroup,
  assignRoleToGroup,
};
