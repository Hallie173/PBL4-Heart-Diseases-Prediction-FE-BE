import db from "../Models/index.js";

const getGroupWithRoles = async (user) => {
  try {
    // Lấy thông tin group từ bảng `groups`
    let group = await db.groups
      .findOne({ _id: user.groupId })
      .select("_id name description") // Chọn các trường cần thiết
      .lean(); // Chuyển thành object thường để thêm thuộc tính

    if (group) {
      // Lấy thông tin các vai trò liên quan từ bảng `group_role`
      let groupRoles = await db.group_role
        .find({ groupId: group._id })
        .populate("roleId", "_id url description") // Populate trường `roleId` từ bảng `roles`
        .exec();

      // Thêm thuộc tính `roles` vào group
      group.roles = groupRoles.map((groupRole) => groupRole.roleId);
    }

    return group;
  } catch (error) {
    console.log(">> check error: ", error);
    return {};
  }
};

export default getGroupWithRoles;
