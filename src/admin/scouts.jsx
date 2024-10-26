import { useEffect, useState } from "react";
import troop from "../firebase/template/troops.json";
import { db } from "./../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
const Scouts = () => {
  const [filter, setFilter] = useState({
    name: "",
    mode: 0,
    troops: {
      BVS: true,
      CS: true,
      BS: true,
      VS: true,
      RS: true,
    },
  });
  const [scouts, setScouts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    getDocs(collection(db, "scouts")).then((snapshot) => {
      let tmp = [];
      snapshot.forEach((doc) => {
        tmp.push({ ...doc.data(), id: doc.id });
      });

      setScouts(tmp);
    });
  }, []);

  const isInFilter = (scout) => {
    let isAllowed = false;
    if (
      String(scout.firstname + scout.lastname).includes(filter.name) ||
      (scout = "")
    ) {
      if (filter.mode == 0) {
        Object.keys(filter.troops).forEach((e) => {
          if (filter.troops[e] && scout.belong == e) {
            console.log(scout);
            isAllowed = true;
          }
        });
      } else if (filter.mode == 1) {
        Object.keys(filter.troops).forEach((e) => {
          if (filter.troops[e] && scout.belong == e) {
            console.log(e);
            isAllowed = true;
          }
        });
      } else if (filter.mode == 2) {
        Object.keys(filter.troops).forEach((e) => {
          if (filter.troops[e] && scout.belong == e) {
            console.log(e);
            isAllowed = true;
          }
        });
      }
      return isAllowed;
    }
  };

  return (
    <>
      <div className="mb-3">
        <div className="card">
          <div className="card-body d-flex align-content-center flex-wrap">
            <h3 className="card-title text-center">スカウト一覧</h3>
            <div className="ms-auto">
              <Link className="btn btn-primary" to="/admin/scouts/new">
                スカウトの記録の新規作成
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">検索フォーム</h3>
            <div className="row">
              <div className="col-12 col-lg-4">
                <label htmlFor="name" className="form-label">
                  名前
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="氏名で検索"
                  value={filter.name}
                  onChange={(e) =>
                    setFilter({ ...filter, name: e.target.value })
                  }
                />
              </div>
              <div className="col-6 col-lg-4 d-flex flex-column">
                <label htmlFor="troop">隊ごと</label>
                <div
                  className=" d-flex flex-wrap align-content-center justify-content-center flex-grow-1"
                  id="troop"
                >
                  {troop.map((i) => {
                    return (
                      <div
                        className="form-check form-check-inline"
                        key={i.short}
                      >
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`inlineCheckbox${i.short}`}
                          value={i.short}
                          checked={filter.troops[i.short]}
                          onChange={(e) => {
                            setFilter({
                              ...filter,
                              troops: {
                                ...filter.troops,
                                [e.target.value]: e.target.checked,
                              },
                            });
                          }}
                        />
                        <label
                          htmlFor={`inlineCheckbox${i.short}`}
                          className="form-check-label"
                        >
                          {i.short}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-6  col-lg-4" id="group">
                <label htmlFor="group">条件</label>
                <select
                  className="form-select"
                  value={filter.mode}
                  onChange={(e) => {
                    setFilter({
                      ...filter,
                      mode: e.target.value,
                    });
                  }}
                >
                  <option value="0">に現在、所属する</option>
                  <option value="1">に過去、所属した</option>
                  <option value="2">に過去または現在、所属する</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="card h-100">
          <div className="card-body">
            <h3 className="card-title text-center">検索結果</h3>
            <div className="flex-grow-1">
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th style={{ width: "30%" }}>名前</th>
                    <th style={{ width: "10%" }}>所属</th>
                    <th style={{ width: "60%" }}>コメント</th>
                  </tr>
                </thead>
                <tbody>
                  {scouts.map((scout) => {
                    if (isInFilter(scout)) {
                      return (
                        <tr
                          key={scout.id}
                          onClick={() => nav(`/admin/scouts/${scout.id}`)}
                        >
                          <td>{scout.firstname + " " + scout.lastname}</td>
                          <td>{scout.belong}</td>
                          <td>{scout.comment}</td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scouts;
