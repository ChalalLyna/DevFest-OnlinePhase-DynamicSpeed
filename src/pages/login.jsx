import React, {useState, useEffect} from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function login() {

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const [loginStatus, setLoginStatus] = useState('');
const [statusHolder, setStatusHolder] = useState('');

  const createUser = (e)=>{
    e.preventDefault();
    setLoginStatus('');

    if (email==='' || password==='') {
      setLoginStatus("Informations manquantes");
      return;
    }
    
    if (!validateEmail(email)) {
      setLoginStatus("Format de l'email incorrect");
      return;
    }
   
}
useEffect(() => {
  if (loginStatus !== '') {
    setStatusHolder('showMessage');
    setTimeout(() => {
      setStatusHolder('message');
    }, 4000);
  }
}, [loginStatus])

  return (
    <div className='bg-[#EEEEEE]'>
      {/* This example requires updating your template:
      <html class="h-full bg-white">
      <body class="h-full"> */}

      <div className="flex min-h-full flex-1 flex-col justify-center pt-16 px-6 pb-12 lg:px-8 bg-[#EEEEEE]">
        
        {/* Wrap the desired section with a div and apply background color */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm bg-[#E0E0E2] py-12 px-12 rounded-3xl ">
            <div >
          <h1 className='text-[#A2A1A6]'>Sign In</h1> <br />
          <p className='text-[#1D1C24]'>welcome again! please enter your details</p>
          
        </div>
          <form className="space-y-6 mt-12" action="#" method="POST">
            <div>
            <span className={statusHolder}>{loginStatus}</span>

              <label htmlFor="email" className="block text-white text-sm font-medium leading-6 ">
                Email Adress
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  onChange={(event) =>{
                    setEmail(event.target.value)
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold hover:text-[#FE7A36] text-white">
                  Forgot password ?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#3652AD] sm:text-sm sm:leading-6"
                  onChange={(event) =>{
                    setPassword(event.target.value)
                  }}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-full bg-[#3EA0A3] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#f7854c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                onClick={createUser}
              >
                Continue
              </button>
              <br />
              
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
