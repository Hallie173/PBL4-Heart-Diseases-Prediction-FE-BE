import axios from "../setup/axios";

const createRoles = (roles) => {
  return axios.post("/api/v1/role/create", [...roles]);
};

const fetchAllRoles = () => {
  return axios.get(`/api/v1/role/read-roles`);
};

const fetchAllRolesWithPaging = (page, limit) => {
  return axios.get(`/api/v1/role/read?page=${page}&limit=${limit}`);
};

const deleteRole = (role) => {
  return axios.delete("/api/v1/role/delete", {
    data: { id: role._id },
  });
};

const fetchRolesByGroup = (groupId) => {
  return axios.get(`/api/v1/role/by-group/${groupId}`);
};

const assignRolesToGroup = (data) => {
  return axios.post("/api/v1/role/assign-to-group", { data });
};

export {
  createRoles,
  fetchAllRoles,
  deleteRole,
  fetchRolesByGroup,
  assignRolesToGroup,
  fetchAllRolesWithPaging,
};
