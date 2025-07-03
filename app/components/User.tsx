'use client';

import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import { FiUser } from 'react-icons/fi';

const User = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="">
      {isSignedIn ? (
        // Signed in: show Clerk's UserButton (dropdown) but styled like your icon
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-6 w-6", // size like your FiUser icon
            },
          }}
        />
      ) : (
        // Not signed in: show your FiUser icon button wrapped in SignInButton
        <SignInButton mode="modal">
          <button className="text-dark hover:text-primary transition">
            <FiUser className="h-6 w-6" />
          </button>
        </SignInButton>
      )}
    </div>
  );
};

export default User;
