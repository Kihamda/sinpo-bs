import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { useAuthContext } from "../../firebase/authContext";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";

const MyInfo = () => {
  const [myinf, setMyInf] = useState({
    name: "",
    email: "",
  });
  const { user, setReloadHook } = useAuthContext();
  const [isEdit, setIsEdit] = useState(false);
  const [emailEdited, setEmailEdited] = useState(false);
  const [pw, setPw] = useState("");

  const handleInputChange = () => {
    setDoc(doc(db, "users", user.uid), myinf).then(() => {
      if (myinf.email !== user.email) {
        reauthenticateWithCredential(
          auth.currentUser,
          EmailAuthProvider.credential(user.email, pw)
        ).then(() => {
          verifyBeforeUpdateEmail(auth.currentUser, myinf.email).then(() => {
            alert(
              "更新しました。新しいメールアドレスに認証メールを送ったので認証をしてください。"
            );
            setIsEdit(false);
            setReloadHook("");
          });
        });
      } else {
        alert("更新しました");
        setIsEdit(false);
        setReloadHook("");
      }
    });
  };
  const loadDB = () => {
    getDoc(doc(db, "users", user.uid)).then((d) => {
      if (d.data()) {
        const data = d.data();
        setMyInf({ ...data });
      }
    });
  };

  useEffect(() => {
    loadDB();
  }, []);

  return (
    <>
      <h3>自分の登録情報</h3>
      <div className="row">
        <div className="col-md-6">
          <label>登録名</label>
          <input
            type="text"
            className="form-control"
            value={myinf.name}
            disabled={!isEdit}
            onChange={(e) => setMyInf({ ...myinf, name: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label>メールアドレス</label>
          <input
            type="email"
            className="form-control"
            value={myinf.email}
            disabled={!isEdit}
            onChange={(e) => {
              setMyInf({ ...myinf, email: e.target.value });
              setEmailEdited(true);
            }}
          />
        </div>
        {user.email !== myinf.email &&
          (emailEdited ? (
            <div className="col-12">
              <label>メールアドレスの変更にはパスワードが必要です</label>
              <input
                type="password"
                className="form-control"
                value={pw}
                disabled={!isEdit}
                onChange={(e) => setPw(e.target.value)}
              />
            </div>
          ) : (
            <div className="col-12 text-end">
              メールアドレス変更のメールを確認してください
            </div>
          ))}
        <div className="w-100 d-flex justify-content-end mt-3">
          {isEdit ? (
            <>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleInputChange();
                }}
              >
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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsEdit(true);
              }}
            >
              編集開始
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default MyInfo;
