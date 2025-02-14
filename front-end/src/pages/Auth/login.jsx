import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import GoogleIcon from '../../assets/icons/google.svg';
import { Input } from 'antd';
import Logo from '../../assets/images/logo.png';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

function Login() {
    const { handleChangeValue, handleLoginGoogle, handleLogin, loading } = useContext(AuthContext);
    const [show, setShow] = useState(false);

    const handleToggle = () => {
        setShow(!show);
    };

    return (
        <div className='h-screen'>
            <div className="w-full flex justify-center items-center font-helveticeFont mt-12">
                <div className="flex flex-col border border-[#dedddc] rounded-xl bg-white shadow-xl py-10 px-9 mb-5 lg:w-1/3 sm:w-2/3 w-11/12">
                    <div className='p-4 mx-auto flex flex-row items-center'>
                        <img src={Logo} alt="MailDK" className='size-20 rounded-lg mr-3' />
                        <span className='font-georgiaFont text-[36px] font-medium mb-3 my-auto'>Log in</span>
                    </div>
                    <div className='text-base'>
                        <div className="flex flex-col">
                            <span className='font-semibold mb-2'>Email</span>
                            <Input
                                className='focus:border-[#007c89] hover:border-[#007c89] h-10'
                                name='email'
                                onChange={(e) => handleChangeValue(e)}
                            />
                        </div>

                        <div className="flex flex-col mt-4">
                            <div className="flex justify-between">
                                <span className='font-semibold mb-2'>Password</span>
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
                            <Input
                                type={show ? "text" : "password"}
                                className='focus:border-[#007c89] hover:border-[#007c89] h-10'
                                name='password'
                                onChange={e => handleChangeValue(e)}
                            />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <button
                                className="mx-auto w-40 bg-gradient-to-r from-[#2f2930] to-[#007c89] rounded-full text-white py-3 px-6 hover:from-[#009ba6] hover:to-[#007c89] shadow-lg transdiv hover:scale-105 transition-all duration-300 uppercase font-semibold tracking-widest"
                                onClick={() => handleLogin()}
                            >
                                Log in
                                {loading && <Spin className='mx-2' indicator={<LoadingOutlined spin />} />}
                            </button>
                            <div className="flex flex-row justify-between items-center pt-4 pb-2">
                                <span className='text-[13px] leading-6'><Link to="/register" className='underline underline-offset-2'>Create an account?</Link></span>
                                <Link to="/reset-password" className='text-xs underline underline-offset-2 text-[#007c89] text-right'>Forgot account?</Link>
                            </div>
                        </div>
                        <hr className='my-2' />
                        <span className='text-[13px]'>Or, Create your account with Google</span>
                        <button onClick={() => handleLoginGoogle()} className="w-full flex items-center border border-[#6c6864] rounded-full p-2 mt-2 hover:brightness-125" type="submit">
                            <img src={GoogleIcon} alt="Google" className='w-6 h-6 mr-2' />
                            <span className='flex-1 text-center'>Continue with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;