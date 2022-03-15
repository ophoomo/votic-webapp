import { useRef, useState, KeyboardEvent, ChangeEvent } from "react";

const CreateVote: React.VFC = () => {

  const [Status, setStatus] = useState(false);

  interface voteStruct {
    header: string
  };

  const Data = useRef({
    header: '',
  });

  const [select, setSelect] = useState<Array<string>>([]);

  const [error, setError] = useState({
    header: false
  });

  const onEsc = (event : globalThis.KeyboardEvent) => {
      if(event.key === 'Escape') {
        close();
      }
  }

  const open = () => {
    document.addEventListener('keydown', onEsc);
    setStatus(true);
    setTimeout(() => {
      (document.getElementById('header') as HTMLInputElement).focus();
    }, 100);
  }

  const close = () => {
    document.removeEventListener('keydown', onEsc);
    setStatus(false);
  }

  const onSubmit = () => {
    if(IsNotEmpty('header', Data.current.header)) {

    }
  }

  const addSelect = () => {
    setSelect(prevState => ([...prevState, 'asdasd']));
  }

  const onEnter = (event : KeyboardEvent<HTMLInputElement>) => {
    event.key === 'Enter' && onSubmit();
  }

  const IsNotEmpty = (id : string, value : string) => {
    if(value != '') {
      setError(prevState => ({...prevState, [id]: false}));
      return true;
    }
    setError(prevState => ({...prevState, [id]:true}));
    (document.getElementById(id) as HTMLInputElement).focus();
    return false;
  }

  const isError = (status : boolean) : string => {
    return status ? 'is-danger' : '';
  }

  const onInputData = (event : ChangeEvent<HTMLInputElement>) => {
    Data.current = {...Data.current, [event.target.id]: event.target.value};
  }

  return (
    <>
      <button onClick={() => open()} className='button is-info is-outlined is-fullwidth'>
        <i className="bi bi-megaphone-fill mr-2"></i> เปิดโหวต
      </button>
      <div className={`modal ${Status && 'is-active'}`}>
        <div onClick={() => close()} className="modal-background"></div>
        <div className="modal-content">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">
                  <i className="bi bi-megaphone-fill mr-2"></i> เปิดโหวต
                </p>
              </div>
              <div className="card-content">
                <div className="mb-2">
                  <label htmlFor="name">ชื่อหัวข้อ</label>
                  <input onChange={onInputData} onKeyDown={onEnter} id="header" type="text" 
                  className={`input ${isError(error.header)}`} />
                </div>
                <div className="mb-2">
                  <label htmlFor="expire">เวลาปิด</label>
                  <input onChange={onInputData} onKeyDown={onEnter} id="header" type="datetime-local" 
                  className={`input ${isError(error.header)}`} />
                </div>
                {
                select.map((item, index) => (
                  <div className="mb-2" key={index}>
                    <label htmlFor="select">ตัวเลือกที่ {index + 1}</label>
                    <input id={"select-" + index + 1} type="text" className={`input ${isError(error.header)}`} />
                  </div>
                ))
                }
                <button onClick={() => addSelect()} className="button is-success is-outlined is-fullwidth">+</button>
                <button onClick={() => onSubmit()} className="button is-info is-fullwidth mt-5">ยืนยัน</button>
              </div>
            </div>

        </div>
        <button onClick={() => close()} className="modal-close is-large" aria-label="close"></button>
      </div>
    </>
  )
}

export default CreateVote


