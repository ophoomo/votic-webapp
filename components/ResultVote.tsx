import { useState } from "react";

interface DataStruct {
}

const ResultVote: React.VFC<DataStruct> = ({}) => {
  const [Status, setStatus] = useState(false);

  const open = () => {
    document.addEventListener('keydown', onEsc);
    setStatus(true);
  }

  const onEsc = (event : globalThis.KeyboardEvent) => {
      if(event.key === 'Escape') {
        close();
      }
  }

  const close = () => {
    document.removeEventListener('keydown', onEsc);
    setStatus(false);
  }
  return (
    <>
      <button
        onClick={() => open()} data-for="vote_button" data-tip="ดูผลลัพท์"
        className="button is-success is-small is-outlined mr-2"
      >
        <i className="bi bi-clipboard2-data"></i>
      </button>
      <div className={`modal ${Status && "is-active"}`}>
        <div onClick={() => close()} className="modal-background"></div>
        <div className="modal-content">
          <div className="card">
            <div className="card-header">
              <p className="card-header-title">ผลการโหวต</p>
            </div>
            <div className="card-content"></div>
          </div>
        </div>
        <button
          onClick={() => close()}
          className="modal-close is-large"
          aria-label="close"
        ></button>
      </div>
    </>
  );
};

export default ResultVote;
