//詳細画面での進級過程表示
import { useState, useContext, useEffect } from "react";
import {
  getDefaultScoutGraduation,
  getTroopsListShorted,
} from "../../firebase/template/setting";
import { getFormattedDate } from "../../firebase/tools";
import { FormContext } from "./formContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Graduation = () => {
  //タブ管理用
  const [tab, setTab] = useState("GEN");

  const [graduation, setGraduation] = useState("");
  const [edited, setEdited] = useState(false);
  //所属履歴のContextを取得
  const { belonged, uid, disableEdit, isNew } = useContext(FormContext);

  //
  const loadGraduation = () => {
    let tmp = getDefaultScoutGraduation();
    if (!isNew) {
      getDocs(collection(db, "scouts", uid, "graduation"));
    }
    setGraduation(tmp);
  };

  useEffect(() => {
    //uidが変わったら読み出し直す
    if (uid) {
      loadGraduation();
    }
  }, [uid]);

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="text-center">進級記録</h4>
        <ul className="nav nav-tabs justify-content-center">
          <li className="nav-item">
            <span
              className={`nav-link ${tab == "GEN" && "active"}`}
              onClick={() => {
                setTab("GEN");
              }}
            >
              一般
            </span>
          </li>
          {getTroopsListShorted().map((e) => {
            return (
              <li className="nav-item">
                <span
                  className={`nav-link ${tab == e && "active"} ${
                    !belonged[e] && "disabled"
                  }`}
                  onClick={() => {
                    setTab(e);
                  }}
                  disabled={!belonged[e]}
                >
                  {e}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="tab-content d-flex w-100">
          <div className="mt-3 d-flex flex-column w-100 justify-content-center">
            <div className="row">
              {graduation &&
                graduation[tab].map((e, index) => {
                  return (
                    <div className="form-group justify-content-center">
                      <label className="form-label">{e.name}</label>
                      <input
                        className="form-control"
                        type="date"
                        disabled={disableEdit}
                        value={
                          e.finished && getFormattedDate(new Date(e.finished))
                        }
                        onChange={(e) => {}}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-end">
        {edited ? (
          <button className="btn btn-primary" disabled={disableEdit}>
            保存
          </button>
        ) : (
          <span>変更がありません</span>
        )}
      </div>
    </div>
  );
};

export default Graduation;
