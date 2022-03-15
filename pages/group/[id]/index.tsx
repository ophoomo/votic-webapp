import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import CreateVote from '../../../components/CreateVote';
import HeaderGroup from '../../../components/HeaderGroup';
import Navbar from '../../../components/Navbar';
import Vote from '../../../components/Voute';
import MainLayout from '../../../layouts/main';
import { Group } from '../../../services/group';

const GroupID: NextPage = () => {

    interface groupStruct {
        name: string
        code: string
        owner: string
    }

    const [group, setGroup] = useState<groupStruct>({
        name: '',
        code: '',
        owner: '',
    });

    const router = useRouter();
    const { id } = router.query;

    const getGroup = () => {
        const group = new Group();
        group.find(id as string).then(res => {
            setGroup(res.data.data);
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
                    })
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
        getGroup();
    }, []);

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
                            <h1 style={{cursor: 'pointer'}} onClick={() => clickCopy() } id="codeRoom" className='title is-2 has-text-centered'>{group.code}</h1>
                        </div>
                    </div>
                    <div className='card mt-5'>
                        <div className="card-content">
                            <CreateVote />
                            <Link href={`${id}/member`}>
                                <button className='button is-info is-outlined is-fullwidth mt-2'>
                                 <i className="bi bi-people-fill mr-2"></i> สมาชิก
                                </button>
                            </Link>
                            <button className='button is-info is-outlined is-fullwidth mt-2'>
                                <i className="bi bi-tools mr-2"></i> แก้ไขกลุ่ม
                            </button>
                            <button onClick={() => leave()} className='button is-danger is-outlined is-fullwidth mt-2'>
                                <i className="bi bi-door-open-fill mr-2"></i> ออกจากกลุ่ม
                            </button>
                        </div>
                    </div>
                </div>
                <div className='column'>
                    <Vote />
                    <Vote />
                    <Vote />
                    <Vote />
                    <Vote />
                    <Vote />
                    <Vote />
                    <Vote />
                    <Vote />
                </div>
            </div>
        </div>
    </MainLayout>
    );
}


export default GroupID;