import { useContext } from "react";
import { PersonContext } from "./personContext";
import troop from "../../firebase/template/troops.json";

// 説明：詳細画面の基本情報(personに入っている)状態をもらって描画
const BasicInfo = () => {
  //データを保存する
  const context = useContext(PersonContext);
  const { person, disableEdit, setPerson } = context;

  return (
    <div className="card mb-3">
      <div className="card-body text-center">
        <h3 className="card-title">基本情報</h3>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
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
          <div className="col-12 col-md-8 col-lg-6">
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
                    <div className="form-check form-check-inline" key={i.short}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        name={`last${i.short}`}
                        id={`inlineCheckbox${i.short}`}
                        disabled={disableEdit}
                        value={i.short}
                        checked={
                          person &&
                          person.history &&
                          person.history[i.short] &&
                          person.history[i.short].exp
                        }
                        onChange={(e) => {
                          setPerson({
                            ...person,
                            history: {
                              ...person.history,
                              [i.short]: {
                                ...person.history[i.short],
                                exp: e.target.checked,
                              },
                            },
                          });
                          if (i.short == tabNum && !e.target.checked) {
                            setTabnum("GEN");
                          }
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
          <div className="col-12">
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
    </div>
  );
};

export default BasicInfo;
