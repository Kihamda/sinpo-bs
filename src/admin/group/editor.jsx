import { useEffect, useState } from "react";
import { useAuthContext } from "../../firebase/authContext";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Editor = ({ content, reload }) => {
  const { orgid } = useAuthContext();
  const [editing, setEditing] = useState(content);

  useEffect(() => {
    setEditing(content);
  }, [content]);

  const deleteRecord = () => {
    if (window.confirm("本当に削除しますか？")) {
      if (
        window.confirm(
          "最後の確認です。\nこの操作は二度と取り消すことができません。この操作における損害について、制作者は一切の責任を負いません。"
        )
      ) {
        deleteDoc(doc(db, "groups", orgid, "members", editing.id)).then(() => {
          alert("削除が完了しました");
          reload();
        });
      }
    }
  };

  const saveRecord = () => {
    const data = {
      role: editing.role,
      registerd: editing.registerd,
      email: editing.email,
    };
    setDoc(doc(db, "groups", orgid, "members", editing.id), data).then(() => {
      alert("変更を保存しました");
      reload();
    });
  };

  return (
    <div>
      <div className="row">
        <div className="col-12 text-center mb-3">
          <h3 className="text-center">
            {editing.name ? editing.name : "未登録のユーザー"} さんの情報
          </h3>
          <p className="text-center w-100">
            メールアドレス
            <br />
            {editing.email}
          </p>
        </div>
        <div className="col-12 col-md-6 d-flex flex-column text-center">
          招待ID<h4>{editing.id}</h4>
        </div>
        <div className="col-12 col-md-6 d-flex flex-column text-center">
          状態
          <h4>
            {editing.state == "FOUND"
              ? "登録済"
              : editing.state == "NOTFOUND"
              ? "参照不可"
              : "未登録"}
          </h4>
          <p>
            {editing.state == "FOUND"
              ? "登録済とは、このユーザーが正常にアプリケーションに登録した状態です。"
              : editing.state == "NOTFOUND"
              ? "参照不可とは、このユーザーがアプリケーションに登録したが、そのユーザーとグループのユーザーデータとの参照が取れない状態です。"
              : "未登録とは、このユーザーがまだアプリケーションに登録していない状態です。"}
          </p>
        </div>
      </div>
      <div className="mt-3 mb-3 row">
        <div className="col-4 col-md-3 flex-column">
          <label htmlFor="role" className="form-label">
            役割
          </label>
          <select
            className="form-select"
            id="role"
            onChange={(e) =>
              setEditing({
                ...editing,
                role: e.target.selectedOptions[0].value,
              })
            }
            value={editing.role}
          >
            <option value="VIEW">閲覧者</option>
            <option value="EDIT">編集者</option>
            <option value="ADMIN">管理者</option>
          </select>
        </div>
        <div className="col-8 col-md-9 d-flex flex-column">
          <label htmlFor="email" className="form-label">
            メールアドレス
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            disabled
            value={editing.email}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary me-1" onClick={saveRecord}>
          編集の保存
        </button>
        <button className="btn btn-danger ms-1" onClick={deleteRecord}>
          記録の削除
        </button>
      </div>
    </div>
  );
};

export default Editor;
