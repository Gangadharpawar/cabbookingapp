import React, { Fragment } from "react";
import {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import "./Studentcab.css";

const Student_cab_booking = () => {
  const [id, setsid] = useState(0);
  const [sname, setsname] = useState();
  const [scontact, setscontact] = useState();
  const [sgender, setsgender] = useState("Male");
  const [sdivistion, setsdivistion] = useState();
  const [stransport, setstransport] = useState(false);
  const [data, setdata] = useState([]);
  const [editid, seteditid] = useState(0);

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (editid) {
      const editstud = data.find((i) => i.id === editid);
      const updatestud = data.map((t) =>
        t.id === editstud.id
          ? (t = { id: t.id, sname, scontact, sgender, sdivistion, stransport })
          : {
              id: t.id,
              sname: t.sname,
              scontact: t.scontact,
              sgender: t.sgender,
              sdivistion: t.sdivistion,
              stransport: t.stransport,
            }
      );
      setdata(updatestud);
      seteditid(0);
      allclear("");
      return;
    } else {
      setdata([
        { id, sname, scontact, sgender, sdivistion, stransport },
        ...data,
      ]);
      allclear("");
    }
  };
  const allclear = () => {
    setsname("");
    setscontact("");
    setsgender("");
    setsdivistion("");
    setstransport("");
  };
  const handelEdit = (id) => {
    seteditid(id);
    const editstud = data.find((i) => i.id === id);
    setsname(editstud.sname);
    setscontact(editstud.scontact);
    setsgender(editstud.sgender);
    setsdivistion(editstud.sdivistion);
    setstransport(editstud.stransport);
  };
  const handelDelete = (id) => {
    alert("Row Deleted");
    const delStude = data.filter((to) => to.id !== id);
    setdata([...delStude]);
  };

  return (
    <Fragment>
      {/* <h1>I have rendered {count} times!</h1> */}
      <div>
        <h1>STUDENT CAB BOOKING APP</h1>
      </div>
      <div className="wraper">
        <form className="Crudform" onSubmit={HandleSubmit}>
          <div className="item">
            <span className="input_label">Student Name</span>
            <span className="input_type">
              <input
                type="text"
                id="stname"
                name="sname"
                value={sname}
                onChange={(e) => setsname(e.target.value)}
                required
              />
            </span>
          </div>
          <div className="item">
            <span className="input_label">Contact Number </span>
            <span className="input_type">
              <input
                type="number"
                id="stcontact"
                name="stcontact"
                value={scontact}
                onChange={(e) => setscontact(e.target.value)}
                required
              />
            </span>
          </div>
          <div className="item">
            <span className="input_label">Gender</span>
            <span className="input_type">
              <input
                type="radio"
                id="Male"
                name="gender"
                value={"Male"}
                checked={sgender === "Male"}
                onChange={(e) => setsgender(e.target.value)}
              />
              Male
              <input
                type="radio"
                id="Female"
                name="gender"
                value={"Female"}
                checked={sgender === "Female"}
                onChange={(e) => setsgender(e.target.value)}
              />
              Female
            </span>
          </div>
          <div className="item">
            <span className="input_label">Division</span>
            <span className="input_type">
              <select
                id="stdivistion"
                value={sdivistion}
                onChange={(e) => setsdivistion(e.target.value)}
                required
              >
                <option>Select Division</option>
                <option value={"I"}>I</option>
                <option value={"II"}>II</option>
                <option value={"III"}>III</option>
                <option value={"IV"}>IV</option>
              </select>
            </span>
          </div>
          <div className="item">
            <span className="input_label">Transport </span>
            <span className="input_type">
              <input
                type="checkbox"
                id="sttransport"
                name="sttransport"
                value={stransport}
                onChange={(e) => setstransport(e.target.checked ? "YES" : "NO")}
              />
              Transport Required
            </span>
          </div>
          <div className="btn">
            <span className="allbtn">
              <input
                type="submit"
                value={editid ? "Update" : "Add"}
                onClick={() => setsid(id + 1)}
              />
              {/* <input type="button"  value="Update" name="btnupdate" id="btnupdate"/> */}
            </span>
          </div>
        </form>
        <table className="stable" id="student_cab">
          <tr>
            <th>ID</th>
            <th>Name </th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Division</th>
            <th>Transport</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {data.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.sname}</td>
              <td>{t.scontact}</td>
              <td>{t.sgender}</td>
              <td>{t.sdivistion}</td>
              <td>{t.stransport}</td>
              <td>
                <a href onClick={() => handelEdit(t.id)}>
                  {" "}
                  Edit
                </a>
              </td>
              <td>
                {" "}
                <a href onClick={() => handelDelete(t.id)}>
                  Delete
                </a>
              </td>
              {/* <button onClick={()=>handelDelete(t.id)}>Delete</button> */}
            </tr>
          ))}
        </table>
      </div>
    </Fragment>
  );
};

export default Student_cab_booking;
