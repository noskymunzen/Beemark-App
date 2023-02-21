import { Container, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useMemo } from "react";
import DrawerMenu from "./DrawerMenu";
import Footer from "./Footer";
import Header from "./Header";

export interface DashboardLayoutProps {
  children: any;
  title: string;
  namePage: string;
  headerComponent?: ReactNode;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  user: string;
}

const DashboardLayout = ({
  children,
  title,
  namePage,
  user,
  headerComponent,
  onOpen,
  onClose,
  isOpen,
}: DashboardLayoutProps) => {
  const headTitle = useMemo(
    () => (title ? `${title} :: BEEMARK` : "BEEMARK"),
    [title]
  );

  const router = useRouter();

  const onLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Flex flexDirection="column" justifyContent="space-between">
        <Header
          onOpen={onOpen}
          namePage={namePage}
          onLogout={onLogout}
          nameUser={user}
          btnRef={() => {}}
        >
          {headerComponent}
        </Header>
        <DrawerMenu isOpen={isOpen} onClose={onClose} onLogout={onLogout} />
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          height="100vh"
        >
          <Container maxW="container.xl" mt="1.5rem" pt="63px" pb="3rem">
            {children}
          </Container>
          <Footer />
        </Flex>
      </Flex>
    </>
  );
};
export default DashboardLayout;
