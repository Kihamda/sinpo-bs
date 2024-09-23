import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

// パスワードリセット画面
const Reset = () => {
  const nav = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email } = event.target.elements;
    sendPasswordResetEmail(auth, email.value)
      .then(() => {
        // メール送信成功
        alert("パスワードリセットメールを送信しました");
        nav("/auth/login");
      })
      .catch((error) => {
        // メール送信失敗
        console.log(error);
      });
  };

  return (
    <>
      <h1>パスワードのリセット</h1>
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
        <div className="d-grid align-content-center justify-content-center">
          <button type="submit" className="btn btn-primary">
            リセットする
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
          <Link to="/auth/viewer">「データ共有」をされた方はこちら</Link>
        </p>
      </div>
    </>
  );
};

export default Reset;
