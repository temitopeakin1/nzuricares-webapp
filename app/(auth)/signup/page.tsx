import Signup from "@/Components/Signup";

export default function SignupRoute() {
  return <Signup onSignUpSuccess={function (isSuccess: boolean): void {
      throw new Error("Function not implemented.");
  } } onCancel={function (): void {
      throw new Error("Function not implemented.");
  } } />;
}
