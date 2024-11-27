import "./Roles.css";
import { useDebugValue, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

import TableRoles from "./TableRoles";
import { createRoles } from "../../services/roleService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Roles() {
  const dataChildDefault = { url: "", description: "", isValidUrl: true };

  const childRef = useRef();

  const [listChilds, setListChilds] = useState({
    child1: dataChildDefault,
  });

  const handleOnChangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;
    if (value && name === "url") {
      _listChilds[key]["isValidUrl"] = true;
    }
    setListChilds(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = dataChildDefault;
    setListChilds(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let result = [];
    Object.entries(_listChilds).map(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });

    return result;
  };

  const handleSave = async () => {
    let invalidObj = Object.entries(listChilds).find(([key, child], index) => {
      return child && !child.url;
    });
    if (!invalidObj) {
      // call api
      let data = buildDataToPersist();
      let res = await createRoles(data);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        childRef.current.fetListRolesAgain();
      }
    } else {
      // error
      toast.error("Input URL must not be empty...");
      let _listChilds = _.cloneDeep(listChilds);
      const key = invalidObj[0];
      _listChilds[key]["isValidUrl"] = false;
      setListChilds(_listChilds);
    }
  };

  return (
    <div className="role-container">
      <div className="padding-roles">
        <div className=" mt-3">
          <div className="title-role">
            <h4>Add a new role...</h4>
          </div>
          <div className="role-parent">
            {Object.entries(listChilds).map(([key, child], index) => {
              return (
                <div className="row role-child" key={`child-${key}`}>
                  <div className={`col-5 form-group ${key}`}>
                    <label> URL:</label>
                    <input
                      type="text"
                      className={
                        child.isValidUrl
                          ? "form-control"
                          : "form-control is-invalid"
                      }
                      value={child.url}
                      onChange={(event) =>
                        handleOnChangeInput("url", event.target.value, key)
                      }
                    />
                  </div>
                  <div className="col-5 form-group">
                    <label> Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={child.description}
                      onChange={(event) =>
                        handleOnChangeInput(
                          "description",
                          event.target.value,
                          key
                        )
                      }
                    />
                  </div>
                  <div className="col-2 mt-4 actions">
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      className="plus-circle-icon mx-2"
                      onClick={() => handleAddNewInput()}
                    ></FontAwesomeIcon>
                    {index >= 1 && (
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="trash-icon"
                        onClick={() => handleDeleteInput(key)}
                      ></FontAwesomeIcon>
                    )}
                  </div>
                </div>
              );
            })}
            <div>
              <button
                className="btn btn-warning mt-3"
                onClick={() => handleSave()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="mt-3 table-roles">
          <h4>List Current Roles: </h4>
          <TableRoles ref={childRef} />
        </div>
      </div>
    </div>
  );
  // return (
  //     <div className="roles">
  //         <div className="add-role">
  //             <h5 className="add-role-title">Add a new role:</h5>
  //             <input type="text" className="add-role-url" placeholder="URL..." />
  //             <input type="text" className="add-role-description" placeholder="Description.." />
  //             <button type="submit" className="save-new-role">Add role</button>
  //         </div>
  //         <div className="title">
  //             <span className="r-id">ID</span>
  //             <span className="url">URL</span>
  //             <span className="description">Description</span>
  //             <span className="actions">Actions</span>
  //         </div>
  //         <ul className="roles-list">
  //             <li className="roles-item">
  //                 <span className="role-id">001</span>
  //                 <span className="role-url">..................................</span>
  //                 <span className="role-description">nothingnothingnothingnothingnothingnothing</span>
  //                 <span className="role-actions">
  //                     <FontAwesomeIcon icon={faTrashCan} className="trash-icon"></FontAwesomeIcon>
  //                 </span>
  //             </li>
  //         </ul>
  //     </div>
  // )
}

export default Roles;
