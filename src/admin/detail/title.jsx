//詳細画面のタイトルバー

import { useContext } from "react";
import { PersonContext } from "./personContext";
import { useNavigate } from "react-router-dom";

const Title = () => {
  //いろいろはいったcontextの取得
  const con = useContext(PersonContext);
  const { person, isNew, disableEdit, setDisableEdit, deleteData } = con;

  //navigation実装（いつもの
  const nav = useNavigate();

  return (
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
  );
};

export default Title;
