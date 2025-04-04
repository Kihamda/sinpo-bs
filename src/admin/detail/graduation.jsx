//詳細画面での進級過程表示
import { useState, useContext, useEffect } from "react";
import { getTroopsListShorted } from "../../firebase/template/setting";
import { getFormattedDate } from "../../firebase/tools";
import { FormContext } from "./formContext";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Graduation = () => {
  const [graduation, setGraduation] = useState([]);
  const [editHistory, setEditHistory] = useState([]);

  //所属履歴のContextを取得
  const { belonged, uid, isNew } = useContext(FormContext);

  //読み込み処理
  useEffect(() => {
    //uidが変わったら読み出し直す
    let tmp = [];
    if (!isNew) {
      getDocs(collection(db, "scouts", uid, "graduation")).then((docs) => {
        docs.forEach((doc) => {
          if (doc.data()) {
            tmp.push({ ...doc.data(), id: doc.id });
          }
        });
        setGraduation(tmp);
      });
    }
  }, [uid, isNew]);

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="text-center">進級記録</h3>
        <div className="d-flex w-100">
          <div className="mt-3 d-flex flex-column w-100 justify-content-center">
            {getTroopsListShorted().map((trp) => {
              if (belonged[trp]) {
                return (
                  <div className="row justify-content-center" key={trp}>
                    {graduation &&
                      graduation
                        .map((el) => {
                          if (el.type.name === trp) {
                            return el;
                          }
                        })
                        .filter((e) => e !== undefined)
                        .sort((a, b) => {
                          return a.type.row - b.type.row;
                        })
                        .map((e, index) => {
                          if (index === 0) {
                            return <OneHeader key={e.id} id={e.id} data={e} />;
                          } else {
                            return <OneGrid key={e.id} id={e.id} data={e} />;
                          }
                        })}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-end">
        <span>変更は保存ボタンで</span>
      </div>
    </div>
  );
};

const OneGrid = ({ id, data }) => {
  const { disableEdit, uid } = useContext(FormContext);
  const [e, setE] = useState(data);
  const [editing, setEditing] = useState(false);

  const sendData = () => {
    setDoc(doc(db, "scouts", uid, "graduation", id), e).then(() => {
      setEditing(false);
    });
  };

  return (
    <div
      key={id}
      className="col-10 d-flex pt-3 pb-3 text-center"
      style={{ borderBottom: "solid 1px #000" }}
    >
      <div className="row w-100">
        <div className="col-6 col-md-3 d-grid align-content-center">
          <span className="text-start">{e.name}</span>
        </div>
        <div className="col-6 col-md-2 d-grid align-content-center">
          {editing ? (
            <div
              className="form-check form-check-inline justify-content-start d-flex"
              key={id}
            >
              <input
                type="checkbox"
                className="form-check-input"
                id={`inlineCheckbox${id}`}
                value={e.cleared}
                checked={e.cleared}
                onChange={(ev) => {
                  setE({ ...e, cleared: ev.target.checked });
                }}
              />
              <label
                htmlFor={`inlineCheckbox${id}`}
                className="form-check-label ms-1"
              >
                取得済み
              </label>
            </div>
          ) : (
            <span className="text-end text-md-start">
              {e.cleared ? "取得済み" : "未取得"}
            </span>
          )}
        </div>
        <div className="col-6 col-md-5 d-grid align-content-center">
          {e.cleared && (
            <>
              {editing ? (
                <div className="w-100">
                  <label htmlFor={"tookdate" + uid} className="form-label">
                    取得日時
                  </label>
                  <input
                    type="date"
                    id={"tookdate" + uid}
                    className="form-control"
                    value={e.finished && getFormattedDate(e.finished)}
                    onChange={(ev) => {
                      setE({
                        ...e,
                        finished: new Date(ev.target.value).valueOf(),
                      });
                    }}
                  />
                </div>
              ) : (
                <span className="text-end">
                  取得日時：
                  {e.finished
                    ? getFormattedDate(e.finished).replaceAll("-", "/")
                    : "データなし"}
                </span>
              )}
            </>
          )}
        </div>
        <div className="col-6 col-md-2 d-grid justify-content-end align-content-center">
          {editing ? (
            <button
              className={`btn btn-primary`}
              onClick={() => {
                sendData();
              }}
            >
              保存
            </button>
          ) : (
            <button
              className={`btn ${disableEdit ? "btn-secondory" : "btn-primary"}`}
              disabled={disableEdit}
              onClick={() => {
                setEditing(true);
              }}
            >
              編集
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const OneHeader = ({ id, data }) => {
  const { disableEdit, uid } = useContext(FormContext);
  const [e, setE] = useState(data);
  const [editing, setEditing] = useState(false);

  const sendData = () => {
    setDoc(doc(db, "scouts", uid, "graduation", id), e).then(() => {
      setEditing(false);
    });
  };

  return (
    <div
      key={id}
      className="col-10 d-flex pt-4 pb-3 text-center"
      style={{ borderBottom: "solid 2px #000" }}
    >
      <div className="row w-100">
        <div className="col-6 col-md-3 d-grid align-content-center">
          <span className="text-start">{e.name}</span>
        </div>
        <div className="col-6 col-md-2 d-grid align-content-center"></div>
        <div className="col-6 col-md-5 d-grid align-content-center">
          {
            <>
              {editing ? (
                <div className="w-100">
                  <label htmlFor={"tookdate" + id} className="form-label">
                    入隊日時
                  </label>
                  <input
                    type="date"
                    id={"tookdate" + id}
                    className="form-control"
                    value={e.finished && getFormattedDate(e.finished)}
                    onChange={(ev) => {
                      setE({
                        ...e,
                        finished: new Date(ev.target.value).valueOf(),
                      });
                    }}
                  />
                </div>
              ) : (
                <span className="text-end">
                  入隊日時：
                  {e.finished
                    ? getFormattedDate(e.finished).replaceAll("-", "/")
                    : "データなし"}
                </span>
              )}
            </>
          }
        </div>
        <div className="col-6 col-md-2 d-grid justify-content-end align-content-center">
          {editing ? (
            <button
              className={`btn btn-primary`}
              onClick={() => {
                sendData();
              }}
            >
              保存
            </button>
          ) : (
            <button
              className={`btn ${disableEdit ? "btn-secondory" : "btn-primary"}`}
              disabled={disableEdit}
              onClick={() => {
                setEditing(true);
              }}
            >
              編集
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Graduation;
