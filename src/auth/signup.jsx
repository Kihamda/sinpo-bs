import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const Signup = () => {
  const nav = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        nav("/admin/");
      })
      .catch(() => {
        alert("メールアドレスかパスワードが間違っています");
      });
  };

  return (
    <>
      <h1>新規登録</h1>
      <p className="text-center">
        このフォームは管理者用です
        <br />
        ここで登録の後、他の管理者の承諾を得てから本登録されます
      </p>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            表示名
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="佐藤花子"
            name="name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="usermail" className="form-label">
            メールアドレス
          </label>
          <input
            type="email"
            className="form-control"
            id="usermail"
            placeholder="xxx@example.com"
            name="email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            パスワード
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="*******d"
            name="password"
            required
          />
        </div>
        <div className="d-grid align-content-center justify-content-center">
          <button type="submit" className="btn btn-primary">
            ログイン
          </button>
        </div>
      </form>
      <div className="text-center">
        <p>
          <Link to="/auth/login">管理者：ログイン</Link>
        </p>
        <p>
          <Link to="/auth/reset">管理者：パスワードリセット</Link>
        </p>
        <p>
          <Link to="/auth/viewer">「データ共有」をされた方はこちら</Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
