import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuthContext } from "../../firebase/authContext";
import { useEffect, useState } from "react";
import New from "./new";
import Editor from "./editor";
import { Navigate } from "react-router-dom";

const Group = () => {
  const { orgid, role } = useAuthContext();
  const [members, setMembers] = useState([]);
  const [showEditor, setShowEditer] = useState(false);

  const getUsers = () => {
    let a = [];
    let b = [];

    //userから所属者を表示
    getDocs(
      query(collection(db, "users"), where("group.orgid", "==", orgid))
    ).then((d) => {
      d.forEach((doc) => {
        a.push({ ...doc.data(), uid: doc.id });
      });
      getDocs(collection(db, "groups", orgid, "members")).then((d) => {
        d.forEach((doc) => {
          b.push({ ...doc.data(), id: doc.id });
        });
        let list = [];
        b.forEach((e) => {
          const users = a.find((x) => x.uid === e.uid);
          if (users) {
            list.push({
              ...users,
              ...e,
              state: "FOUND",
            });
          } else {
            if (e.registerd) {
              list.push({
                ...e,
                state: "NOTFOUND",
              });
            } else {
              list.push({
                ...e,
                state: "NOTCREATED",
              });
            }
          }
        });
        setMembers(list);
      });
    });
  };

  const reload = () => {
    setShowEditer(null);
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (role == "ADMIN") {
    return (
      <>
        <div className="card mb-3">
          <div className="card-body d-flex flex-row">
            <div>
              <h3 className="card-title">団体のメンバー</h3>
              団体ID:{orgid}
            </div>
            <div className="d-grid align-content-center ms-auto">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowEditer(1);
                }}
              >
                新規ユーザーの招待
              </button>
            </div>
          </div>
        </div>

        {showEditor && (
          <div className="card mb-3">
            <div className="card-body">
              {showEditor == 1 ? (
                <New reload={reload} />
              ) : (
                <Editor content={showEditor} reload={reload} />
              )}
            </div>
            <div className="card-footer d-flex">
              <button
                className="ms-auto btn btn-primary"
                onClick={() => {
                  setShowEditer(null);
                }}
              >
                終了する
              </button>
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-body">
            <h3 className="text-center">メンバーの一覧</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>表示名</th>
                  <th>状態</th>
                  <th>メールアドレス</th>
                  <th>役割</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr
                    key={member.id}
                    onClick={() => {
                      setShowEditer(member);
                    }}
                  >
                    <td>{member.name}</td>
                    <td>
                      {member.state == "FOUND"
                        ? "登録済"
                        : member.state == "NOTFOUND"
                        ? "参照不可"
                        : "未登録"}
                    </td>
                    <td>{member.email}</td>
                    <td>
                      {member.role == "VIEW"
                        ? "閲覧者"
                        : member.role == "EDIT"
                        ? "編集者"
                        : "管理者"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/admin" />;
  }
};

export default Group;
