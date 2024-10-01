import { useEffect, useRef, useState } from "react";
import troop from "../firebase/template/troops.json";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const Detail = () => {
  const [person, setPerson] = useState();
  const locate = useLocation();
  const nav = useNavigate();
  const path = locate.pathname;

  useEffect(() => {
    console.log(locate.pathname.slice(14));

    getDoc(doc(db, "scouts", locate.pathname.slice(14))).then((e) => {
      console.log(e.data());

      setPerson(e.data());
    });
  }, [path]);

  const handleSave = (e) => {
    e.preventDefault();
    if (e) alert("結果を受け取りました");
    const formData = new FormData(e.target);
    console.log(formData.get("firstname"));
    nav("/admin/scouts");
  };

  return (
    <form onSubmit={handleSave} className="pb-2 justify-content-center">
      <div className="card mb-3">
        <div className="card-body d-flex justify-content-between">
          <h3>
            {person
              ? person.firstname + " " + person.lastname + "さんの情報"
              : "新規スカウト"}
          </h3>
          <div className="d-flex">
            <button type="submit" className="btn btn-primary">
              保存
            </button>

            <button
              className="btn btn-outline-secondary ms-2"
              type="button"
              onClick={() => {
                confirm("行った変更は保存されません") && nav("/admin/scouts/");
              }}
            >
              保存せず戻る
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body text-center">
          <h3 className="card-title">基本情報</h3>
          <form className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <label htmlFor="name">名前</label>
              <div className="form-group mb-1" id="name">
                <div className="input-group flex-nowrap">
                  <label className="input-group-text" htmlFor="firstname">
                    名字
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    defaultValue={person && person.firstname}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group flex-nowrap">
                  <label className="input-group-text" htmlFor="lastname">
                    名前
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    defaultValue={person && person.lastname}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-8 col-lg-6">
              <div className="form-group mb-1">
                <label htmlFor="belong">現在所属隊</label>
                <select className="form-select" id="belong" name="belong">
                  {troop.map((troop) => (
                    <option key={troop.short}>{troop.name}</option>
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
                          value={i.short}
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
                required
                name="comment"
                className="form-control"
                id="comment"
                type="text"
                defaultValue={person && person.comment}
                placeholder="ここに内容を入力・・・"
                rows={3}
              />
            </div>
          </form>
        </div>
      </div>
    </form>
  );
};

export default Detail;
