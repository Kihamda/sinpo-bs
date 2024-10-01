import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-100 row">
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card">
          <div className="card-header">新規作成</div>
          <div className="card-body d-flex flex-flow text-center">
            <Link
              to="/admin/detail/new"
              className="btn btn-primary flex-grow-1"
            >
              スカウトの新規作成
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
