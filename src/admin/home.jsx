import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col-12 pt-5 pb-5 mb-5 mt-5">
          <h1 className="text-center pt-5 mt-5">Hello.</h1>
          <p className="text-center pb-5 mb-5">編集を開始してください</p>
        </div>
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card">
            <div className="card-header">新規作成</div>
            <div className="card-body d-flex flex-flow text-center">
              <Link
                to="/admin/scouts/new"
                className="btn btn-primary flex-grow-1"
              >
                スカウトの新規作成
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
