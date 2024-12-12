import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Signup = () => {
  const nav = useNavigate();

  const [page, setPage] = useState(0); //画面遷移状態 0,その次
  const [formdata, setFormdata] = useState();
  const [showpw, setShowpw] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const handleFirst = (e) => {
    e.preventDefault();
    const { orgid, relid, email } = e.target.elements;
    getDoc(doc(db, "groups", orgid.value, "members", relid.value)).then((d) => {
      if (d.data().email == email.value && d.data().registerd == false) {
        alert("団体認証が完了しました");
        setFormdata({
          ...formdata,
          relid: relid.value,
          orgid: orgid.value,
        });
        setPage(1);
        setEmail(d.data().email);
        setRole(d.data().role);
      } else {
        alert(
          "不正なデータが登録されています。所属団の担当者にご連絡ください。"
        );
      }
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, name } = e.target.elements;

    createUserWithEmailAndPassword(auth, email, password.value).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
        //...
        setDoc(doc(db, "users", user.uid), {
          email: email,
          name: name.value,
          group: {
            relid: formdata.relid,
            orgid: formdata.orgid,
          },
        }).then(() => {
          setDoc(doc(db, "groups", formdata.orgid, "members", formdata.relid), {
            uid: user.uid,
            registerd: true,
            role: role,
          }).then(() => {
            alert("登録が完了しました");
            nav("/admin");
          });
        });
      }
    );
  };

  return (
    <>
      <h1>新規登録</h1>
      {page == 0 ? (
        <form className="mb-5 mt-3" onSubmit={handleFirst}>
          <div className="mb-3">
            <label htmlFor="usermail" className="form-label">
              招待ID
            </label>
            <input
              type="text"
              className="form-control"
              id="usermail"
              placeholder="xxxxxxxxxxxxxxxxxxxx"
              name="relid"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="orgid" className="form-label">
              団体ID
            </label>
            <input
              type="text"
              className="form-control"
              id="orgid"
              placeholder="xxxxxxxxxxxxxxxxxxxx"
              name="orgid"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              メールアドレス
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="abc@example.com"
              name="email"
              required
            />
          </div>
          <div className="d-grid align-content-center justify-content-center">
            <button type="submit" className="btn btn-primary">
              次へ
            </button>
          </div>
        </form>
      ) : (
        <form className="mb-5 mt-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="userpw" className="form-label">
              パスワード
            </label>
            <input
              type={showpw ? "text" : "password"}
              className="form-control"
              id="userpw"
              placeholder="パスワードを設定してください"
              name="password"
              required
            />
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                style={{ width: "1em" }}
                id="showpw"
                onChange={(e) => {
                  setShowpw(e.target.checked);
                }}
              />
              <label htmlFor="showpw" className="form-check-label w-auto">
                パスワードを表示する
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                表示名
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="山田 太郎"
                name="name"
                required
              />
            </div>
          </div>

          <div className="d-grid align-content-center justify-content-center">
            <button type="submit" className="btn btn-primary">
              登録する
            </button>
          </div>
        </form>
      )}

      <div className="text-center">
        <p>
          <Link to="/auth/login">ログイン</Link>
        </p>
        <p>
          <Link to="/auth/reset">パスワードリセット</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
