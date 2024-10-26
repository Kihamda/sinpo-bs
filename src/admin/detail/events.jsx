//設定画面でイベントを描画する

import { useContext, useEffect, useState } from "react";
import { getTroopsListShorted } from "../../firebase/template/setting";
import { getFormattedDate } from "../../firebase/tools";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { FormContext } from "./formContext";

const Events = () => {
  //タブ管理用
  const [tab, setTab] = useState("GEN");

  //contextを取得
  const { isNew, disableEdit } = useContext(FormContext);

  //Firestoreの該当スカウトデータの子コレクション「events」を取得
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getDocs(collection(db, "scouts", uid, "events")).then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setEvents(data);
    });
  }, [uid]);

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="text-center">その他のイベント</h4>
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
                    person &&
                    person.history &&
                    !person.history[e].exp &&
                    "disabled"
                  }`}
                  onClick={() => {
                    setTab(e);
                  }}
                  disabled={person && person.history && !person.history[e].exp}
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
                person.history[tab] &&
                person.history[tab].events.map((e, index) => {
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
                              [tab]: {
                                ...person.history[tab],
                                events: person.history[tab].events.map(
                                  (f, ind) => {
                                    return ind === index
                                      ? {
                                          ...f,
                                          finished:
                                            new Date(e.target.value).getTime() /
                                            1000,
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
  );
};

export default Events;
