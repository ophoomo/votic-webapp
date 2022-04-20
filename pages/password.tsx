import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import MainLayout from '../layouts/main';
import { Member } from '../services/member';

const Password: NextPage = () => {

    interface DataStruct {
        passwordold: string
        passwordnew: string
        passwordConfirm: string
    }

    const Data = useRef<DataStruct>({
        passwordold: '',
        passwordnew: '',
        passwordConfirm: '',
    });

    const [Error, setError] = useState({
        passwordold: false,
        passwordnew: false,
        passwordConfirm: false
    });

    const router = useRouter();

    const onInputData = (event : ChangeEvent<HTMLInputElement>) => {
        Data.current = {...Data.current, [event.target.id]:event.target.value};
    }

    const onEnter = (event : KeyboardEvent<HTMLElement>) => {
        event.key === 'Enter' && onSubmit();
    }

    const IsError = (status : boolean) : string => {
        return status ? 'is-danger' : '';
    }

    const onSubmit = () => {
        if (
            IsMoreThenTen('passwordold', Data.current.passwordold) &&
            IsMoreThenTen('passwordnew', Data.current.passwordnew) &&
            IsConfirmPassword('passwordConfirm', Data.current.passwordConfirm)
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'คำเตือน',
                text: 'คุณต้องการที่จะ เปลื่ยนรหัสผ่าน ใช่ หรือ ไม่?',
                timer: 10000,
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonText: 'ไม่',
                confirmButtonText: 'ใช่',
            }).then(result => {
                if (result.isConfirmed) {
                    const member = new Member();
                    member.password(Data.current.passwordold, Data.current.passwordConfirm).then(res => {
                        Swal.fire({
                            icon: res.data.status ? 'success' : 'warning',
                            title: res.data.status ? 'สำเร็จ' : 'คำเตือน',
                            text: res.data.message,
                        }).then(result => {
                            if (result.isConfirmed) {
                                if (res.data.status) {
                                    localStorage.removeItem('token');
                                    router.push('/login');
                                }
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

    const IsConfirmPassword = (id: string, value: string) : boolean => {
        if (IsMoreThenTen(id, value)) {
            if(value === Data.current.passwordnew) {
                setError(prevState => ({...prevState, [id]:false}));
                return true;
            }
        }
        setError(prevState => ({...prevState, [id]:true}));
        (document.getElementById(id) as HTMLInputElement).focus();
        return false;
    }

    const IsMoreThenTen = (id : string, value: string) : boolean => {
        if(IsNotEmpty(id, value)) {
            if(value.length >= 10) {
                setError(prevState => ({...prevState, [id]:false}));
                return true;
            }
        }
        setError(prevState => ({...prevState, [id]:true}));
        (document.getElementById(id) as HTMLInputElement).focus();
        return false;
    }

    const IsNotEmpty = (id: string, value : string) : boolean => {
        if(value != '') {
            setError(prevState => ({...prevState, [id]:false}));
            return true;
        }
        setError(prevState => ({...prevState, [id]:true}));
        (document.getElementById(id) as HTMLInputElement).focus();
        return false;
    }

    return (
    <MainLayout> 
        <Navbar />
        <div className='is-flex is-justify-content-center is-align-items-center' style={{height: '100vh'}}>
            <div className="card" style={{width: '400px'}}>
                <div className="card-content">
                    <h1 className='title is-1 has-text-centered mb-5 mt-5'>เปลื่ยนรหัสผ่าน</h1>
                    <div className='mb-2'>
                        <label className='label' htmlFor="passwordold">รหัสผ่านเดิม</label>
                        <input onKeyDown={onEnter} onChange={onInputData} id="passwordold" autoFocus type="password"
                         placeholder='รหัสผ่านเดิมของท่าน'
                         className={`input ${IsError(Error.passwordold)}`} />
                    </div>
                    <div className='mb-2'>
                        <label className='label' htmlFor="passwordnew">รหัสผ่านใหม่</label>
                        <input onKeyDown={onEnter} onChange={onInputData} id="passwordnew" type="password"
                         placeholder='รหัสผ่านใหม่ของท่าน'
                         className={`input ${IsError(Error.passwordnew)}`} />
                    </div>
                    <div className='mb-2'>
                        <label className='label' htmlFor="passwordConfirm">ยืนยันรหัสผ่าน</label>
                        <input onKeyDown={onEnter} onChange={onInputData} id="passwordConfirm" type="password"
                         placeholder='รหัสผ่านต้องตรงกับรหัสผ่านใหม่'
                         className={`input ${IsError(Error.passwordConfirm)}`} />
                    </div>
                    <button onClick={() => onSubmit()} className='button is-success is-fullwidth mt-5'>ยืนยัน</button>
                </div>
            </div>
        </div>
    </MainLayout>
    );
}


export default Password;

