const Scouts = () => {
  return (
    <div className="row justify-content-between fx1">
      <div id="" className="col-12 col-lg-6 d-flex flex-column fx1">
        <div className="card d-flex justify-content-center" id="selecter">
          <div className="row">
            <div className="col-8">
              <input
                type="name"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="名前で検索"
              />
            </div>
            <div className="col-4 d-grid gap-2">
              <button
                type="button"
                className="btn btn-primary justify-content-end"
              >
                検索
              </button>
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap justify-content-around">
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id="{{ i.short }}Select"
                value="{{ i.short }}"
                checked=""
              />
              <label
                for="{{ i.short }}Select"
                className="form-check-label"
              ></label>
            </div>
          </div>
        </div>
        <div className="card overflow-hidden" id="table">
          <div className="card-body overflow-auto">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th scope="col">名前</th>
                  <th scope="col">所属</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  id="createScout"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onclick="editView('new')"
                >
                  <th scope="row">#</th>
                  <td>新規作成</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="leftSide" className="col-12 col-lg-6 d-flex">
        <div className="card fx1">
          <div className="card-body fx1 d-flex overflow-auto">
            <div id="detailScout" className="fx1">
              <h5 className="card-title">タイトル</h5>
              <p className="card-text">スカウトの一覧です。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scouts;
