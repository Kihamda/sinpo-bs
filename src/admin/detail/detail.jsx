import { useLocation, useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import BasicInfo from "./basicInfo";
import {
  getDefaultScoutDataForm,
  getTroopsListShorted,
} from "../../firebase/template/setting";
import { getFormattedDate } from "../../firebase/tools";

const Detail = () => {
  const defaultForm = getDefaultScoutDataForm();

  const [person, setPerson] = useState({});
  const [disableEdit, setDisableEdit] = useState(true);
  const [isNew, setIsNew] = useState(true);

  const locate = useLocation();
  const nav = useNavigate();
  const path = locate.pathname.slice(14);

  //読み込み時に実行
  useEffect(() => {
    if (path == "new") {
      //新規作成ならデフォルトで編集できるようにする
      setPerson(defaultForm);
      setDisableEdit(false);
    } else {
      //既存データを表示する
      getDoc(doc(db, "scouts", path)).then((e) => {
        console.log(e.data());
        if (e.data()) {
          setPerson(e.data());
          setIsNew(false);
        } else {
          //見つからなかったら一覧に流す
          alert("データが見つかりませんでした");
          nav("/admin/scouts");
        }
      });
    }
  }, [path]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!disableEdit) {
      if (path == "new") {
        setDoc(doc(collection(db, "scouts")), person).then(() => {
          alert("保存しました");
          nav("/admin/scouts");
        });
      } else {
        setDoc(doc(db, "scouts", path), person).then(() => {
          alert("保存しました");
          setDisableEdit(true);
        });
      }
    }
  };

  const deleteData = () => {
    if (window.confirm("本当に削除しますか？")) {
      if (
        window.confirm(
          "削除したデータは永久に復活できません。この操作に伴うデータの欠損について、制作者は責任を負いかねます。"
        )
      ) {
        deleteDoc(doc(db, "scouts", path)).then(() => {
          alert("削除しました");
          nav("/admin/scouts");
        });
      }
    }
  };

  return (
    <form onSubmit={handleSave} className="pb-2 justify-content-center">
      <div className="row">
        <div className="col-12">
          <div className="card mb-3">
            <div className="card-body d-flex justify-content-between">
              <h3>
                {!isNew
                  ? person.firstname + " " + person.lastname + "さんの情報"
                  : "新規スカウト"}
              </h3>
              <div className="d-flex">
                {disableEdit ? (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setDisableEdit(false);
                      }}
                      className="btn btn-primary"
                    >
                      編集
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        nav("/admin/scouts/");
                      }}
                      className="btn btn-outline-secondary ms-2"
                    >
                      一覧画面に戻る
                    </button>
                  </>
                ) : (
                  <>
                    <button type="submit" className="btn btn-primary">
                      保存
                    </button>
                    {!isNew && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteData();
                        }}
                        className="btn btn-danger ms-2"
                      >
                        削除
                      </button>
                    )}

                    <button
                      className="btn btn-outline-secondary ms-2"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        isNew ? nav("/admin/scouts") : setDisableEdit(true);
                      }}
                    >
                      保存せず終了
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <BasicInfo uid={path} diabeld />
        </div>
        <div className="col-12 col-lg-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center">進級記録</h4>
              <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                  <span
                    className={`nav-link ${tabNum2 == "GEN" && "active"}`}
                    onClick={() => {
                      setTabnum2("GEN");
                    }}
                  >
                    一般
                  </span>
                </li>
                {getTroopsListShorted().map((e) => {
                  return (
                    <li className="nav-item">
                      <span
                        className={`nav-link ${tabNum2 == e && "active"} ${
                          person &&
                          person.history &&
                          !person.history[e].exp &&
                          "disabled"
                        }`}
                        onClick={() => {
                          setTabnum2(e);
                        }}
                        disabled={
                          person && person.history && !person.history[e].exp
                        }
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
                    {person &&
                      person.history &&
                      person.history[tabNum2] &&
                      person.history[tabNum2].graduation.map((e, index) => {
                        return (
                          <div className="form-group justify-content-center">
                            <label className="form-label">{e.name}</label>
                            <input
                              className="form-control"
                              type="date"
                              disabled={disableEdit}
                              value={
                                e.finished &&
                                getFormattedDate(new Date(e.finished))
                              }
                              onChange={(e) => {
                                setPerson({
                                  ...person,
                                  history: {
                                    ...person.history,
                                    [tabNum2]: {
                                      ...person.history[tabNum2],
                                      graduation: person.history[
                                        tabNum2
                                      ].graduation.map((f, ind) => {
                                        return ind === index
                                          ? {
                                              ...f,
                                              finished: new Date(
                                                e.target.value
                                              ).getTime(),
                                            }
                                          : f;
                                      }),
                                    },
                                  },
                                });
                                person.history[tabNum2].graduation[
                                  index
                                ].finished = new Date(e.target.value);
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h4 className="text-center">その他のイベント</h4>
              <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                  <span
                    className={`nav-link ${tabNum == "GEN" && "active"}`}
                    onClick={() => {
                      setTabnum("GEN");
                    }}
                  >
                    一般
                  </span>
                </li>
                {getTroopsListShorted().map((e) => {
                  return (
                    <li className="nav-item">
                      <span
                        className={`nav-link ${tabNum == e && "active"} ${
                          person &&
                          person.history &&
                          !person.history[e].exp &&
                          "disabled"
                        }`}
                        onClick={() => {
                          setTabnum(e);
                        }}
                        disabled={
                          person && person.history && !person.history[e].exp
                        }
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
                    {person &&
                      person.history &&
                      person.history[tabNum] &&
                      person.history[tabNum].events.map((e, index) => {
                        return (
                          <div className="form-group justify-content-center">
                            <label className="form-label">{e.name}</label>
                            <input
                              className="form-control"
                              type="date"
                              disabled={disableEdit}
                              value={
                                e.finished &&
                                getFormattedDate(new Date(e.finished * 1000))
                              }
                              onChange={(e) => {
                                setPerson({
                                  ...person,
                                  history: {
                                    ...person.history,
                                    [tabNum]: {
                                      ...person.history[tabNum],
                                      events: person.history[tabNum].events.map(
                                        (f, ind) => {
                                          return ind === index
                                            ? {
                                                ...f,
                                                finished:
                                                  new Date(
                                                    e.target.value
                                                  ).getTime() / 1000,
                                              }
                                            : f;
                                        }
                                      ),
                                    },
                                  },
                                });
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 mb-3">
          <div className="card">
            <div className="card-body d-flex justify-content-center">
              <button type="button" className="btn btn-primary me-1">
                技能賞
              </button>
              <button type="button" className="btn btn-primary ms-1 me-1">
                奉仕活動履歴
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Detail;
