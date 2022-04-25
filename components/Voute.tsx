import { useState } from "react"
import Swal from "sweetalert2"
import { Vote as VoteService } from '../services/vote';

interface dataStruct {
  idgroup: string
  idpost: string
  header: string
  owner: string
  id_user: string
  group_owner: string
}

const Vote: React.VFC<dataStruct> = ({header, owner, id_user, idpost, group_owner, idgroup}) => {

  const [status, setStatus] = useState(false);

  const removePost = () => {
    Swal.fire({
      icon: 'warning',
      title: 'คำเตือน',
      text: 'คุณต้องการที่จะลบ โพส ใช่ หรือ ไม่?',
      timer: 5000,
      timerProgressBar: true,
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่',
      showCancelButton: true,
    }).then(result => {
      if (result.value) {
        const vote = new VoteService();
        vote.remove(idgroup,idpost).then((res) => {
          Swal.fire({
              icon: res.data.status ? 'success' : 'warning',
              title: res.data.status ? 'สำเร็จ' : 'คำเตือน',
              text: res.data.message,
          }).then(() => {
            document.location.reload();
          });
        }).catch(() => {
          Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'เกิดข้อผิดพลาดจากทางเซิฟเวอร์',
          }).then(() => {
              document.location.reload();
          });
        });
      }
    });
  }

  return (
    <>
    <div className="card mb-2">
      <div className="card-content">
        <h4 className="title is-4">{header}</h4>
        {
          (owner === id_user || id_user === group_owner) && <button onClick={() => removePost()}
           className="button is-danger is-small">X</button>
        }
      </div>
    </div>
    </>
  )
}

export default Vote

