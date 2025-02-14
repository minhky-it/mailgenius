import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import { Input } from 'antd';
import Logo from '../../assets/images/logo.png';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function ChangePassword() {
    const { handleChangeValue, handleChangePW, changePWErrorMessage } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
    };
    return (
        <div className='h-screen'>
            <div className="w-full flex justify-center items-center font-helveticeFont mt-12">
                <div className="flex flex-col border border-[#dedddc] rounded-xl bg-white shadow-xl py-10 px-9 mb-5 lg:w-1/3 sm:w-2/3 w-11/12">
                    <div className='p-2 mx-auto'>
                        <img src={Logo} alt="MailDK" className='size-16 rounded-lg' />
                    </div>
                    <span className='font-georgiaFont text-3xl font-medium mt-3 mb-6'>Change a new password</span>
                    <div className='text-base'>
                        <div className="flex flex-col mt-4">
                            <div className="flex justify-between">
                                <span className='font-semibold'>New password</span>
                                <div onClick={() => handleToggle()} className='flex text-[#007c89] font-semibold mb-2 hover:brightness-125 cursor-pointer'>
                                    {show ? (
                                        <>
                                            <EyeClosedIcon className="h-full" />
                                            <span className='ml-2'>Hide</span>
                                        </>
                                    ) : (
                                        <>
                                            <EyeOpenIcon className="h-full" />
                                            <span className='ml-2'>Show</span>
                                        </>
                                    )}
                                </div>
                            </div>
                            <Input type={show ? "text" : "password"} className='focus:border-[#007c89] hover:border-[#007c89] h-10' name='password' onChange={e => handleChangeValue(e)} />
                        </div>

                        <div className="flex flex-col mt-4">
                            <div className="flex justify-between">
                                <span className='font-semibold mb-2'>Confirm password</span>
                            </div>
                            <Input type={show ? "text" : "password"} className='focus:border-[#007c89] hover:border-[#007c89] h-10' name='confirm_password' onChange={e => handleChangeValue(e)} />
                        </div>
                        {changePWErrorMessage && <span className="text-red-500 text-xs mt-1">{changePWErrorMessage}</span>}
                        <div className='flex justify-between mt-7'>
                            <button className="text-sm w-56 bg-gradient-to-r from-[#009993] to-[#007c89] rounded-full text-white py-3 px-6 hover:from-[#009ba6] hover:to-[#007c89] shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold tracking-widest"
                                onClick={() => handleChangePW()} >
                                Change Password
                            </button>
                            <div className="flex flex-row justify-between items-center pt-4">
                                <span className='text-[13px]'>
                                    <Link to={'/login'} className='text-[#007c89] underline underline-offset-2'>Return to login</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;