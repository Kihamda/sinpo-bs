import { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  getDocs,
  collection,
  getDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuthContext } from "../firebase/authContext";

const Share = () => {
  return (
    <Routes>
      <Route path="/" element={<ShareHome />} />
      <Route path="/new" element={<SharePopup dataid="new" />} />
      <Route
        path="/:id"
        element={<SharePopup dataid={`${useLocation().pathname.slice(13)}`} />}
      />
    </Routes>
  );
};

const ShareHome = () => {
  const [shares, setShares] = useState();
  const nav = useNavigate();

  useEffect(() => {
    getDocs(collection(db, "shares")).then((snapshot) => {
      let tmp = [];
      snapshot.forEach((doc) => {
        tmp.push({ ...doc.data(), id: doc.id });
      });

      setShares(tmp);
    });
  }, []);
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex">
            <h3 className="card-title me-auto">共有セッション</h3>
            <Link to="/admin/share/new" className="btn btn-primary">
              新規共有セッション
            </Link>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body d-flex flex-column">
          <h3 className="card-title text-center">
            現在アクティブなセッション一覧
          </h3>
          <table className="table">
            <thead>
              <tr>
                <th>セッション名</th>
                <th>作成者</th>
                <th>終了日時</th>
              </tr>
            </thead>
            <tbody>
              {shares &&
                shares.map((e) => {
                  return (
                    <tr
                      key={e.id}
                      onClick={() => {
                        nav(`/admin/share/${e.id}`);
                      }}
                    >
                      <td>{e.name}</td>
                      <td>{e.madeby}</td>
                      <td>
                        {new Date(e.expire * 1000)
                          .toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replaceAll("-", "/")}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const SharePopup = ({ dataid }) => {
  const [session, setSession] = useState({
    name: "",
    expire: null,
    scouts: [],
  });
  const [scouts, setScouts] = useState([]);
  const [isNew, setIsNew] = useState(true);
  const { user, userName } = useAuthContext();

  const nav = useNavigate();
  useEffect(() => {
    dataid === "new"
      ? getDocs(collection(db, "scouts")).then((snapshot) => {
          let tmp = [];
          snapshot.forEach((doc) => {
            tmp.push({ ...doc.data(), id: doc.id });
          });

          setScouts(tmp);
        })
      : getDoc(doc(db, "shares", dataid)).then((snapshot) => {
          const data = snapshot.data();
          setSession({
            ...data,
            expire: new Date(data.expire * 1000),
            id: snapshot.id,
          });
          let scouts = [];
          Object.keys(data.shares).forEach((key) => {
            scouts.push({
              id: key,
              firstname: data.shares[key].firstname,
              lastname: data.shares[key].lastname,
              belong: data.shares[key].belong,
              comment: data.shares[key].comment,
            });
          });
          setScouts(scouts);
        });

    dataid !== "new" && setIsNew(dataid === "new");
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNew) {
      const formData = e.target.getElementsByClassName("select-new-scouts");
      let selectedScouts = [];
      for (let i = 0; i < formData.length; i++) {
        if (formData[i].checked) {
          selectedScouts = [...selectedScouts, formData[i].value];
        }
      }
      let selected = {};
      for (let i = 0; i < selectedScouts.length; i++) {
        getDoc(doc(db, "scouts", selectedScouts[i])).then((person) => {
          getDocs(collection(db, "scouts", selectedScouts[i], "tooks")).then(
            (personTook) => {
              let personTookData = [];
              personTook.forEach((e) =>
                personTookData.push({ ...e.data(), id: e.id })
              );
              console.log(personTookData);

              selected[selectedScouts[i]] = {
                ...person.data(),
                tooks: personTookData,
              };

              if (i === selectedScouts.length - 1) {
                const sendData = {
                  name: session.name,
                  expire: new Date(session.expire).getTime() / 1000,
                  comment: session.comment ? session.comment : "",
                  madeby: userName,
                  shares: selected,
                };
                console.log(sendData);

                setDoc(doc(collection(db, "shares")), sendData);

                alert("作成が成功しました");
                nav(`/admin/share/`);
              }
            }
          );
        });
      }
    } else {
      console.log(session);
      if (
        confirm("この共有セッションは永久に削除されます\n本当に続行しますか？")
      ) {
        deleteDoc(doc(db, "shares", session.id));
        nav("/admin/share");
      }
    }
  };
  return (
    <div className="row">
      <form onSubmit={handleSubmit}>
        <div className="card mb-3">
          <div className="card-body">
            <div className="d-flex">
              <h3 className="card-title text-center mb-0">
                {isNew ? "新規共有セッション" : "共有セッション編集"}
              </h3>
              <div className="ms-auto">
                <button
                  className={`btn btn-${isNew ? "primary" : "danger"}`}
                  type="submit"
                >
                  {isNew ? "作成" : "削除"}
                </button>
                <button
                  className="btn btn-outline-secondary ms-2"
                  onClick={() => {
                    nav("/admin/share");
                  }}
                  type="button"
                >
                  {isNew ? "作成せず終了" : "セッション一覧に戻る"}
                </button>
              </div>
            </div>
            <span>
              {isNew
                ? "保存後は編集できなくなります"
                : "セッション作成後に編集はできません"}
            </span>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-body row">
            <h3 className="card-title text-center col-12">セッションの詳細</h3>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="sessionName">セッション名</label>
              <input
                type="text"
                className="form-control"
                id="sessionName"
                value={session.name}
                required
                disabled={!isNew}
                onChange={(e) => {
                  setSession({ ...session, name: e.target.value });
                }}
              />
            </div>
            <div className="form-group col-12 col-md-6">
              <label htmlFor="endTime">終了日時</label>
              <input
                type="date"
                className="form-control"
                id="endTime"
                value={
                  session.expire
                    ? session.expire
                        .toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replaceAll("/", "-")
                    : ""
                }
                required
                disabled={!isNew}
                onChange={(e) => {
                  setSession({ ...session, expire: new Date(e.target.value) });
                }}
              />
            </div>
            <div className="form-group mt-3 col-12">
              <label htmlFor="comment">コメント</label>
              <textarea
                className="form-control"
                id="comment"
                rows="3"
                value={session.comment}
                disabled={!isNew}
                placeholder="共有時にこの内容がコメントとして表示されます・・・"
                onChange={(e) => {
                  setSession({ ...session, comment: e.target.value });
                }}
              />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body row">
            <h3 className="card-title text-center col-12">
              対象スカウト{isNew ? "の選択" : "一覧"}
            </h3>
            <table className="table table-striped text-center">
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>{isNew && "選択"}</th>
                  <th style={{ width: "30%" }}>名前</th>
                  <th style={{ width: "10%" }}>所属</th>
                  <th style={{ width: "50%" }}>コメント</th>
                </tr>
              </thead>
              <tbody>
                {scouts.map((scout) => {
                  return (
                    <tr
                      key={scout.id}
                      onClick={() => {
                        if (isNew) {
                          const val = document.getElementById(`cb-${scout.id}`);
                          val.checked == true
                            ? (val.checked = false)
                            : (val.checked = true);
                        }
                      }}
                    >
                      <td>
                        {isNew ? (
                          <input
                            type="checkbox"
                            className="form-check-input select-new-scouts"
                            value={`${scout.id}`}
                            id={`cb-${scout.id}`}
                          />
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{scout.firstname + " " + scout.lastname}</td>
                      <td>{scout.belong}</td>
                      <td>{scout.comment}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Share;
