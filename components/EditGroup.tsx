import { useRef, useState, KeyboardEvent, ChangeEvent, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import Swal from "sweetalert2";
import { Group } from "../services/group";

interface dataStruct {
  id: string
  name: string
}

const EditGroup: React.VFC<dataStruct> = ({name, id}) => {

  const [Status, setStatus] = useState(false);

  const Data = useRef({
    name: name
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
      group.update(Data.current.name, id).then(res => {
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

  useEffect(() => {
    (document.getElementById('name') as HTMLInputElement).value = name;
  }, []);

  return (
    <>
      <ReactTooltip id="group_control" place="right" effect="solid" />
      <button onClick={() => open()} data-for="group_control" data-tip="แก้ไขข้อมูลของกลุ่ม"
       className='button is-success is-outlined mt-2 is-fullwidth'>
        <i className="bi bi-tools mr-2"></i> แก้ไขกลุ่ม
      </button>
      <div className={`modal ${Status && 'is-active'}`}>
        <div onClick={() => close()} className="modal-background"></div>
        <div className="modal-content">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">
                  <i className="bi bi-tools mr-2"></i> แก้ไขกลุ่ม
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

export default EditGroup

