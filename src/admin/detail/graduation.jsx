//詳細画面での進級過程表示

import { useState } from "react";
import { getTroopsListShorted } from "../../firebase/template/setting";
import { getFormattedDate } from "../../firebase/tools";

const Graduation = () => {
  //タブ管理用
  const [tab, setTab] = useState("GEN");

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
                person.history[tab].graduation.map((e, index) => {
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
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            history: {
                              ...person.history,
                              [tab]: {
                                ...person.history[tab],
                                graduation: person.history[tab].graduation.map(
                                  (f, ind) => {
                                    return ind === index
                                      ? {
                                          ...f,
                                          finished: new Date(
                                            e.target.value
                                          ).getTime(),
                                        }
                                      : f;
                                  }
                                ),
                              },
                            },
                          });
                          person.history[tab].graduation[index].finished =
                            new Date(e.target.value);
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

export default Graduation;
