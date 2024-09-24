const Scouts = () => {
  return (
    <div className="row justify-content-between fx1">
      <div className="col-md-6">
        <h2>管理対象スカウト一覧</h2>
      </div>
      <div className="col-md-6 text-end">
        <button className="btn btn-primary" id="sendForm">
          スカウト一括操作
        </button>
      </div>
    </div>
  );
};

export default Scouts;
