import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
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
      <h1>ログイン</h1>
      <p className="text-center">このフォームは管理者用です</p>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            メールアドレス
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
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
          <Link to="/auth/signup">管理者：新規登録</Link>
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

export default Login;
