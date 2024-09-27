import { useState } from "react";
import ScoutsList from "./scoutlist";

const Scouts = () => {
  const [filter, setFilter] = useState();
  return (
    <div className="row justify-content-center h-100">
      <div className="col-12 col-lg-10 mb-3">
        <div className="card h-100">
          <div className="card-body">
            <h3 className="card-title text-center">検索フォーム</h3>
            <div className="row">
              <div className="col-sm-6 col-md-4 col-lg-3">
                <label htmlFor="name" className="form-label">
                  名前
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="氏名で検索"
                  onChange={(e) => setFilter({ name: e.target.value })}
                />
              </div>
              <div className="col-sm-6 col-md-4 col-lg-3">
                <label htmlFor="grade" className="form-label">
                  学年
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="grade"
                  placeholder="学年で検索"
                  onChange={(e) =>
                    setFilter({ grade: parseInt(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-10 mb-3">
        <div className="card h-100">
          <div className="card-body">
            <h3 className="card-title text-center">検索結果</h3>
            <div className="flex-grow-1" style={{ overflowY: "auto" }}>
              <ScoutsList filter={filter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scouts;
