import { useState } from "react";
import ScoutsList from "./scoutlist";

const Scouts = () => {
  const [filter, setFilter] = useState();
  return (
    <div className="row justify-content-between h-100">
      <div className="col-lg-6 col-12 mb-3">
        <div className="card h-100">
          <div className="card-body">
            <h3 className="card-title text-center">検索フォーム</h3>
            <p className="card-text">
              <strong>Top 3 Scouts:</strong>
            </p>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>1st Place:</strong> John Doe
              </li>
              <li className="list-group-item">
                <strong>2nd Place:</strong> Jane Smith
              </li>
              <li className="list-group-item">
                <strong>3rd Place:</strong> Alice Johnson
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-12 mb-3">
        <div className="card h-100">
          <div className="card-body">
            <h3 className="card-title text-center">検索結果</h3>
            <div
              className="mt-auto"
              style={{ overflowY: "auto", height: "70vh" }}
            >
              <ScoutsList filter={filter} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scouts;
