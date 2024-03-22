"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

const Links = ["Home", "Books", "My Library", "Profile"];

const NavLink = (props) => {
  const { children } = props;

  const router = useRouter();
  const routing = (key) => {
    let route = "";
    switch (key) {
      case "Home":
        route = "/";
        break;
      case "Books":
        route = "/books";
        break;
      case "My Library":
        route = "/mylibrary";
        break;
      case "Profile":
        route = "/profile";
        break;
      case "Cart":
        route = "/cart";
        break;
    }
    router.push(route);
  };

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
        cursor: "pointer",
      }}
      onClick={() => routing(children)}
    >
      {children}
    </Box>
  );
};

export default function NavBar(props) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const handleLogout = () => {
    signOut();
  };

  const handleSignIn = () => {
    signIn();
  };

  return (
    <>
      {console.log(session)}
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Box p="2">
              <NavLink>Cart</NavLink>
            </Box>
            <Box p="2">
              {session ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={`${session.user.image}`} />
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => router.push("/orders")}>
                      Your Orders
                    </MenuItem>
                    <MenuItem onClick={() => router.push("/wishlist")}>
                      Your WishList
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>LogOut</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Button
                    as={"a"}
                    fontSize={"sm"}
                    fontWeight={400}
                    variant={"link"}
                    href={"#"}
                    onClick={handleSignIn}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </Box>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link} onClick={() => routing(link)}>
                  {link}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}> {props.children}</Box>
    </>
  );
}
