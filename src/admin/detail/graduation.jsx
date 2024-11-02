//詳細画面での進級過程表示
import { useState, useContext, useEffect } from "react";
import { getTroopsListShorted } from "../../firebase/template/setting";
import { getFormattedDate } from "../../firebase/tools";
import { FormContext } from "./formContext";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Graduation = () => {
  //タブ管理用
  const [tab, setTab] = useState("GEN");

  const [graduation, setGraduation] = useState([]);
  const [editHistory, setEditHistory] = useState([]);

  //所属履歴のContextを取得
  const { belonged, uid, disableEdit, isNew } = useContext(FormContext);

  //編集フラグ
  const [edited, setEdited] = useState(false);

  //保存処理
  const saveGraduation = () => {
    let tmp = [];
    graduation.forEach((e) => {
      if (editHistory.find((f) => f == e.id)) {
        tmp.push(e);
      }
    });

    tmp.forEach((f, i) => {
      const data = {
        name: f.name,
        finished: f.finished,
        del: f.del,
        type: f.type,
      };
      setDoc(doc(db, "scouts", uid, "graduation", f.id), data).then(() => {
        console.log("sended" + i);
        if (i + 1 >= tmp.length) {
          setEdited(false);
          setEditHistory([]);
          console.log("saved:" + i);
        }
      });
    });
  };

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
        setEdited(false);
      });
    }
  }, [uid, isNew]);

  return (
    <div className="card">
      <div className="card-body" style={{ height: "60vh", overflowY: "auto" }}>
        <h3 className="text-center">進級記録</h3>
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
          {getTroopsListShorted().map((e, ind) => {
            return (
              <li className="nav-item" key={ind}>
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
                graduation
                  .map((e, index) => {
                    if (e.type.find((h) => h.name == tab))
                      return { ...e, index: index }; //タブの中身選出
                  })
                  .filter((item) => item !== undefined) //undefinedを消す
                  .sort((a, b) => {
                    let aNum;
                    a.type.forEach((el) => {
                      if (el.name == tab) aNum = el.row; //rowの中身で並び替え
                    });
                    let bNum;
                    b.type.forEach((el) => {
                      if (el.name == tab) bNum = el.row;
                    });

                    return aNum - bNum;
                  })
                  .map((e) => {
                    //jsx出力
                    return (
                      <div
                        className="form-group justi9fy-content-center"
                        key={e.index}
                      >
                        <label className="form-label">{e.name}</label>
                        <input
                          className="form-control"
                          type="date"
                          disabled={disableEdit}
                          value={e.finished && getFormattedDate(e.finished)}
                          onChange={(f) => {
                            let tmp = graduation;
                            tmp[e.index] = {
                              ...graduation[e.index],
                              finished: new Date(f.target.value).valueOf(),
                            };

                            if (!editHistory.includes(graduation[e.index].id)) {
                              setEditHistory([
                                ...editHistory,
                                graduation[e.index].id,
                              ]);
                            }
                            setGraduation(tmp);
                            setEdited(true);
                          }}
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
          <button
            className="btn btn-primary"
            disabled={disableEdit}
            onClick={saveGraduation}
          >
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
