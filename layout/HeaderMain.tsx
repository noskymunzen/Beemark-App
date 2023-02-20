import { Button, Divider, Flex, Image } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";

interface HeaderMainProps {
  formShowed: string;
  isPageResetPass: boolean;
  title: string;
}

const HeaderMain = ({
  formShowed,
  isPageResetPass,
  title,
}: HeaderMainProps) => {
  const headTitle = useMemo(() => {
    return title ? ` BEEMARK :: ${title} ` : "BEEMARK";
  }, [title]);

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <Flex
        minW="100vw"
        height="63px"
        bg="#0987A0"
        top="0px"
        zIndex="10"
        alignItems="center"
        justifyContent={{ base: "center", md: "space-between" }}
      >
        <Image
          mt="1px"
          height={{ base: "55px", md: "60px" }}
          objectFit="contain"
          src="/beemark.png"
          minW="271px"
        />

        {!isPageResetPass && (
          <Flex
            gap={5}
            mr={{ base: "1rem", md: "3rem" }}
            alignItems="center"
            display={{ base: "none", md: "flex" }}
          >
            <Link href="/auth/login">
              <Button
                variant="link"
                color={formShowed === "login" ? "#2D3748" : "#F0F8FF"}
                fontWeight="bold"
              >
                Log in
              </Button>
            </Link>
            <Divider orientation="vertical" height="20px" colorScheme="gray" />
            <Link href="/auth/signup">
              <Button
                variant="link"
                color={formShowed === "signup" ? "#2D3748" : "#F0F8FF"}
                fontWeight="bold"
              >
                Sign up
              </Button>
            </Link>
          </Flex>
        )}
      </Flex>
    </>
  );
};
export default HeaderMain;
