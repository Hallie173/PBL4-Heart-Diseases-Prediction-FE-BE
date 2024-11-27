import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./GroupRoles.css";
import { fetchGroup } from "../../services/userService";
import {
  fetchAllRoles,
  fetchRolesByGroup,
  assignRolesToGroup,
} from "../../services/roleService";
import _, { cloneDeep } from "lodash";
import { toast } from "react-toastify";

function GroupRoles() {
  const [userGroups, setUserGroups] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");

  const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

  useEffect(() => {
    getGroups();
    getAllRoles();
  }, []);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      setUserGroups(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  const getAllRoles = async () => {
    let data = await fetchAllRoles();
    if (data && +data.EC === 0) {
      setListRoles(data.DT);
    }
  };

  const handleOnchangeGroup = async (value) => {
    setSelectGroup(value);
    if (value) {
      let data = await fetchRolesByGroup(value);

      if (data && +data.EC === 0) {
        let result = buildDataRolesByGroup(data.DT, listRoles);
        setAssignRolesByGroup(result);
      }
    }
  };

  const buildDataRolesByGroup = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let object = {};
        object.url = role.url;
        object._id = role._id;
        object.description = role.description;
        object.isAssigned = false;
        if (groupRoles && groupRoles.length > 0) {
          object.isAssigned = groupRoles.some(
            (item) => item.url === object.url
          );
        }

        result.push(object);
      });
    }

    return result;
  };

  const handleSelectRole = (value) => {
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    let foundIndex = _assignRolesByGroup.findIndex(
      (item) => item._id === value
    );
    if (foundIndex > -1) {
      _assignRolesByGroup[foundIndex].isAssigned =
        !_assignRolesByGroup[foundIndex].isAssigned;
    }

    setAssignRolesByGroup(_assignRolesByGroup);
  };

  const buildDataToSave = () => {
    let result = {};
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    result.groupId = selectGroup;
    let groupRolesFilter = _assignRolesByGroup.filter(
      (item) => item.isAssigned === true
    );
    let finalGroupRoles = groupRolesFilter.map((item) => {
      let data = { groupId: selectGroup, roleId: item._id };
      return data;
    });
    result.groupRoles = finalGroupRoles;
    return result;
  };

  const handleSave = async () => {
    let data = buildDataToSave();
    let res = await assignRolesToGroup(data);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  useEffect(() => {
    console.log(assignRolesByGroup);
  }, [assignRolesByGroup]);
  return (
    <div className="group-roles">
      <div className="select-div">
        <h5 className="select-title">
          Select a group: (<span className="text-danger">*</span>)
        </h5>
        <select
          className={"form-select"}
          onChange={(event) => handleOnchangeGroup(event.target.value)}
        >
          <option value="">Please select your group</option>
          {userGroups.length > 0 &&
            userGroups.map((item, index) => {
              return (
                <option key={`group-${index}`} value={item._id}>
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
      <hr />
      {selectGroup && (
        <div className="roles">
          <h5>Assign Roles: </h5>
          {assignRolesByGroup &&
            assignRolesByGroup.length > 0 &&
            assignRolesByGroup.map((item, index) => {
              return (
                <div className="form-check mb-4" key={`list-role-${index}`}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={item._id}
                    id={`list-role-${index}`}
                    checked={item.isAssigned}
                    onChange={(event) => handleSelectRole(event.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`list-role-${index}`}
                  >
                    {item.url}
                  </label>
                </div>
              );
            })}
          <div className="mt-3">
            <button className="btn btn-warning" onClick={() => handleSave()}>
              Save
            </button>
          </div>
        </div>
      )}
      {/* <div className="assign-roles">
        <h5 className="assign-roles-title">Assign Roles:</h5>
        <label for="ad-create">
          <input type="checkbox" id="ad-create" />
          /admin/create
        </label>
        <label for="ad-update">
          <input type="checkbox" id="ad-update" />
          /admin/update
        </label>
        <label for="ad-read">
          <input type="checkbox" id="ad-read" />
          /admin/read
        </label>
        <label for="ad-delete">
          <input type="checkbox" id="ad-delete" />
          /admin/delete
        </label>

        <button type="submit" className="save-roles-list">
          Save
        </button>
      </div> */}
    </div>
  );
}

export default GroupRoles;
