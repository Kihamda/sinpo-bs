import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Share = () => {
  return (
    <Routes>
      <Route path="/" element={<ShareHome />} />
      <Route path="/new" element={<SharePopup dataid="new" />} />
      <Route
        path="/:id"
        element={<SharePopup dataid={`${useLocation().pathname.slice(13)}`} />}
      />
    </Routes>
  );
};

const ShareHome = () => {
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex">
            <h3 className="card-title me-auto">共有セッション</h3>
            <Link to="/admin/share/new" className="btn btn-primary">
              新規共有セッション
            </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body d-flex flex-column">
          <h3 className="card-title text-center">
            現在アクティブなセッション一覧
          </h3>
          <table className="table">
            <thead>
              <tr>
                <th>セッション名</th>
                <th>開始日時</th>
                <th>終了日時</th>
              </tr>
            </thead>
            <tbody>{}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const SharePopup = ({ dataid }) => {
  const [sessionName, setSessionName] = useState("");
  const [endTime, setEndTime] = useState("");
  const [scouts, setScouts] = useState([]);
  useEffect(() => {
    getDocs(collection(db, "scouts")).then((snapshot) => {
      let tmp = [];
      snapshot.forEach((doc) => {
        tmp.push({ ...doc.data(), id: doc.id });
      });

      setScouts(tmp);
    });
  }, []);
  return (
    <form className="row">
      <div className="card mb-3">
        <div className="card-body row">
          <h3 className="card-title text-center col-12">
            {dataid === "new" ? "新規共有セッション" : "共有セッション編集"}
          </h3>
          <div className="form-group col-12 col-md-6">
            <label htmlFor="sessionName">セッション名</label>
            <input
              type="text"
              className="form-control"
              id="sessionName"
              value={sessionName}
              required
              onChange={(e) => setSessionName(e.target.value)}
            />
          </div>
          <div className="form-group col-12 col-md-6">
            <label htmlFor="endTime">終了日時</label>
            <input
              type="date"
              className="form-control"
              id="endTime"
              value={endTime}
              required
              onChange={(e) => setEndTime(e.target)}
            />
          </div>
          <div className="form-group col-12">
            <label htmlFor="comment">コメント</label>
            <textarea
              className="form-control"
              id="comment"
              rows="3"
              defaultValue={
                dataid === "new"
                  ? ""
                  : "共有時にこの内容がコメントとして表示されます・・・"
              }
              placeholder="共有時にこの内容がコメントとして表示されます・・・"
            />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body row">
          <h3 className="card-title text-center col-12">対象スカウトの選択</h3>
          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>選択</th>
                <th style={{ width: "30%" }}>名前</th>
                <th style={{ width: "10%" }}>所属</th>
                <th style={{ width: "50%" }}>コメント</th>
              </tr>
            </thead>
            <tbody>
              {scouts.map((scout) => {
                return (
                  <tr key={scout.id}>
                    <td>
                      {" "}
                      <input
                        type="checkbox"
                        class="form-check-input"
                        value=""
                        aria-label="..."
                      />
                    </td>
                    <td>{scout.firstname + " " + scout.lastname}</td>
                    <td>{scout.belong}</td>
                    <td>{scout.comment}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </form>
  );
};

export default Share;
