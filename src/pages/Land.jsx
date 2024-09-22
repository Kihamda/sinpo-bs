import { Link } from "react-router-dom";

const Land = () => {
  return (
    <div className="d-grid vh-100 justify-content-center align-content-center">
      <div className="justify-content-center d-flex flex-column text-center">
        <h1>電子式進歩記録帳</h1>
        <p>ボーイスカウト吹田9団専用システム</p>
        <p>
          連絡はこちらまで:
          <a href="mailto:work@kihamda.net">work@kihamda.net</a>
        </p>
        <div className="d-flex justify-content-center">
          <Link to={"/auth/login"} className="btn btn-primary">
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Land;
