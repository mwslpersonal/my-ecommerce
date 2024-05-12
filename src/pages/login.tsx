import { SessionStorageItems } from "@/utils/enums/session-storage";
import { Button, ButtonGroup, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onClick = () => {
    window.sessionStorage.setItem(SessionStorageItems.LOGGED, "true");
    router.push("/");
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="shadow-lg w-1/3 rounded self-center">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex justify-center text-3xl pb-8 font-bold text-slate-600">
            <p>Bem vindo</p>
          </div>
          <div className="pb-8">
            <Input
              placeholder="Email"
              onChange={(ev) => setEmail(ev.target.value)}
            />
          </div>
          <div className="pb-8">
            <Input
              placeholder="Senha"
              type="password"
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>

          <div className="flex justify-center pb-8">
            <Button
              colorScheme="blue"
              onClick={onClick}
              isDisabled={!email || !password}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
