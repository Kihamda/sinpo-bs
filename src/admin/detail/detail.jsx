import { useLocation } from "react-router-dom";

import BasicInfo from "./basicInfo";
import Graduation from "./graduation";
import Events from "./events";
import Title from "./title";
import { FormProvider } from "./formContext";
import Ginosho from "./ginosho";

const Detail = () => {
  const locate = useLocation();
  const path = locate.pathname.slice(14);

  return (
    <FormProvider uid={path}>
      <div className="pb-2 justify-content-center">
        <div className="row">
          <div className="col-12 mb-3">
            <Title />
          </div>
          <div className="col-12 mb-3">
            <BasicInfo />
          </div>
          {!(path === "new") ? (
            <>
              <div className="col-12 col-lg-6 mb-3">
                <Graduation />
              </div>
              <div className="col-12 col-lg-6 mb-3">
                <Events />
              </div>
              <div className="col-12 mb-3">
                <Ginosho />
              </div>
            </>
          ) : (
            <div className="col-12 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="row justify-content-center">
                    <h3 className="text-center col-12 text-center">
                      新規登録時の注意点
                    </h3>
                    <p className="col-12 col-lg-10">
                      新規に作成されたデータは、「基本情報」欄にある「新規作成」ボタンを押したときにデータベース上に作成されます。それまで、基本情報以外のデータは編集できません。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default Detail;
