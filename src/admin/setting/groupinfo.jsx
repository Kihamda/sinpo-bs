import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuthContext } from "../../firebase/authContext";
import { auth, db } from "../../firebase/firebase";
import { useState } from "react";

const GroupInfo = () => {
  const { relid, orgid, userName, user } = useAuthContext();
  const [isEdit, setIsEdit] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { relidinp, orgidinp } = e.target.elements;
    getDoc(doc(db, "groups", orgidinp.value, "members", relidinp.value))
      .then((d) => {
        if (d.data().email == auth.currentUser.email && d.data().registerd) {
          setDoc(doc(db, "users", user.uid), {
            name: userName,
            email: auth.currentUser.email,
            group: {
              relid: relidinp.value,
              orgid: orgidinp.value,
            },
          }).then(() => {
            alert("正常に変更しました");
            setIsEdit(false);
          });
        } else {
          alert("不正なデータです");
        }
      })
      .catch(() => alert("不正なデータです"));
  };
  return (
    <>
      <h3>グループの情報</h3>
      <form className="row" onSubmit={handleInputChange}>
        <div className="col-md-6">
          <label>招待ID</label>
          <input
            type="text"
            className="form-control"
            defaultValue={relid}
            disabled={!isEdit}
            autoComplete="off"
            name="relidinp"
          />
        </div>
        <div className="col-md-6">
          <label>団体ID</label>
          <input
            type="text"
            className="form-control"
            defaultValue={orgid}
            autoComplete="off"
            disabled={!isEdit}
            name="orgidinp"
          />
        </div>
        <div className="w-100 d-flex justify-content-end mt-3">
          {isEdit ? (
            <>
              <button type="submit" className="btn btn-primary">
                更新
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-1"
                onClick={() => setIsEdit(false)}
              >
                戻る
              </button>
            </>
          ) : (
            <a
              className="btn btn-secondary"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              編集開始
            </a>
          )}
        </div>
      </form>
    </>
  );
};

export default GroupInfo;
