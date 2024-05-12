import { PageView } from "@/components";
import { SessionStorageItems } from "@/utils/enums/session-storage";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isLogged =
      window.sessionStorage.getItem(SessionStorageItems.LOGGED) === "true";
    if (!isLogged) router.push("/login");
  }, []);

  return (
    <PageView>
      <div>
        <h1>Bem vindo</h1>
      </div>
    </PageView>
  );
}
