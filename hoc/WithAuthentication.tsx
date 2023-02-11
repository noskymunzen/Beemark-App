import { useRouter } from "next/router";
import { FC, PropsWithChildren, useEffect, useState } from "react";

const WithAuthentication: FC<PropsWithChildren> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    setAuthenticated(true);
  }, []);
  return authenticated ? <>{children}</> : <></>;
};

export default WithAuthentication;
