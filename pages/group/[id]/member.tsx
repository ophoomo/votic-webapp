import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import HeaderGroup from '../../../components/HeaderGroup';
import Navbar from '../../../components/Navbar';
import MainLayout from '../../../layouts/main';
import { getAuthState } from '../../../redux/Selectors';
import { AuthState } from '../../../redux/types/authType';
import { Group } from '../../../services/group';

const GroupMember: NextPage = () => {

    interface groupStruct {
        name: string
        code: string
        owner: string
    }

    interface memberStruct {
        id: string
        name: string
    }

    const [group, setGroup] = useState<groupStruct>({
        name: '',
        code: '',
        owner: '',
    });

    const [member, setMember] = useState<Array<memberStruct>>([]);

    const authStore: AuthState = useSelector(getAuthState);

    const router = useRouter();
    const { id } = router.query;

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
          });
        });
    }

    const removeMember = (idMember: string) => {
        const group = new Group();
        
        Swal.fire({
            icon: 'warning',
            title: 'คำเตือน',
            text: 'คุณต้องการที่จะ ลบเขาออกจากกลุ่ม ใช่ หรือ ไม่?',
            timer: 10000,
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: 'ไม่',
            confirmButtonText: 'ใช่',
        }).then(result => {
            if (result.isConfirmed) {
                group.removeMember(id as string , idMember).then(res => {
                    document.location.reload();
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: 'เกิดข้อผิดพลาดจากทางเซิฟเวอร์',
                    }).then(() => {
                        router.push('/');
                    });
                });
            }
        });
    }

    const changeOwner = (idMember: string) => {
        const group = new Group();
        
        Swal.fire({
            icon: 'warning',
            title: 'คำเตือน',
            text: 'คุณต้องการที่จะ เปลื่ยนหัวหน้ากลุ่ม ใช่ หรือ ไม่?',
            timer: 10000,
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: 'ไม่',
            confirmButtonText: 'ใช่',
        }).then(result => {
            if (result.isConfirmed) {
                group.changeOwner(id as string, idMember).then(res => {
                    document.location.reload();
                }).catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด',
                        text: 'เกิดข้อผิดพลาดจากทางเซิฟเวอร์',
                    }).then(() => {
                        router.push('/');
                    });
                });
            }
        });
    }

    const getMember = () => {
        const group = new Group();
        group.findMember(id as string).then(res => {
            if (res.data.status) {
                setMember(res.data.data.member);
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

    useEffect(() => {
        if (id !== undefined) {
            getGroup();
            getMember();
        }
    }, [id]);


    return (
    <MainLayout>
        <Navbar />
        <div className='container'>
            <HeaderGroup name={group.name} />
            <div className='card mt-5'>
                <div className="card-header">
                    <p className="card-header-title"><i className="bi bi-people-fill mr-2"></i> สมาชิกทั้งหมด</p>
                </div>
                <div className="card-content">
                    <table className='table is-fullwidth'>
                        <thead>
                            <tr>
                                <th>ลำดับ</th>
                                <th>ชื่อ - นามสกุล</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                member.length > 0 &&
                                member.map((item, index) => (
                                    <tr key={index}>
                                        <td>{ index + 1 }</td>
                                        <td>{item.id === group.owner && <i className="bi bi-trophy-fill has-text-warning mr-2"></i>} { item.name }</td>
                                        {
                                            (group.owner === authStore.id && item.id !== group.owner) ?
                                            <div>
                                                <td><button onClick={() => changeOwner(item.id) } className='button is-warning'><i className="bi bi-trophy-fill"></i></button></td>
                                                <td><button onClick={() => removeMember(item.id) } className='button is-danger'><i className="bi bi-person-x-fill"></i></button></td>
                                            </div>
                                            :
                                            <td></td>
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </MainLayout>
    );
}


export default GroupMember;