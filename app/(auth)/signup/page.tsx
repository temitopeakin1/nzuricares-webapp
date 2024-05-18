import Signup from "@/Components/Signup";

export default function SignupRoute() {
  return <Signup onCancel={function (): void {
      throw new Error("Function not implemented.");
  } } />;
}
