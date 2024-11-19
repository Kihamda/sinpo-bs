import AnchorLink from "react-anchor-link-smooth-scroll";
import MyInfo from "./myinfo";

const Setting = () => {
  return (
    <>
      <div className="card mb-3">
        <div className="card-body">
          <h3>設定</h3>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-12 col-lg-3 mb-3  ">
          <div className="card">
            <div className="card-body">
              <h4>ナビゲーション</h4>
              <ul>
                <li>
                  <AnchorLink href="#myinfo">自分の登録情報</AnchorLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-9">
          <div className="card mb-3">
            <div className="card-body" id="myinfo">
              <MyInfo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Setting;
