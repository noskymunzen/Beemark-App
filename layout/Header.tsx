import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiLogOut, FiMoon, FiSettings } from "react-icons/fi";

export interface HeaderProps {
  btnRef: () => void;
  onOpen: () => void;
  namePage: string;
  children: any;
  onLogout: () => void;
  nameUser: string;
}

const Header = ({
  btnRef,
  onOpen,
  namePage = "Summary",
  children,
  onLogout,
  nameUser,
}: HeaderProps) => {
  return (
    <Flex
      minW="100vw"
      height="63px"
      bg="#0987A0"
      position="fixed"
      top="0px"
      zIndex="10"
      alignItems="center"
      justifyContent={{ base: "flex-start", md: "space-between" }}
    >
      <Link href="/">
        <Image
          display={{ base: "none", md: "block" }}
          mt="1px"
          height="60px"
          objectFit="contain"
          src="/beemark.png"
          minW="271px"
        />
        {/* <Text
          color="#F0F8FF"
          fontWeight="bold"
          ml="3rem"
          display={{ base: "none", md: "block" }}
          fontSize="20px"
          minW="271px"
        >
          BEEMARK
        </Text> */}
      </Link>
      <Icon
        ml="1.5rem"
        aria-label="Search database"
        display={{ base: "block", md: "none" }}
        as={HamburgerIcon}
        ref={btnRef}
        onClick={onOpen}
        bg="#0987A0"
        color="white"
        boxSize="20px"
      />
      {namePage && (
        <Flex justifyContent="center" width={{ base: "70vw", md: "700px" }}>
          <Text
            color="#F0F8FF"
            fontWeight="bold"
            ml="1.5rem"
            display={{ base: "block", md: "none" }}
            fontSize="20px"
          >
            {namePage}
          </Text>
        </Flex>
      )}
      {children}
      <Flex
        gap={5}
        minW="271px"
        mr="3rem"
        display={{ base: "none", md: "flex" }}
        justifyContent="flex-end"
      >
        <HStack>
          <Icon color="#F0F8FF" as={FiMoon} boxSize="20px" />
          <Switch colorScheme="teal" size="md" />
        </HStack>
        <Menu isLazy>
          <MenuButton
            as={Button}
            variant="outline"
            border="none"
            color="#F0F8FF"
            bg="#0987A0"
            _hover={{ bg: "#0987A0" }}
            _expanded={{ bg: "#0987A0" }}
            fontSize="18px"
            rightIcon={<ChevronDownIcon boxSize="22px" />}
          >
            Hello {nameUser}!
          </MenuButton>
          <MenuList>
            <Link href="settings">
              <MenuItem>
                <HStack>
                  <Icon as={FiSettings} />
                  <Text>Settings</Text>
                </HStack>
              </MenuItem>
            </Link>
            <MenuItem onClick={() => onLogout()}>
              <HStack>
                <Icon as={FiLogOut} />
                <Text>Logout</Text>
              </HStack>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
