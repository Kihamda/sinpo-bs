import { sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuthContext } from "../firebase/authContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Verify = () => {
  const { verified } = useAuthContext();
  const [page, setPage] = useState(false);

  const sendMail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("メールを送信しました。メールを確認してください。");
      setPage(true);
    });
  };
  if (verified) {
    return <Navigate to={"/admin/"} />;
  } else {
    return (
      <>
        <div className="card mb-3">
          <div className="card-body">
            <h3>メールアドレスを確認してください</h3>
          </div>
        </div>
        {page ? (
          <div className="card">
            <div className="card-body">
              <p className="text-center">メールを送信しました。</p>
              <a href="/admin" className="btn btn-primary">
                認証状態を確認
              </a>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body">
              <p className="text-center">送信先メールアドレス</p>
              <h3 className="text-center">{auth.currentUser.email}</h3>
              <p className="text-center">
                サービスの利用開始にはメールアドレスの認証が必要です。
              </p>
              <div className="d-grid justify-content-center align-content-center w-100">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    sendMail();
                  }}
                >
                  メールを送信する
                </button>
              </div>

              <div className="d-grid justify-content-center align-content-center w-100 mt-3">
                <a href="/admin" className="btn btn-primary">
                  認証状態を確認
                </a>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};

export default Verify;
