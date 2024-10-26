import { useContext, useEffect, useState } from "react";
import troop from "../../firebase/template/troops.json";
import { FormContext } from "./formContext";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  getDefaultScoutDataForm,
  getTroopsListShorted,
} from "../../firebase/template/setting";
import { useNavigate } from "react-router-dom";

// 説明：uid取得してその内容をDBに問い合わせて描画
const BasicInfo = () => {
  //データ保管用
  const [person, setPerson] = useState(getDefaultScoutDataForm());

  //編集済みフラグ
  const [edited, setEdited] = useState(false);

  //ページ遷移用
  const nav = useNavigate();

  const {
    uid,
    setUserName,
    setIsNew,
    setDisableEdit,
    disableEdit,
    isNew,
    belonged,
    setBelonged,
  } = useContext(FormContext);

  //データを保存する関数
  const savePerson = () => {
    // ここにpersonを保存する処理を記述する
    if (isNew) {
      //新規作成ならaddDoc
      addDoc(collection(db, "scouts"), person).then(
        (docs) => {
          console.log("Document successfully written!" + docs.id);
          nav("/admin/scouts/" + docs.id);
        },
        (error) => console.error("Error writing document: ", error)
      );
      setDisableEdit(true); // 新規登録時は編集不可にする
      setIsNew(false); // 新規登録時は新規登録ではない
    } else {
      // 既存データならsetDoc
      setDoc(doc(db, "scouts", uid), person).then(
        () => console.log("Document successfully written!"),
        (error) => console.error("Error writing document: ", error)
      );
    }
  };

  // uidが取得できたらDBからpersonデータを読み出す
  const loadPerson = () => {
    getDoc(doc(db, "scouts", uid))
      .then((doc) => {
        if (doc.data()) {
          //データstate保存時に起きる処理
          const data = doc.data();
          let tmp = {};
          getTroopsListShorted().forEach((e) => {
            tmp[e] = data.history[e];
          });
          setPerson(data);
          //setDefaultPerson(data); // 初期表示用に保持しておく 追記：没
          setUserName(data.firstname + " " + data.lastname); //名前表示
          setIsNew(false); // 取得できた時は新規登録ではない
          setBelonged(tmp);
          setEdited(false);
          console.log("Document was found!");
        } else {
          setDisableEdit(false);
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  };

  // uidが変わったら読み出し直す
  useEffect(() => {
    if (uid) {
      loadPerson();
    }
    //初回編集ならフラグを立てる
    if (!edited) {
      setEdited(true);
    }
  }, [uid]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        savePerson();
      }}
    >
      <div className="card mb-3">
        <div className="card-body text-center">
          <h3 className="card-title">基本情報</h3>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-6">
              <label htmlFor="name">名前</label>
              <div className="form-group mb-1" id="name">
                <div className="input-group flex-nowrap">
                  <label className="input-group-text" htmlFor="firstname">
                    名字
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    disabled={disableEdit}
                    value={person && person.firstname}
                    onChange={(e) =>
                      setPerson({ ...person, firstname: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group flex-nowrap">
                  <label className="input-group-text" htmlFor="lastname">
                    名前
                  </label>
                  <input
                    required
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    disabled={disableEdit}
                    value={person && person.lastname}
                    onChange={(e) =>
                      setPerson({ ...person, lastname: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form-group mb-1">
                <label htmlFor="belong">現在所属隊</label>
                <select
                  className="form-select"
                  id="belong"
                  name="belong"
                  value={person && person.belong}
                  disabled={disableEdit}
                  onChange={(e) =>
                    setPerson({
                      ...person,
                      belong: e.target.value,
                    })
                  }
                >
                  {troop.map((troop) => (
                    <option key={troop.short} value={troop.short}>
                      {troop.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="last">経験隊</label>
                <div
                  className="d-flex flex-wrap align-content-center justify-content-center"
                  id="last"
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
                          name={`last${i.short}`}
                          id={`inlineCheckbox${i.short}`}
                          disabled={disableEdit}
                          value={i.short}
                          checked={
                            person && person.history && person.history[i.short]
                          }
                          onChange={(e) => {
                            setPerson({
                              ...person,
                              history: {
                                ...person.history,
                                [i.short]: e.target.checked,
                              },
                            });

                            setBelonged({
                              ...belonged,
                              [i.short]: e.target.checked,
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
            </div>
            <div className="col-12 col-lg-12">
              <label htmlFor="commment">コメント</label>
              <textarea
                name="comment"
                className="form-control"
                id="comment"
                type="text"
                disabled={disableEdit}
                value={person && person.comment}
                onChange={(e) => {
                  setPerson({ ...person, comment: e.target.value });
                }}
                placeholder="ここに内容を入力・・・"
                rows={3}
              />
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-end">
          {edited ? (
            <button className="btn btn-primary">保存</button>
          ) : (
            <span>変更がありません</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default BasicInfo;
