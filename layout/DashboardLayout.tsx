import { Container, Flex, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import { useMemo } from "react";
import DrawerMenu from "./DrawerMenu";
import Footer from "./Footer";
import Header from "./Header";
//import { MdChevronRight } from "react-icons/md";

export interface DashboardLayoutProps {
  children: any;
  title: string;
  namePage: string;
  headerComponent: any;
}

const DashboardLayout = ({
  children,
  title,
  namePage,
  headerComponent,
}: DashboardLayoutProps) => {
  const headTitle = useMemo(() => {
    return title ? `${title} :: BEEMARK` : "BEEMARK";
  }, [title]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Flex flexDirection="column" justifyContent="space-between">
        <Header onOpen={onOpen} namePage={namePage}>
          {headerComponent}
        </Header>
        <DrawerMenu isOpen={isOpen} onClose={onClose} />
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          height="100vh"
        >
          <Container maxW="container.xl" mt="1.5rem" pt="63px" pb="3rem">
            {children}{" "}
          </Container>
          <Footer />
        </Flex>
      </Flex>
    </>
  );
};
export default DashboardLayout;
