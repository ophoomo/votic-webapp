import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Swal from 'sweetalert2';
import CreateVote from '../../../components/CreateVote';
import EditGroup from '../../../components/EditGroup';
import HeaderGroup from '../../../components/HeaderGroup';
import Navbar from '../../../components/Navbar';
import VoteComponent from '../../../components/Voute';
import MainLayout from '../../../layouts/main';
import { getAuthState } from '../../../redux/Selectors';
import { AuthState } from '../../../redux/types/authType';
import { Group } from '../../../services/group';
import { Vote } from '../../../services/vote';

const GroupID: NextPage = () => {

    interface groupStruct {
        name: string
        code: string
        owner: string
    }

    interface voteStruct {
        _id: string
        score: Array<number>
        voted: Array<string>
        owner: string
        header: string
        timeout: string
        select: Array<string>
        open: boolean
    }

    const [group, setGroup] = useState<groupStruct>({
        name: '',
        code: '',
        owner: '',
    });

    const [vote, setVote] = useState<Array<voteStruct>>([]);

    const router = useRouter();
    const { id } = router.query;

    const authStore: AuthState = useSelector(getAuthState);

    const getGroup = () => {
        const group = new Group();
        group.find(id as string).then(res => {
            if (res.data.status) {
                setGroup(res.data.data);
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'คำเตือน',
                    text: res.data.message,
                }).then(() => {
                    router.push('/');
                });
            }
        }).catch(() => {
          Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'เกิดข้อผิดพลาดจากทางเซิฟเวอร์',
          }).then(() => {
              router.push('/');
          })
        });
    }

    const getVote = () => {
        const vote = new Vote();
        vote.find(id as string).then(res => {
            if (res.data.status) {
                setVote(res.data.data);
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'คำเตือน',
                    text: res.data.message,
                }).then(() => {
                    router.push('/');
                });
            }
        }).catch(() => {
          Swal.fire({
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'เกิดข้อผิดพลาดจากทางเซิฟเวอร์',
          }).then(() => {
              router.push('/');
          })
        });
    }

    const leave = () => {
        Swal.fire({
            icon: 'warning',
            title: 'คำเตือน',
            text: 'คุณต้องการที่จะ ออกจากกลุ่ม ใช่ หรือ ไม่?',
            timer: 10000,
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: 'ไม่',
            confirmButtonText: 'ใช่',
        }).then(result => {
            if(result.isConfirmed) {
                const group = new Group();
                group.leave(id as string).then(res => {
                    window.location.href = '/';
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

    const clickCopy = () => {
        const element = document.querySelector('#codeRoom');
        const range = document.createRange();
        range.selectNode(element as Node);
        window.getSelection()?.addRange(range);
        navigator.clipboard.writeText(group.code);
    }

    useEffect(() => {
        if(id != undefined) {
            getGroup();
            getVote();
        }
    }, [id]);

    return (
    <MainLayout>
      <Navbar />
        <div className='container mt-5'>
            <HeaderGroup name={group.name} />
            <div className="columns mt-4">
                <div className='column is-2'>
                    <div className='card'>
                        <div className="card-header">
                            <p className="card-header-title">โค้ดเข้าร่วมห้อง</p>
                        </div>
                        <div className="card-content">
                            <h1 style={{cursor: 'pointer'}} onClick={() => clickCopy() } id="codeRoom"
                             className='title is-2 has-text-centered'>{group.code}</h1>
                        </div>
                    </div>
                    <div className='card mt-5'>
                        <div className="card-content">
                            <ReactTooltip id='group_control' effect='solid' place='right' />
                            <CreateVote id={id as string} />
                            <Link href={`${id}/member`}>
                                <button data-for="group_control" data-tip="ดูสมาชิกทั้งหมดของกลุ่มนี้"
                                 className='button is-success is-outlined is-fullwidth mt-2'>
                                 <i className="bi bi-people-fill mr-2"></i> สมาชิก
                                </button>
                            </Link>
                            {
                            (group.name !== '' && authStore.id === group.owner) &&
                            <EditGroup name={group.name} id={id as string} />
                            }
                            <button data-for="group_control" data-tip={ group.owner === authStore.id ? 
                            'ถ้าคุณออกจากกลุ่มระบบจะสุ่มสมาชิกขึ้นเป็นหัวหน้าแทน' :'กดเพื่อออกจากกลุ่ม'}
                             onClick={() => leave()} className='button is-danger is-outlined is-fullwidth mt-2'>
                                <i className="bi bi-door-open-fill mr-2"></i> ออกจากกลุ่ม
                            </button>
                        </div>
                    </div>
                </div>
                <div className='column'>
                    {
                        vote.length > 0 &&
                        vote.map((item, index) => <VoteComponent expire={item.timeout} select={item.select} 
                        open={item.open}
                         id_user={authStore.id} idpost={item._id} group_owner={group.owner} idgroup={id as string}
                         owner={item.owner} header={item.header} key={index} />)
                    }
                </div>
            </div>
        </div>
    </MainLayout>
    );
}


export default GroupID;