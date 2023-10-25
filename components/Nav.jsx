'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

function Nav() {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProviders();
  });
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href={'/'} className='flex gap-2 flex-center'>
        <Image
          src={'/assets/images/logo.svg'}
          width={30}
          height={30}
          alt='Promptia
          Logo'
        />
        <p className='logo_text'>Promptia</p>
      </Link>

      {/* Mobile Navigation */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href={'/create-prompt'} className='black_btn'>
              Create Prompt
            </Link>

            <button className='outline_btn' onClick={signOut}>
              Sign Out
            </button>
            <Link href={'/profile'}>
              <Image
                src={'/assets/images/logo.svg'}
                width={37}
                height={37}
                alt='profile image'
                className='rounded-full'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={providers.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
          <div className='flex'>
            <Image
              src={'/assets/images/logo.svg'}
              width={37}
              height={37}
              alt='profile image'
              className='rounded-full'
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
          </div>
        ) : (
          <>
            {providers &
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={providers.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
