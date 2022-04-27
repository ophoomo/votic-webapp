import { useEffect, useState } from "react";

interface DataStruct {
  select: Array<string>
  score: Array<number>
}

interface ScoreStruct {
  select: string
  score: number
}

const ResultVote: React.VFC<DataStruct> = ({select, score}) => {
  const [Status, setStatus] = useState(false);
  const [Data, setData] = useState<Array<ScoreStruct>>([]);

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

  const checkData = () => {
    let data = [];
    for(let index in select) {
      data.push({select: select[index], score: score[index]});
    }
    data = data.sort((a,b) => {
      if (a.score >= b.score) return -11;
      return 0;
    });
    setData(data);
  }


  useEffect(() => {
    checkData();
  }, []);
  
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
            <div className="card-content">
              {
                Data.length > 0 &&
                Data.map((item, index) => (
                  <h3 className="title is-4" key={index}>อันดับ {index + 1} ได้แก่ {item.select} ด้วยจำนวน {item.score} คะแนน 
                  { index === 0 && <i className="bi bi-trophy-fill has-text-warning ml-2"></i>}</h3>
                ))
              }
            </div>
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
