'use client'
import { useSession } from 'next-auth/react';

const DashBoardPage = () => {
  // const {data : session, status} = useSession();

  // if (status === 'loading') {
  //   return <div>Loading...</div>;
  // }
  console.log("Session : ",session)

  // if (session) {
  //   // User is authenticated, session contains user data
  //   return <div>Welcome, {session.user.name}</div>;
  // } else {
  //   // User is not authenticated
  //   return <div>Please log in</div>;
  // }
  return (
    <div>Dashboar Page</div>
  )
}

export default DashBoardPage;