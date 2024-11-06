const Setting = () => {
  return (
    <div className="row">
      <div className="col-md-6">
        <label>Setting 1:</label>
        <input type="text" className="form-control" placeholder="Setting 1" />
      </div>
      <div className="col-md-6">
        <label>Setting 2:</label>
        <input type="text" className="form-control" placeholder="Setting 2" />
      </div>
      <div className="col-md-12">
        <button type="submit" className="btn btn-primary">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Setting;
