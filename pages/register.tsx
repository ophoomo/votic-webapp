import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useRef, useState, KeyboardEvent } from 'react';
import Swal from 'sweetalert2';
import MainLayout from '../layouts/main';
import { Member } from '../services/member';

const Login: NextPage = () => {

    interface DataStruct {
        username: string
        password: string
        firstname: string
        lastname: string
        gender: string
    }

    const router = useRouter();

    const Data = useRef<DataStruct>({
        username:  '',
        password: '',
        firstname: '',
        lastname: '',
        gender: '',
    })

    const [Error, setError] = useState({
        username: false,
        password: false,
        firstname: false,
        lastname: false,
        gender: false
    });

    const validateEmail = (email : string) => {
        return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const IsNotEmpty = (id: string, value : string) : boolean => {
        if(value != '') {
            setError(prevState => ({...prevState, [id]:false}));
            return true;
        }
        setError(prevState => ({...prevState, [id]:true}));
        (document.getElementById(id) as HTMLInputElement).focus();
        return false;
    }

    const IsNotEmptySelect = (id: string, value : string) : boolean => {
        if(value != '') {
            setError(prevState => ({...prevState, [id]:false}));
            return true;
        }
        setError(prevState => ({...prevState, [id]:true}));
        (document.getElementById(id) as HTMLSelectElement).focus();
        return false;
    }

    const IsEmail = (id : string, value: string) : boolean => {
        if (IsNotEmpty(id, value)) {
            if(validateEmail(value)) {
                setError(prevState => ({...prevState, [id]:false}));
                return true;
            }
        }
        setError(prevState => ({...prevState, [id]:true}));
        (document.getElementById(id) as HTMLInputElement).focus();
        return false;
    }

    const IsMore10 = (id : string, value : string) : boolean => {
        if (IsNotEmpty(id, value)) {
            if(value.length >= 10) {
                setError(prevState => ({...prevState, [id]:false}));
                return true;
            }
        }
        setError(prevState => ({...prevState, [id]:true}));
        (document.getElementById(id) as HTMLInputElement).focus();
        return false;
    }


    const onSubmit = () : void => {
        if(
            IsEmail('username', Data.current.username) &&
            IsMore10('password', Data.current.password) &&
            IsNotEmpty('firstname', Data.current.firstname) &&
            IsNotEmpty('lastname', Data.current.lastname) &&
            IsNotEmptySelect('gender', Data.current.gender)
        ) {
            Swal.fire({
                icon: 'warning',
                title: 'คำเตือน',
                text: 'คุณต้องการที่จะ สมัครสมาชิก ใช่ หรือ ไม่?',
                timer: 10000,
                showConfirmButton: true,
                showCancelButton: true,
                cancelButtonText: 'ไม่',
                confirmButtonText: 'ใช่',
            }).then(result => {
                if(result.isConfirmed) {
                    const member = new Member();
                    member.create(Data.current).then(res => {
                        Swal.fire({
                            icon: res.data.status ? 'success' : 'warning',
                            title: res.data.status ? 'สำเร็จ' : 'คำเตือน',
                            text: res.data.message,
                        }).then(() => {
                            if(res.data.status) {
                                router.push('/login');
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

    const onInputData = (event : ChangeEvent<HTMLInputElement>) => {
        Data.current = {...Data.current, [event.target.id]:event.target.value};
    }

    const onSelectData = (event: ChangeEvent<HTMLSelectElement>) => {
        Data.current = {...Data.current, [event.target.id]:event.target.value};
    }

    const onEnter = (event : KeyboardEvent<HTMLElement>) => {
        event.key === 'Enter' && onSubmit();
    }

    const IsError = (status : boolean) : string => {
        return status ? 'is-danger' : '';
    }

    return (
    <MainLayout>
        <div className='is-flex is-justify-content-center is-align-items-center' style={{height: '100vh'}}>
            <div className="card" style={{width: '300px'}}>
                <div className="card-content">
                    <div className='mb-2'>
                        <label className='label' htmlFor="username">ชื่อผู้ใช้งาน</label>
                        <input onKeyDown={onEnter} onChange={onInputData} id="username" type="text" autoFocus
                         placeholder='อีเมลของท่าน' className={`input ${IsError(Error.username)}`} />
                    </div>
                    <div className='mb-2'>
                        <label className='label' htmlFor="password">รหัสผ่าน</label>
                        <input onKeyDown={onEnter} onChange={onInputData} id="password" type="password"
                         placeholder='รหัสผ่านจำนวน 10 ตีวขึ้นไป' className={`input ${IsError(Error.password)}`} />
                    </div>
                    <div className='mb-2'>
                        <label className='label' htmlFor="firstname">ชื่อจริง</label>
                        <input onKeyDown={onEnter} onChange={onInputData} id="firstname" type="firstname"
                         placeholder='ชื่อจริง' className={`input ${IsError(Error.firstname)}`} />
                    </div>
                    <div className='mb-2'>
                        <label className='label' htmlFor="lastname">นามสกุล</label>
                        <input onKeyDown={onEnter} onChange={onInputData} id="lastname" type="lastname"
                         placeholder='นามสกุล' className={`input ${IsError(Error.lastname)}`} />
                    </div>
                    <div className='mb-2'>
                        <label className='label' htmlFor="gender">เพศ</label>
                        <select id="gender" onChange={onSelectData} defaultValue='' className={`input ${IsError(Error.gender)}`}>
                            <option disabled value="">เลือกเพศ</option>
                            <option value="1">ชาย</option>
                            <option value="0">หญิง</option>
                        </select>
                    </div>
                    <button onClick={() => onSubmit()} className="button mb-1 is-success is-fullwidth">ยืนยัน</button>
                    <Link href={'/login'}>
                        <button className="button is-success is-outlined is-fullwidth">กลับ</button>
                    </Link>
                </div>
            </div>
        </div>
    </MainLayout>
    );
}


export default Login;