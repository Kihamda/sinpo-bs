import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Viewer = () => {
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
      <h1>データ共有</h1>
      <form className="mb-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            共有ID
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="xxxxxxxxxxxxxxxxxxxxxxxx"
            name="email"
            required
          />
        </div>
        <div className="d-grid align-content-center justify-content-center">
          <button type="submit" className="btn btn-primary">
            閲覧
          </button>
        </div>
      </form>
      <div className="text-center">
        <p>
          <Link to="/auth/login">管理者：ログイン</Link>
        </p>
        <p>
          <Link to="/auth/signup">管理者：新規登録</Link>
        </p>
        <p>
          <Link to="/auth/reset">管理者：パスワードリセット</Link>
        </p>
      </div>
    </>
  );
};

export default Viewer;
