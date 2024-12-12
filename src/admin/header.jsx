import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faGear,
  faMagnifyingGlass,
  faQuestion,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase/firebase";
import { useAuthContext } from "../firebase/authContext";
const Header = ({ username }) => {
  const handleLogout = () => {
    auth.signOut();
    nav("/auth/login");
  };

  const { role } = useAuthContext();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom border-bottom-dark fixed-top">
      <div className="container">
        <NavLink
          className="navbar-brand fw-bold d-flex align-items-center"
          to={"/admin/"}
        >
          <svg
            id="_x31_0"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 512 512"
            style={{
              width: "30px",
              height: "24px",
              opacity: "1",
              paddingBottom: "2px",
            }}
          >
            <g>
              <path
                className="st0"
                d="M415.883,195.567c-2.481-1.161-5.043-2.402-7.68-3.566c-2.946-28.938-21.488-60.898-51.586-88.516
		C324.809,74.395,287.183,57.02,256,57.02c-31.187,0-68.734,17.375-100.539,46.465c-30.098,27.618-48.718,59.578-51.664,88.516
		c-2.562,1.164-5.121,2.406-7.602,3.566C34.211,225.125,0,264.457,0,306.348C0,389.664,112.484,454.98,256,454.98
		c143.594,0,256-65.316,256-148.633C512,264.457,477.867,225.125,415.883,195.567z M35.457,281.184
		c0.856-1.633,1.782-3.254,2.786-4.859c0.297-0.477,0.621-0.95,0.934-1.422c0.945-1.442,1.934-2.875,2.996-4.29
		c0.359-0.484,0.742-0.965,1.117-1.445c1.145-1.469,2.328-2.926,3.594-4.367c0.285-0.329,0.586-0.657,0.882-0.989
		c1.485-1.652,3.023-3.293,4.656-4.91c0.039-0.039,0.078-0.078,0.118-0.118c14.726-14.539,35.274-27.586,58.625-38.469v64
		c0,25.988,16.45,49.258,46.317,65.551c17.996,9.773,40.183,16.523,64.465,19.859c4.109,10.316,14.273,17.61,26.062,17.61h16.058
		c11.793,0,21.879-7.294,26.066-17.688c24.282-3.258,46.469-10.008,64.465-19.781c29.867-16.294,46.238-39.563,46.238-65.551
		v-45.152l0.066-18.817c23.375,10.883,43.926,23.926,58.648,38.461c0.028,0.024,0.055,0.051,0.078,0.078
		c1.653,1.629,3.203,3.285,4.703,4.953c0.278,0.313,0.566,0.626,0.84,0.938c1.278,1.461,2.477,2.934,3.637,4.418
		c0.359,0.465,0.73,0.926,1.078,1.39c1.078,1.438,2.082,2.89,3.039,4.351c0.297,0.454,0.606,0.91,0.894,1.364
		c1.016,1.625,1.958,3.266,2.821,4.918c0.129,0.242,0.266,0.481,0.386,0.722c3.996,7.883,6.191,16.043,6.191,24.406
		c0,66.172-101.702,119.855-227.218,119.855c-125.442,0-227.141-53.683-227.141-119.855c0-8.359,2.191-16.511,6.18-24.386
		C35.172,281.7,35.32,281.441,35.457,281.184z M164.145,135.449c0.922-1,1.93-1.946,2.878-2.926
		c15.062-15.481,33.317-28.898,51.52-37.348c12.855-5.91,25.714-9.374,37.457-9.374c11.742,0,24.606,3.465,37.457,9.374
		c18.133,8.418,36.317,21.766,51.344,37.172c16.926,17.438,29.762,37.504,33.691,56.16c0.93,3.958,1.321,7.836,1.321,11.637v26.531
		c-8.614,28.008-60.821,49.57-123.813,49.57s-115.278-21.562-123.813-49.648v-26.454c0-3.801,0.469-7.679,1.321-11.637
		c3.687-17.511,15.164-36.305,30.554-52.969C164.09,135.512,164.117,135.476,164.145,135.449z M233.969,358.403
		c0-3.106,1.008-5.977,2.793-8.305c2.558-3.489,6.672-5.738,11.246-5.738h16.058c4.578,0,8.691,2.25,11.25,5.738
		c1.785,2.328,2.793,5.199,2.793,8.305v0.851c0,0.386,0,0.774-0.078,1.164c-0.386,4.73-3.18,8.844-7.137,11.094
		c-2.015,1.164-4.344,1.782-6.828,1.782h-16.058c-2.481,0-4.809-0.618-6.902-1.782c-3.957-2.25-6.672-6.363-7.058-11.094
		c-0.078-0.39-0.078-0.778-0.078-1.164V358.403z M132.297,257.098c24.226,22.293,69.477,36.683,123.703,36.683
		c46.324,0,86.106-10.527,111.789-27.48c4.391-2.867,8.438-5.906,12.024-9.157v27.172c0,30.562-36.539,56.242-89.524,64.078
		c-4.035-10.551-14.273-18.078-26.222-18.078h-16.058c-11.946,0-22.184,7.527-26.219,18.078
		c-52.984-7.836-89.602-33.516-89.602-64.078V267.91L132.297,257.098z"
                style={{ fill: "var(--bs-navbar-brand-color)" }}
              ></path>
              <path
                className="st0"
                d="M176.562,218.996c0,0,2.016,0.465,5.742,0.777c1.008,0.074,2.015,0.23,3.179,0.23
		c1.086,0,2.329-0.078,3.645-0.156c1.321-0.074,2.715-0.152,4.27-0.309c1.473-0.23,3.023-0.542,4.73-0.93
		c3.336-0.621,6.824-2.019,10.473-3.57c3.566-1.859,7.367-3.878,10.782-6.824c0.855-0.699,1.706-1.477,2.562-2.172l2.402-2.484
		c1.554-1.629,3.105-3.336,4.422-5.274c2.484-3.414,4.656-7.137,6.442-10.942c0.152-0.308,0.308-0.617,0.386-0.93
		c0.852-2.094,1.786-4.187,2.558-6.207c0.622-2.094,1.164-4.187,1.786-6.281c0.621-2.715,1.164-5.43,1.55-8.07
		c0.313-1.394,0.465-2.715,0.543-4.031c0.543-3.957,0.543-7.602,0.621-11.172c-0.078-3.492-0.156-7.137-0.465-9.851
		c-0.234-1.398-0.386-2.794-0.542-4.035c-0.157-1.63-0.387-2.794-0.543-4.11c-0.465-2.485-1.008-4.656-1.473-6.363
		c-0.469-1.786-0.934-3.102-1.164-4.031c-0.39-1.012-0.543-1.398-0.543-1.398l-0.156-0.234c-1.008-2.25-3.18-3.879-5.817-4.188
		c-3.957-0.386-7.527,2.485-7.914,6.438c0,0-0.234,1.786-0.543,4.887c-0.156,1.476-0.386,3.336-0.699,5.434
		c-0.156,1.007-0.309,2.25-0.543,3.179c-0.23,1.242-0.386,2.558-0.699,3.958c-0.386,3.023-1.007,5.43-1.472,8.378
		c-0.699,2.789-1.242,5.894-2.094,8.844c-0.777,3.102-1.785,6.046-2.714,9.074c-0.313,0.621-0.543,1.164-0.778,1.863
		c-0.309,0.774-0.621,1.629-1.008,2.48c-0.542,1.398-1.242,2.715-1.863,4.114c-1.473,2.558-2.789,5.195-4.5,7.289
		c-0.774,1.242-1.703,2.172-2.558,3.184c-0.386,0.542-0.851,1.007-1.242,1.55l-1.394,1.321c-1.473,1.629-3.102,2.945-4.656,4.187
		c-0.387,0.309-0.695,0.543-1.008,0.851c-2.094,1.321-3.957,2.871-5.973,3.958c-1.086,0.542-2.015,1.164-2.949,1.706
		c-1.008,0.466-1.938,0.93-2.79,1.399c-0.934,0.465-1.785,0.93-2.562,1.394c-0.851,0.308-1.55,0.621-2.25,0.93
		c-2.793,1.242-4.422,2.172-4.422,2.172l-0.93,0.542c-1.707,1.012-3.027,2.719-3.492,4.813
		C170.047,214.344,172.606,218.223,176.562,218.996z"
                style={{ fill: "var(--bs-navbar-brand-color)" }}
              ></path>
              <path
                className="st0"
                d="M270.508,165.856c0.386,2.641,1.008,5.355,1.55,8.07c0.699,2.094,1.242,4.187,1.859,6.281
		c0.699,2.02,1.707,4.114,2.485,6.207c0.156,0.313,0.309,0.622,0.465,0.93c1.785,3.805,3.957,7.527,6.438,10.942
		c1.32,1.938,2.871,3.645,4.422,5.274l2.406,2.484c0.851,0.695,1.707,1.473,2.562,2.172c3.41,2.946,7.211,4.965,10.782,6.824
		c3.644,1.551,7.137,2.95,10.473,3.57c1.629,0.387,3.258,0.699,4.73,0.93c1.554,0.157,2.949,0.234,4.27,0.309
		c1.316,0.078,2.558,0.156,3.644,0.156c1.164,0,2.172-0.156,3.18-0.23c3.648-0.312,5.742-0.777,5.742-0.777
		c1.937-0.387,3.722-1.629,4.808-3.493c2.016-3.488,0.856-7.91-2.714-9.93l-0.852-0.542c0,0-1.633-0.93-4.422-2.172
		c-0.699-0.309-1.477-0.622-2.25-0.93c-0.777-0.465-1.629-0.93-2.562-1.394c-0.851-0.469-1.781-0.934-2.867-1.399
		c-0.855-0.542-1.863-1.164-2.871-1.706c-2.019-1.086-3.878-2.637-5.972-3.958c-0.313-0.308-0.699-0.542-1.012-0.773
		c-1.55-1.321-3.18-2.637-4.652-4.266l-1.398-1.321c-0.387-0.543-0.852-1.008-1.238-1.55c-0.934-1.012-1.786-1.942-2.562-3.184
		c-1.707-2.094-3.102-4.73-4.5-7.289c-0.622-1.398-1.317-2.715-1.938-4.114c-0.313-0.851-0.622-1.706-0.93-2.48
		c-0.234-0.699-0.543-1.242-0.778-1.863c-0.93-3.028-2.016-5.973-2.715-9.074c-0.855-2.95-1.394-6.055-2.094-8.844
		c-0.465-2.949-1.164-5.355-1.55-8.378c-0.234-1.399-0.391-2.715-0.622-3.958c-0.234-0.93-0.39-2.172-0.542-3.179
		c-0.313-2.098-0.543-3.958-0.699-5.434c-0.387-3.102-0.543-4.887-0.543-4.887c-0.234-2.48-1.786-4.73-4.188-5.816
		c-3.648-1.629-7.914,0-9.621,3.566l-0.078,0.234c0,0-0.156,0.386-0.542,1.398c-0.234,0.93-0.699,2.246-1.242,4.031
		c-0.386,1.707-0.93,3.878-1.394,6.363c-0.156,1.316-0.387,2.48-0.543,4.11c-0.156,1.242-0.313,2.637-0.543,4.035
		c-0.386,2.714-0.386,6.359-0.465,9.851c0.078,3.57,0,7.215,0.618,11.172C270.117,163.14,270.274,164.461,270.508,165.856z"
                style={{ fill: "var(--bs-navbar-brand-color)" }}
              ></path>
            </g>
          </svg>
          My History
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          aria-controls="offcanvas"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-start"
          id="offcanvas"
          aria-labelledby="offcanvasLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title">メニュー</h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <NavLink className="nav-link" to={"/admin/scouts"}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="me-1" />
                  スカウト検索
                </NavLink>
              </li>
              {role == "ADMIN" && (
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink className="nav-link" to={"/admin/group"}>
                    <FontAwesomeIcon icon={faUsers} className="me-1" />
                    グループ管理
                  </NavLink>
                </li>
              )}
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <NavLink className="nav-link" to={"/admin/setting"}>
                  <FontAwesomeIcon icon={faGear} className="me-1" />
                  設定
                </NavLink>
              </li>
              <li className="nav-item" data-bs-dismiss="offcanvas">
                <a
                  className="nav-link"
                  href="https://kihamdanet.notion.site/13cfca102538805c9daac48b39574ef7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faQuestion} className="me-1" />
                  ヘルプページ
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto d-none d-lg-flex">
              <span className="d-grid align-content-center me-3">
                {username + " さん"}
              </span>
              <li className="nav-item d-flex">
                <button className="btn btn-primary" onClick={handleLogout}>
                  ログアウト
                </button>
              </li>
            </ul>
          </div>
          <div className="offcanvas-footer d-lg-none text-center">
            <div className="d-grid align-contet-center justify-content-center mb-3">
              <span>{username + " さん"}</span>
              <button className="btn btn-primary" onClick={handleLogout}>
                ログアウト
              </button>
            </div>
            <div className="row">
              <div className="col-12">
                <p>
                  Copyright © 2024
                  <a
                    className="noAtag ms-3"
                    href="https://kihamda.net/"
                    target="_blank"
                  >
                    Dai.M
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
