import { createContext, useState, useEffect } from "react";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { getDefaultScoutDataForm } from "../../firebase/template/setting";

// ユーザーデータのコンテキスト
export const PersonContext = createContext({});

//PersonContextのプロバイダ
//この中にデータ取得・保存・削除・更新の処理をいれる
export const PersonProvider = ({ children, uid }) => {
  //フラグ系
  const [disableEdit, setDisableEdit] = useState(true); //操作不能フラグ
  const [isNew, setIsNew] = useState(true); //新規データフラグ

  //データ系
  const [person, setPerson] = useState({}); //基本情報系置き場
  const [events, setPath] = useState([]); //イベント一覧
  const [graduation, setGraduation] = useState([]);

  //読み込み時に実行
  useEffect(() => {
    if (uid == "new") {
      //新規作成ならデフォルトで編集できるようにする
      const defaultForm = getDefaultScoutDataForm();
      setPerson(defaultForm);
      setDisableEdit(false);
    } else {
      //既存データを表示する
      getDoc(doc(db, "scouts", uid)).then((e) => {
        console.log(e.data());
        if (e.data()) {
          setPerson(e.data());
          setIsNew(false);
        } else {
          //見つからなかったら一覧に流す
          alert("データが見つかりませんでした");
          nav("/admin/scouts");
        }
      });
    }
  }, [uid]);

  //保存処理
  const handleSave = (e) => {
    e.preventDefault();
    if (!disableEdit) {
      if (uid == "new") {
        setDoc(doc(collection(db, "scouts")), person).then(() => {
          alert("保存しました");
          nav("/admin/scouts");
        });
      } else {
        setDoc(doc(db, "scouts", uid), person).then(() => {
          alert("保存しました");
          setDisableEdit(true);
        });
      }
    }
  };

  // 削除処理
  const deleteData = () => {
    if (window.confirm("本当に削除しますか？")) {
      if (
        window.confirm(
          "削除したデータは永久に復元できません。この操作に伴うデータの欠損について、制作者は責任を負いかねます。"
        )
      ) {
        deleteDoc(doc(db, "scouts", uid)).then(() => {
          alert("削除しました");
          nav("/admin/scouts");
        });
      }
    }
  };
  // Context用
  const value = {
    person,
    setPerson,
    disableEdit,
    setDisableEdit,
    isNew,
    setIsNew,
    handleSave,
    deleteData,
    uid,
  };
  return (
    <PersonContext.Provider value={value}>{children}</PersonContext.Provider>
  );
};

// ユーザーデータのコンテキスト
export const FormContext = createContext({});

//FormContextのプロバイダ
//操作可否・新規データかの情報を保持
export const FormProvider = ({ children, uid }) => {
  //フラグ系
  const [disableEdit, setDisableEdit] = useState(true); //操作不能フラグ
  const [isNew, setIsNew] = useState(true); //新規データフラグ

  //読み込み時に実行
  useEffect(() => {
    if (uid == "new") {
      //新規作成ならデフォルトで編集できるようにする
      const defaultForm = getDefaultScoutDataForm();
      setPerson(defaultForm);
      setDisableEdit(false);
    } else {
      //既存データを表示する
      getDoc(doc(db, "scouts", uid)).then((e) => {
        console.log(e.data());
        if (e.data()) {
          setPerson(e.data());
          setIsNew(false);
        } else {
          //見つからなかったら一覧に流す
          alert("データが見つかりませんでした");
          nav("/admin/scouts");
        }
      });
    }
  }, [uid]);

  // Context用
  const value = {
    disableEdit,
    setDisableEdit,
    isNew,
    setIsNew,
    handleSave,
    deleteData,
    uid,
  };
  return (
    <PersonContext.Provider value={value}>{children}</PersonContext.Provider>
  );
};
