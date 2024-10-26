//詳細画面のタイトルバー

import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "./formContext";

const Title = () => {
  //いろいろはいったcontextの取得
  const { setDisableEdit, disableEdit, isNew, userName } =
    useContext(FormContext);

  //navigation実装（いつもの
  const nav = useNavigate();

  return (
    <div className="card">
      <div className="card-body d-flex justify-content-between align-content-center flex-wrap">
        <div>
          <h3>{!isNew ? userName + "さんの情報" : "新規スカウト"}</h3>
          <span>変更は各保存ボタンを押した際に保存されます</span>
        </div>
        <div className="align-content-center">
          {disableEdit ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  nav("/admin/scouts/");
                }}
                className="btn btn-outline-secondary me-2"
              >
                一覧に戻る
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setDisableEdit(false);
                }}
                className="btn btn-primary"
              >
                編集を開始
              </button>
            </>
          ) : (
            <>
              {!isNew && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteData();
                  }}
                  className="btn btn-danger ms-2"
                >
                  記録を削除
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
                編集を終了
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Title;
