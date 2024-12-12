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
      <h1>リセット</h1>
      <form className="mb-5 mt-3" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            メールアドレス
          </label>
          <input
            type="email"
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
          <Link to="/auth/login">ログイン</Link>
        </p>
        <p>
          <Link to="/auth/signup">新規登録</Link>
        </p>
      </div>
    </>
  );
};

export default Reset;
