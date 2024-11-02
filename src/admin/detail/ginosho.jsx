import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { FormContext } from "./formContext";
import { getFormattedDate } from "../../firebase/tools";

const Ginosho = () => {
  const defaultValue = {
    kind: "",
    date: "",
    inspector: "",
    comment: "",
  };

  const [ginosho, setGinosho] = useState([]); //データ保管用
  const [editing, setEditing] = useState(defaultValue);
  const [isEditor, setIsEditor] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const { uid, disableEdit } = useContext(FormContext);

  //記録の保存
  const handleSave = () => {
    const data = {
      kind: editing.kind,
      date: new Date(editing.date).valueOf(),
      inspector: editing.inspector,
      comment: editing.comment,
    };
    if (isNew) {
      setDoc(doc(collection(db, "scouts", uid, "ginosho")), data).then(() => {
        alert("技能賞の作成を保存しました");
        setEditing(defaultValue);
        loadGinosho();
        setIsNew(false);
      });
    } else {
      setDoc(doc(db, "scouts", uid, "ginosho", editing.id), data).then(() => {
        alert("技能賞の変更を保存しました");
        loadGinosho();
        setEditing(defaultValue);
      });
    }
  };

  //記録の読み込み
  const loadGinosho = () => {
    getDocs(collection(db, "scouts", uid, "ginosho")).then((e) => {
      let tmp = [];
      e.forEach((doc) => {
        if (doc.data()) {
          tmp.push({ ...doc.data(), id: doc.id });
        }
      });
      setGinosho(tmp);
      setIsEditor(false);
    });
  };

  useEffect(() => {
    loadGinosho();
  }, [uid]);

  return (
    <>
      {isEditor ? (
        <div className="card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="card-body">
              <h3 className="card-title text-center mb-0">技能賞</h3>
              <span className="card-title d-grid text-center">
                {!isNew ? editing.kind : "新しい記録"}
                について編集中です
              </span>
              <div className="d-flex flex-column" style={{ height: "60vh" }}>
                <div className="row" style={{ flex: "0" }}>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">種類</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      value={editing.kind && editing.kind}
                      onChange={(e) => {
                        setEditing({
                          ...editing,
                          kind: e.target.value ? e.target.value : "",
                        });
                      }}
                    />
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    <label className="form-label">取得日時</label>
                    <input
                      required
                      type="date"
                      className="form-control"
                      value={editing.date && getFormattedDate(editing.date)}
                      onChange={(e) => {
                        setEditing({
                          ...editing,
                          date: e.target.value
                            ? new Date(e.target.value).valueOf()
                            : "",
                        });
                      }}
                    />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="form-label">考査員</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editing.inspector && editing.inspector}
                      onChange={(e) => {
                        setEditing({
                          ...editing,
                          inspector: e.target.value ? e.target.value : "",
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="row" style={{ flex: "1" }}>
                  <div className="col-12 d-flex flex-column">
                    <label className="form-label" style={{ flex: 0 }}>
                      コメント
                    </label>
                    <textarea
                      className="form-control"
                      value={editing.comment && editing.comment}
                      style={{ flex: 1 }}
                      onChange={(e) => {
                        setEditing({
                          ...editing,
                          comment: e.target.value ? e.target.value : "",
                        });
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex">
              <div className="ms-auto">
                <button className="btn btn-primary">保存</button>
                <button
                  className="btn btn-outline-secondary ms-2"
                  onClick={() => {
                    setEditing(defaultValue);
                    setIsEditor(false);
                    setIsNew(false);
                  }}
                  type="button"
                >
                  一覧に戻る
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">技能賞</h3>
            <div
              className="table-responsive-lg text-nowrap"
              style={{ height: "60vh", overflowY: "auto" }}
            >
              <table className="table" style={{ minWidth: "700px" }}>
                <thead>
                  <tr>
                    <th style={{ width: "20%" }}>種類</th>
                    <th style={{ width: "10%" }}>取得日時</th>
                    <th style={{ width: "20%" }}>考査員</th>
                    <th style={{ width: "40%" }}>コメント</th>
                    <th style={{ width: "10%" }}>操作</th>
                  </tr>
                </thead>
                <tbody className="">
                  {ginosho.map((e) => {
                    return (
                      <tr key={e.id} className="align-middle">
                        <td>{e.kind}</td>
                        <td>{getFormattedDate(e.date).replaceAll("-", "/")}</td>
                        <td>{e.inspector}</td>
                        <td className="text-wrap">{e.comment}</td>
                        <td>
                          <span
                            className="link-primary"
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              !disableEdit && setEditing(e);
                              !disableEdit && setIsEditor(true);
                            }}
                          >
                            {!disableEdit && "編集"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer d-flex flex-wrap align-items-center">
            <span>データは編集画面で保存を押したときに保存されます</span>
            <div className="ms-auto">
              <button
                disabled={disableEdit}
                className="btn btn-primary"
                onClick={() => {
                  setEditing(defaultValue);
                  setIsEditor(true);
                  setIsNew(true);
                }}
              >
                新規記録の作成
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Ginosho;
