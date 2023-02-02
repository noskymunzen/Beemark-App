import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiLogOut, FiMoon, FiSettings, FiUser } from "react-icons/fi";

export interface HeaderProps {
  btnRef: () => void;
  onOpen: () => void;
  namePage: string;
  userName: string;
  // nameSection: string;
  // onClickHome: () => void;
  // onClickHabits: () => void;
}

const Header = ({
  btnRef,
  onOpen,
  namePage = "Summary",
  userName = "Ninoska",
}: // Ninoska
// onClickHabits,
// nameSection,
HeaderProps) => {
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
        <Text
          color="#F0F8FF"
          fontWeight="bold"
          ml="3rem"
          display={{ base: "none", md: "block" }}
          fontSize="20px"
          minW="271px"
        >
          BEEMARK
        </Text>
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
      <Flex
        gap={10}
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
          <MenuButton>
            <HStack>
              <Icon color="#F0F8FF" as={FiUser} boxSize="20px" />
              <Text color="#F0F8FF">Hello {userName}!</Text>
            </HStack>
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
            <MenuItem>
              <Link href="/">
                <HStack>
                  <Icon as={FiLogOut} />
                  <Text>Logout</Text>
                </HStack>
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
