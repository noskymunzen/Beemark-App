import BookmarkCards from "@/components/BookmarkCards";
import BookmarkModal from "@/components/BookmarkModal";
import DashboardLayout from "@/layout/DashboardLayout";
import { AddIcon } from "@chakra-ui/icons";
import { Button, Container, IconButton, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

export default function Home() {
  const [newValues, setNewValues] = useState({
    url: "",
    title: "",
    excerpt: "",
    tags: [],
  });
  const [currentValues, setCurrentValues] = useState({
    url: "https://chakra-ui.com/og-image.png",
    title: "chakra UI",
    excerpt:
      "Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.",
    tags: ["framework ui", "development", "learning"],
  });
  const [copyCurrentValues, setCopyCurrentValues] = useState({});

  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const addInTags = (value, typeValues) => {
    if (value === "") return;
    if (typeValues === "newValues") {
      setNewValues({
        ...newValues,
        tags: [...new Set([...newValues.tags, value])],
      });
      return;
    }
    setCurrentValues({
      ...currentValues,
      tags: [...new Set([...currentValues.tags, value])],
    });
  };

  const removeInTags = (value, typeValues) => {
    if (typeValues === "newValues") {
      setNewValues({
        ...newValues,
        tags: [...newValues.tags].filter((tag) => tag !== value),
      });
      return;
    }
    setCurrentValues({
      ...currentValues,
      tags: [...currentValues.tags].filter((tag) => tag !== value),
    });
  };

  const revertValues = () => {
    setCurrentValues(copyCurrentValues);
  };

  // useEffect(() => {
  //   console.log(newValues);
  // }, [newValues]);
  // useEffect(() => {
  //   console.log(currentValues);
  // }, [currentValues]);
  useEffect(() => {
    setCopyCurrentValues(currentValues);
    console.log(copyCurrentValues);
  }, []);
  // useEffect(() => {
  //   console.log(copyCurrentValues);
  // }, [currentValues]);

  return (
    <>
      <DashboardLayout title="" namePage="BEEMARK">
        <Container maxW="container.xl" display="flex" justifyContent="flex-end">
          <Button
            rightIcon={<AddIcon />}
            bg="#0987A0"
            _hover={{ bg: "#086F83" }}
            color="white"
            onClick={onOpenAdd}
            display={{ base: "none", md: "flex" }}
          >
            Bookmark{" "}
          </Button>
        </Container>

        <IconButton
          display={{ base: "flex", md: "none" }}
          zIndex={!isOpenAdd ? "99999" : "0"}
          position="fixed"
          right="2rem"
          bottom="5%"
          aria-label="Add habit"
          bg="#0987A0"
          _hover={{ bg: "#086F83" }}
          color="white"
          height="50px"
          width="50px"
          borderRadius="40px"
          onClick={onOpenAdd}
          icon={<AddIcon />}
        />
        <IconButton
          variant="link"
          aria-label="Add habit"
          display={{ base: "flex", md: "none" }}
          position="absolute"
          top={{ base: "20px", md: "22px" }}
          right={{ base: "15px", md: "230px" }}
          zIndex="10"
          color="white"
          bg="#0987A0"
          icon={<FiMoreVertical />}
          fontSize="20px"
        />
        <BookmarkModal
          title="Create a Bookmark"
          defaultValues={null}
          newValues={newValues}
          setNewValues={setNewValues}
          addInTags={addInTags}
          removeInTags={removeInTags}
          isOpen={isOpenAdd}
          onClose={onCloseAdd}
          tags={newValues.tags}
          typeValues="newValues"
          revertValues={null}
          currentValues={null}
          setCurrentValues={null}
        />
        <BookmarkCards onOpen={onOpenEdit} />
        <BookmarkModal
          title="Edit Bookmark"
          defaultValues={currentValues}
          currentValues={currentValues}
          setCurrentValues={setCurrentValues}
          addInTags={addInTags}
          removeInTags={removeInTags}
          isOpen={isOpenEdit}
          onClose={onCloseEdit}
          tags={currentValues.tags}
          typeValues="currentValues"
          revertValues={revertValues}
          newValues={null}
          setNewValues={null}
        />
      </DashboardLayout>
    </>
  );
}
