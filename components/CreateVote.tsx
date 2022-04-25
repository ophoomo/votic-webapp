import { useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import Swal from "sweetalert2";
import { Vote } from "../services/vote";

interface dataStruct {
  id: string
};

const CreateVote: React.VFC<dataStruct> = ({id}) => {

  const [Status, setStatus] = useState(false);

  interface voteStruct {
    header: string
    timeout: string
  };

  const Data = useRef({
    header: '',
    timeout: '',
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

  const checkSelect = (): boolean => {
    let index = 0;
    for(const item of select) {
      const element = (document.getElementById('select-' + index) as HTMLInputElement);
      if (item === '') {
        element.focus();
        element.classList.add('is-danger');
        return false;
      }
      element.classList.remove('is-danger');
      index++;
    }
    return true;
  }

  const checkHaveSelect = () => {
    if (select.length > 0) {
      return true;
    }
    Swal.fire({
      icon: 'warning',
      title: 'คำเตือน',
      text: 'กรุณาเพิ่มตัวเลือก',
      timer: 5000,
      timerProgressBar: true
    });
    return false;
  }

  const onSubmit = () => {
    if(IsNotEmpty('header', Data.current.header) && IsNotEmpty('timeout', Data.current.timeout) && checkSelect() &&
      checkHaveSelect()
    ) {
        Swal.fire({
            icon: 'warning',
            title: 'คำเตือน',
            text: 'คุณต้องการที่จะ สร้างโพส ใช่ หรือ ไม่?',
            timer: 10000,
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: 'ไม่',
            confirmButtonText: 'ใช่',
        }).then(result => {
            if(result.isConfirmed) {
              const vote = new Vote();
              vote.create(id, Data.current.header, Data.current.timeout, select).then(res => {
                  Swal.fire({
                    icon: res.data.status ? 'success' : 'warning',
                    title: res.data.status ? 'สำเร็จ' : 'คำเตือน',
                    text: res.data.message,
                }).then(() => {
                    if(res.data.status) {
                      document.location.reload();
                    }
                });
              }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: 'เกิดข้อผิดพลาดจากทางเซิฟเวอร์',
                    });
              });
            }
        });
    }
  }

  const addSelect = () => {
    setSelect(prevState => ([...prevState, '']));
  }

  const removeSelect = (index : number) => {
    let newData = [...select];
    newData.splice(index, 1);
    setSelect(newData);
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

  const InputDataSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const id: number = parseInt(event.target.id.split('-')[1]);
    let data = [...select];
    data[id] = event.target.value;
    setSelect(data);
  }

  return (
    <>
      <button onClick={() => open()} data-for="group_control" data-tip="สร้างโพส เพื่อให้สมาชิก ได้โหวต"
      className='button is-success is-outlined is-fullwidth'>
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
                  <label htmlFor="timeout">เวลาปิด</label>
                  <input onChange={onInputData} onKeyDown={onEnter} id="timeout" type="datetime-local" 
                  className={`input ${isError(error.header)}`} />
                </div>
                {
                select.length > 0 &&
                select.map((item, index) => (
                  <div className="mb-2" key={index}>
                    <label htmlFor={`select-${index}`}>ตัวเลือกที่ {index + 1}</label>
                    <div className="is-flex">
                      <input value={item} id={"select-" + (index)} type="text"
                       onChange={InputDataSelect}
                       className={`input ${isError(error.header)}`} />
                      <button onClick={() => removeSelect(index)} className="button is-danger ml-2">x</button>
                    </div>
                  </div>
                ))
                }
                <button onClick={() => addSelect()} className="button is-success is-outlined is-fullwidth">+</button>
                <button onClick={() => onSubmit()} className="button is-success is-fullwidth mt-5">ยืนยัน</button>
              </div>
            </div>

        </div>
        <button onClick={() => close()} className="modal-close is-large" aria-label="close"></button>
      </div>
    </>
  )
}

export default CreateVote


