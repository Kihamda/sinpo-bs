const Home = () => {
  return (
    <div className="d-grid h-100 justify-content-center align-content-center">
      <div className="d-flex flex-column">
        <input
          type="text"
          className="form-control"
          placeholder="ここに入力して検索…"
          required
        />
      </div>
    </div>
  );
};

export default Home;
