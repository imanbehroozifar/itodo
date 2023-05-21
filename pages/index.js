import HomaePage from "@/components/templates/HomaePage/HomaePage";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <HomaePage/>
  )
}
export async function getServerSideProps({ req }) {
  const session = await getSession({req})
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent:false
       }
     }
  }
  return {
    props:{session}
  }
}
