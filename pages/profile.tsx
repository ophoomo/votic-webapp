import type { NextPage } from 'next'
import { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import MainLayout from '../layouts/main';
import { getAuthState } from '../redux/Selectors';
import { AuthState } from '../redux/types/authType';
import { Member } from '../services/member';

const Profile: NextPage = () => {

   interface DataStruct {
        firstname: string
        lastname: string
        gender: string
    }

    const Data = useRef<DataStruct>({
        firstname: '',
        lastname: '',
        gender: '',
    });

    const [Error, setError] = useState({
        firstname: false,
        lastname: false,
        gender: false
    });

    const authStore: AuthState = useSelector(getAuthState);

    const onInputData = (event : ChangeEvent<HTMLInputElement>) => {
        Data.current = {...Data.current, [event.target.id]:event.target.value};
    }

    const onEnter = (event : KeyboardEvent<HTMLElement>) => {
        event.key === 'Enter' && onSubmit();
    }

    const IsError = (status : boolean) : string => {
        return status ? 'is-danger' : '';
    }

    const checkEdit = () : boolean => {
        const name = authStore.name.split(' ');
        if (
            Data.current.firstname !== name[0] ||
            Data.current.lastname !== name[1] ||
            Data.current.gender !== (authStore ? '1' : '0')
        ) {
            return true;
        }
        setError({
            firstname: true,
            lastname: true,
            gender: true,
        })
        return false;
    }

    const onSubmit = () : void => {
        if (
            IsNotEmpty('firstname', Data.current.firstname) &&
            IsNotEmpty('lastname', Data.current.lastname) &&
            IsNotEmpty('gender', Data.current.gender)
        ) {
            if (checkEdit()) {
                Swal.fire({
                    icon: 'warning',
                    title: '?????????????????????',
                    text: '????????????????????????????????????????????? ????????????????????????????????? ????????? ???????????? ??????????',
                    timer: 10000,
                    showConfirmButton: true,
                    showCancelButton: true,
                    cancelButtonText: '?????????',
                    confirmButtonText: '?????????',
                }).then(result => {
                    if (result.isConfirmed) {
                        const member = new Member();
                        member.update(Data.current.firstname, Data.current.lastname, Data.current.gender).then(res => {
                            Swal.fire({
                                icon: res.data.status ? 'success' : 'warning',
                                title: res.data.status ? '??????????????????' : '?????????????????????',
                                text: res.data.message,
                            }).then(result => {
                                if (result.isConfirmed) {
                                    if (res.data.status) {
                                        window.location.reload();
                                    }
                                }
                            });
                        }).catch(() => {
                            Swal.fire({
                                icon: 'error',
                                title: '??????????????????????????????????????????',
                                text: '???????????????????????????????????????????????????????????????????????????????????????',
                            });
                        });
                    }
                });
            }
        }
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

    const onSelectData = (event: ChangeEvent<HTMLSelectElement>) => {
        Data.current = {...Data.current, [event.target.id]:event.target.value};
    }

    useEffect(() => {
        const name = authStore.name.split(' ');
        Data.current.firstname = name[0];
        Data.current.lastname = name[1];
        Data.current.gender = authStore.gender ? '1' : '0';

        (document.getElementById('firstname') as HTMLInputElement).value = name[0];
        (document.getElementById('lastname') as HTMLInputElement).value = name[1];
        (document.getElementById('gender') as HTMLSelectElement).value = authStore.gender ? '1' : '0';
    }, []);

    return (
    <MainLayout> 
        <Navbar />
        <div className='is-flex is-justify-content-center is-align-items-center' style={{height: '100vh'}}>
            <div className="card" style={{width: '400px'}}>
                <div className="card-content">
                    <h1 className='title is-1 has-text-centered mb-5 mt-5'>???????????????????????????????????????</h1>
                    <div className='mb-2'>
                        <label className='label' htmlFor="firstname">????????????????????????</label>
                        <input onKeyDown={onEnter} onChange={onInputData} id="firstname" autoFocus type="text"
                         placeholder='?????????????????????????????????????????????'
                         className={`input ${IsError(Error.firstname)}`} />
                    </div>
                    <div className='mb-2'>
                        <label className='label' htmlFor="lastname">?????????????????????</label>
                        <input onKeyDown={onEnter} onChange={onInputData} id="lastname" type="text"
                         placeholder='??????????????????????????????????????????'
                         className={`input ${IsError(Error.lastname)}`} />
                    </div>
                    <div className='mb-2'>
                        <label className='label' htmlFor="gender">?????????</label>
                        <select id="gender" onChange={onSelectData} defaultValue='' className={`input ${IsError(Error.gender)}`}>
                            <option disabled value="">????????????????????????</option>
                            <option value="1">?????????</option>
                            <option value="0">????????????</option>
                        </select>
                    </div>
                    <button onClick={() => onSubmit()} className='button is-success is-fullwidth mt-5'>??????????????????</button>
                </div>
            </div>
        </div>
    </MainLayout>
    );
}


export default Profile;

