import { createContext, useState } from "react";

// フォームデータのコンテキスト
export const FormContext = createContext({});

//FormContextのプロバイダ
//操作可否・新規データかの情報を保持
export const FormProvider = ({ children, uid }) => {
  //フラグ系
  const [disableEdit, setDisableEdit] = useState(true); //操作不能フラグ
  const [noExit, setNoExit] = useState(false); //退出不可フラグ
  const [isNew, setIsNew] = useState(true); //新規データフラグ

  const [userName, setUserName] = useState(""); //ユーザー名表示

  // Context用
  const value = {
    disableEdit,
    setDisableEdit,
    isNew,
    setIsNew,
    userName,
    setUserName,
    noExit,
    setNoExit,
    uid,
  };
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
