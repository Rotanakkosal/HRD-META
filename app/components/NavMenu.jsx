"use client"
import { useSession, signIn, signOut } from "next-auth/react";

function AuthButton() {
  // const { data: session } = useSession();
  // if (session) {
  //   return (
  //     <>
  //       {session?.user?.name} <b />
  //       <button onClick={() => signOut()} className="btn btn-primary">
  //         Sign out
  //       </button>
  //     </>
  //   );
  // }
  return (
    <div>
      Not Signed in <br />
      <button className="btn btn-primary" onClick={() => signIn()}>
        Sign In
      </button>
    </div>
  );
}

const NavMenu = () => {
  return (
    <div>
      <AuthButton />
    </div>
  );
};

export default NavMenu;
