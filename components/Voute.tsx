import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import Swal from "sweetalert2";
import { Vote as VoteService } from "../services/vote";
import ResultVote from "./ResultVote";

interface dataStruct {
  idgroup: string;
  idpost: string;
  header: string;
  owner: string;
  id_user: string;
  group_owner: string;
  expire: string;
  open: boolean;
  select: Array<string>;
}

const Vote: React.VFC<dataStruct> = ({
  header,
  owner,
  id_user,
  idpost,
  group_owner,
  idgroup,
  expire,
  open,
  select,
}) => {
  const [status, setStatus] = useState(false);

  const [statusExpire, setStatusExpire] = useState(false);

  const removePost = () => {
    Swal.fire({
      icon: "warning",
      title: "คำเตือน",
      text: "คุณต้องการที่จะลบ โพส ใช่ หรือ ไม่?",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        const vote = new VoteService();
        vote
          .remove(idgroup, idpost)
          .then((res) => {
            Swal.fire({
              icon: res.data.status ? "success" : "warning",
              title: res.data.status ? "สำเร็จ" : "คำเตือน",
              text: res.data.message,
            }).then(() => {
              document.location.reload();
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "เกิดข้อผิดพลาดจากทางเซิฟเวอร์",
            }).then(() => {
              document.location.reload();
            });
          });
      }
    });
  };

  const format_date = (data: string) => {
    const date = data.substring(0, data.indexOf("T"));
    const time = data.substring(data.indexOf("T") + 1, data.indexOf(":") + 3);
    return [date, time];
  };

  const endPost = () => {
    Swal.fire({
      icon: "warning",
      title: "คำเตือน",
      text: "คุณต้องการที่จะสิ้นสุด โพส ใช่ หรือ ไม่?",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonText: "ใช่",
      cancelButtonText: "ไม่",
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        const vote = new VoteService();
        vote
          .close(idgroup, idpost)
          .then((res) => {
            Swal.fire({
              icon: res.data.status ? "success" : "warning",
              title: res.data.status ? "สำเร็จ" : "คำเตือน",
              text: res.data.message,
            }).then(() => {
              document.location.reload();
            });
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "เกิดข้อผิดพลาดจากทางเซิฟเวอร์",
            }).then(() => {
              document.location.reload();
            });
          });
      }
    });
  };

  const checkExpire = (): undefined => {
    const now = new Date();
    const date = format_date(expire);
    const date_now = format_date(now.toISOString());
    if (date_now[0] < date[0]) {
      setStatusExpire(false);
      return;
    }
    if (now.getHours() + ":" + now.getMinutes() < date[1]) {
      setStatusExpire(false);
      return;
    }
    setStatusExpire(true);
  };

  useEffect(() => {
    checkExpire();
  }, []);

  return (
    <>
      <div className="card mb-2">
        <div className="card-header" style={{ alignItems: "center" }}>
          <p className="card-header-title">{header}</p>
          <p className="mr-5">
            วันเวลาปิด: {format_date(expire)[0]} {format_date(expire)[1]}{" "}
          </p>
          {(statusExpire || !open) && <ResultVote />}
          {(owner === id_user || id_user === group_owner) && (
            <>
              {open && !statusExpire && (
                <button
                  data-for="vote_button"
                  data-tip="สิ้นสุดโพส"
                  onClick={() => endPost()}
                  className="button is-info is-small mr-2"
                >
                  <i className="bi bi-alarm"></i>
                </button>
              )}
              <button
                data-for="vote_button"
                data-tip="ลบโพส"
                onClick={() => removePost()}
                className="button is-danger is-small mr-2"
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </>
          )}
          <ReactTooltip effect="solid" place="bottom" id="vote_button" />
        </div>
        <div className="card-content">
          {open ? (
            statusExpire ? (
              <h3 className="title is-1 has-text-centered has-text-danger">
                หมดเวลา
              </h3>
            ) : (
              <div
                className="is-flex is-aligin-center is-justify-content-center is-flex-wrap-wrap"
                style={{ gap: "10px" }}
              >
                {select.map((item, index) => (
                  <button key={index} className="button is-success is-large">
                    {item}
                  </button>
                ))}
              </div>
            )
          ) : (
            <h3 className="title is-1 has-text-centered has-text-danger">
              ปิดโหวต
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Vote;
