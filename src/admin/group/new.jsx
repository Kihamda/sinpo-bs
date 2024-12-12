import { useState } from "react";
import { useAuthContext } from "../../firebase/authContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const New = ({ reload }) => {
  const { orgid } = useAuthContext();
  const [roles, setRoles] = useState("VIEW");
  const [email, setEmail] = useState("");
  const [showAfter, setShowAfter] = useState(false);
  const [relid, setRelid] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    //新規ユーザーの作成
    addDoc(collection(db, "groups", orgid, "members"), {
      role: roles,
      email: email,
      registerd: false,
    }).then((dt) => {
      setRelid(dt.id);
      setShowAfter(true);
      window.alert("新規ユーザーを作成しました");
      reload();
    });
  };

  return (
    <>
      {showAfter ? (
        <div>
          <h3>招待を作成しました</h3>
          <p>
            招待コードを受け取ったひとに新規登録をするように伝えてください。
          </p>
          <div className="d-flex justify-content-around">
            <div>
              <span>招待コード</span>
              <h3 className="text-center">{relid}</h3>
            </div>

            <div>
              <span>団体ID</span>
              <h3 className="text-center">{orgid}</h3>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h3>新規招待の作成</h3>
          <p>
            招待したい人のメールアドレスを、「招待を作成する」ボタンを押した時に作成される団体IDと連携させ、新規ユーザーを作成します。
            <br />
            招待コードを受け取ったひとに新規登録をするように伝えてください。
          </p>
          <p>一度決定してからも役割は変更できます。</p>
          <p>
            {roles == "VIEW"
              ? "閲覧者はデータの閲覧のみが可能です。編集やグループのユーザーの設定などを行うことはできません"
              : roles == "EDIT"
              ? "編集者はデータの閲覧に加え、編集が可能になります。グループの設定を行うことはできません"
              : "管理者はグループに属するすべてのユーザーとデータに対しすべての権利を有します。意図しない人に与えないように気をつけてください。"}
          </p>
          <form className="row" onSubmit={handleSave}>
            <div className="col-4 col-lg-2 mb-3">
              <label htmlFor="roles">役割</label>
              <select
                className="form-select"
                id="roles"
                onChange={(e) => setRoles(e.target.selectedOptions[0].value)}
                value={roles}
              >
                <option value="VIEW">閲覧者</option>
                <option value="EDIT">編集者</option>
                <option value="ADMIN">管理者</option>
              </select>
            </div>
            <div className="col-8 col-lg-10 mb-3">
              <label htmlFor="email">対象メールアドレス</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="abc@example.com"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-12 d-flex mb-3 justify-content-center">
              <button className="btn btn-primary w-100">招待を作成する</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default New;
