import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef } from "react";
import { FiHome, FiLogOut, FiMoon, FiSettings } from "react-icons/fi";

export interface DrawerProps {
  onClose: () => void;
  isOpen: boolean;
}

const DrawerMenu = ({ isOpen, onClose }: DrawerProps) => {
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
        <DrawerBody>
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
            <Link href="/home">
              <Icon width="20px" height="20px" as={FiHome} />
            </Link>

            <Flex flexDirection="column" gap="2rem">
              <Icon width="20px" height="20px" as={FiMoon} />
              <Link href="/settings">
                <Icon width="20px" height="20px" as={FiSettings} />
              </Link>
              <Link href="/logout">
                <Icon width="20px" height="20px" as={FiLogOut} />
              </Link>
            </Flex>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerMenu;
