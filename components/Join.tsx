import { useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import Swal from "sweetalert2";
import { Group } from "../services/group";

const Join: React.VFC = () => {
  const [Status, setStatus] = useState(false);

  const Data = useRef({
    code: ''
  });
  const [error, setError] = useState({
    code: false
  });

  const onEsc = (event : globalThis.KeyboardEvent) => {
      if(event.key === 'Escape') {
        close();
      }
  }

  const open = async () => {
    document.addEventListener('keydown', onEsc);
    // const textinCopy = await navigator.clipboard.readText();
    // if (textinCopy.length === 7) {
    //   Data.current.code = textinCopy;
    //   (document.getElementById('code') as HTMLInputElement).value = textinCopy;
    // }
    setStatus(true);
    setTimeout(() => {
      (document.getElementById('code') as HTMLInputElement).focus();
    }, 100);
  }

  const close = () => {
    document.removeEventListener('keydown', onEsc);
    setStatus(false);
  }

  const onSubmit = () => {
    if(IsMoreThen6('code', Data.current.code)) {
      const group = new Group();
      group.join(Data.current.code).then(res => {
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

  const IsMoreThen6 = (id : string, value: string) => {
    if(IsNotEmpty(id, value)) {
      if(value.length >= 6) {
        setError(prevState => ({...prevState, [id]: false}));
        return true;
      }
    }
    setError(prevState => ({...prevState, [id]:true}));
    (document.getElementById(id) as HTMLInputElement).focus();
    return false;
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
    <button onClick={() => open()} data-for="home" data-tip="เข้าร่วมกลุ่ม โดยการ กรอก โค้ด"
     className='button is-success mr-2'>เข้าร่วมห้อง</button>
    <div className={`modal ${Status && 'is-active'}`}>
      <div onClick={() => close()} className="modal-background"></div>
      <div className="modal-content">
        <div className="card">
          <div className="card-header">
            <p className="card-header-title">
              เข้าร่วมห้อง
            </p>
          </div>
          <div className="card-content">
            <div>
              <label htmlFor="code">รหัสห้อง</label>
              <input onKeyDown={onEnter} onChange={onInputData} id="code" type="text"
               className={`input ${isError(error.code)}`} />
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

export default Join
