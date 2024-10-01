import { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [isSent, setIsSent] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const urlSearchParams = new URLSearchParams();

    const form = e.target;
    const inputs = form.getElementsByClassName("form-control");
    for (let i = 0; i < inputs.length; i++) {
      urlSearchParams.append(inputs[i].name, inputs[i].value);
    }
    fetch(form.action, {
      method: form.method,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlSearchParams.toString(),
    }).then(setIsSent(true));
  };

  return (
    <div
      className="vh-100 d-flex flex-wrap justify-content-center align-content-center container"
      style={{ maxWidth: "800px" }}
    >
      <div className="card w-100">
        {isSent ? (
          <div className="card-body d-grid justify-content-center align-content-center">
            <h3 className="mt-5 mb-5">フォームを送信しました</h3>
          </div>
        ) : (
          <div className="card-body">
            <h3 className="card-title text-center">お問い合わせ</h3>
            <form
              className="form"
              action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSe2CUhyqBTgVMN7aWG3KYT9Dt7GeYZGHNLabo97EmCBwLDzWw/formResponse"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="#name" className="form-label">
                  お名前
                </label>
                <input
                  required
                  name="entry.155335159"
                  className="form-control"
                  id="name"
                  type="text"
                  placeholder="佐藤花子"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="#email" className="form-label">
                  メールアドレス
                </label>
                <input
                  required
                  name="entry.461661229"
                  className="form-control"
                  id="email"
                  type="email"
                  placeholder="xxx@example.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="#body" className="form-label">
                  お問い合わせ内容
                </label>
                <textarea
                  required
                  name="entry.998480335"
                  className="form-control"
                  id="text"
                  type="text"
                  placeholder="ここに内容を入力・・・"
                  rows={5}
                />
              </div>
              <div className="d-grid justify-content-center align-content-center">
                <button type="submit" className="btn btn-primary">
                  送信
                </button>
              </div>
            </form>
          </div>
        )}
        <Link to="/" className="text-center">
          トップページに戻る
        </Link>
      </div>
    </div>
  );
};

export default Contact;
