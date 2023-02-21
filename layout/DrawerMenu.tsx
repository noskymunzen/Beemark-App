import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef } from "react";
import { FiHome, FiLogOut, FiMoon, FiSettings } from "react-icons/fi";

export interface DrawerProps {
  onClose: () => void;
  isOpen: boolean;
  onLogout: () => void;
}

const DrawerMenu = ({ isOpen, onClose, onLogout }: DrawerProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay></DrawerOverlay>

      <DrawerContent maxWidth="70px">
        <Flex bg="#0987A0" height="63px" width="100%" alignItems="center">
          <Image
            src="/logo.png"
            objectFit="contain"
            height="40px"
            width="100%"
          />
        </Flex>

        <DrawerBody pt="0">
          <Icon
            left="60px"
            top="1.2rem"
            boxSize="25px"
            position="absolute"
            ml="1rem"
            aria-label="Search database"
            display={{ base: "block", md: "none" }}
            as={ArrowBackIcon}
            color="gray.300"
            onClick={onClose}
          />

          <Flex
            flexDirection="column"
            gap="2rem"
            justifyContent="space-between"
            height="100%"
            py="1rem"
          >
            <Link href="/">
              <Icon width="20px" height="20px" as={FiHome} />
            </Link>

            <Flex flexDirection="column" gap="2rem">
              <Icon width="20px" height="20px" as={FiMoon} />
              <Link href="/settings">
                <Icon width="20px" height="20px" as={FiSettings} />
              </Link>

              <Icon
                width="20px"
                height="20px"
                as={FiLogOut}
                onClick={onLogout}
              />
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
