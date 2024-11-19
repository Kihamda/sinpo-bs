import { getDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase/firebase";
import { useAuthContext } from "../../firebase/authContext";

const MyInfo = () => {
  const [myinf, setMyInf] = useState({
    name: "",
    email: "",
  });
  const { uid } = useAuthContext();

  const handleInputChange = (e) => {
    e.preventDefault();
    setMyInf({ ...myinf, [e.target.name]: e.target.value });
  };
  const loadDB = () => {
    // fetch API to load data from DB
    // setMyInf with loaded data
    getDoc(doc(db, "users", uid)).then((d) => {
      setMyInf({ name: d.data().name, email: d.data().email });
    });
  };

  return (
    <>
      <h3>自分の登録情報</h3>
      <form className="row" onSubmit={handleInputChange}>
        <div className="col-md-6">
          <label>登録名</label>
          <input type="text" className="form-control" disabled />
        </div>
        <div className="col-md-6">
          <label>メールアドレス</label>
          <input
            type="email"
            className="form-control"
            disabled
            value="yamada@example.com"
          />
        </div>
      </form>
    </>
  );
};

export default MyInfo;
