import Signup from "@/Components/Signup";
import { useRouter } from "next/router";



export default function SignupRoute() {
    const router = useRouter()
  return <Signup onSignUpSuccess={function (isSuccess: boolean): void {
      throw new Error("Function not implemented.");
  } } onCancel={function (): void {
      throw new Error("Function not implemented.");
  } } />;
}
