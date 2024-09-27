import { memo, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const ScoutsList = memo(({ filter }) => {
  const [scouts, setScouts] = useState(undefined);
  const [list, setList] = useState(undefined);

  // Fetch scouts based on filter (optional)
  useEffect(() => {
    getDocs(collection(db, "scouts")).then((snapshot) => {
      let tmp = [];
      for (let index = 0; index < 100; index++) {
        snapshot.forEach((doc) => {
          tmp.push({ ...doc.data(), id: doc.id });
        });
      }

      setScouts(tmp);
    });
  }, []);

  useEffect(() => {
    if (scouts) {
      let filteredScouts = scouts;

      setList(
        filteredScouts.map((scout) => (
          <tr key={scout.id}>
            <td>{scout.firstname + " " + scout.lastname}</td>
            <td>{scout.belong}</td>
            <td>{scout.comment}</td>
            <td>
              <button
                className="btn btn-primary"
                onClick={() => handleScout(scout.id)}
              >
                詳細
              </button>
            </td>
          </tr>
        ))
      );
    }
  }, [filter, scouts]);

  return (
    <table className="table table-striped text-center text-nowrap">
      <thead>
        <tr>
          <th style={{ width: "30%" }}>Name</th>
          <th style={{ width: "10%" }}>Belong</th>
          <th style={{ width: "40%" }}>Comment</th>
          <th style={{ width: "20%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>{list ? list : "loading"}</tbody>
    </table>
  );
});

export default ScoutsList;
