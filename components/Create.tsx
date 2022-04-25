import { useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import Swal from "sweetalert2";
import { Group } from "../services/group";

const Create: React.VFC = () => {

  const [Status, setStatus] = useState(false);

  const Data = useRef({
    name: ''
  });
  const [error, setError] = useState({
    name: false
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
      (document.getElementById('name') as HTMLInputElement).focus();
    }, 100);
  }

  const close = () => {
    document.removeEventListener('keydown', onEsc);
    setStatus(false);
  }

  const onSubmit = () => {
    if(IsNotEmpty('name', Data.current.name)) {
      const group = new Group();
      group.create(Data.current.name).then(res => {
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
      <button onClick={() => open()} data-for="home" data-tip="สร้างกลุ่มของท่าน"
      className='button is-success is-outlined mr-2'>สร้างห้อง</button>
      <div className={`modal ${Status && 'is-active'}`}>
        <div onClick={() => close()} className="modal-background"></div>
        <div className="modal-content">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">
                  สร้างห้อง
                </p>
              </div>
              <div className="card-content">
                <div>
                  <label htmlFor="name">ชื่อห้อง</label>
                  <input onChange={onInputData} onKeyDown={onEnter} id="name" type="text" className={`input ${isError(error.name)}`} />
                </div>
                <button onClick={() => onSubmit()} className="button is-success is-fullwidth mt-2">ยืนยัน</button>
              </div>
            </div>

        </div>
        <button onClick={() => close()} className="modal-close is-large" aria-label="close"></button>
      </div>
    </>
  )
}

export default Create

