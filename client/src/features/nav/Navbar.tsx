import React, {useContext} from "react";
import storeContext from "../../application/store/store";
import {observer} from "mobx-react-lite";
import {Box, HStack, Spacer, Container, Menu, MenuButton, MenuList, MenuItem, Image} from "@chakra-ui/react";
import {NavLink, Link} from "react-router-dom";
import {history} from "../../index";
import {ChevronDownIcon} from "@chakra-ui/icons";
import Loader from "../../application/layout/Spinner";

const Navbar = () => {
  const {user} = useContext(storeContext);
  if(!user) return <Loader />;
  return (
    <header className="nav">
      <Container maxW="container.lg">
    <nav className="navbar">
           <HStack>
             <Box>
               <h1 className="auth__header">Hemidall Library</h1>
             </Box>
             <Spacer />
             <HStack spacing="30px">
              <NavLink to="/borrowed">My borrowed books</NavLink>
              <Box>
                <Menu size="large" isLazy={true} >
                  <MenuButton as={Box} >
                    <HStack spacing="5px">
                      <Image src={user!.avatar} alt="user_avatar" borderRadius="full" boxSize="40px" />
                      <ChevronDownIcon boxSize={8} />
                    </HStack>
                  </MenuButton>
                  <MenuList style={{zIndex: 200}}  minWidth="180px" className="nav__auth__box">
                    <MenuItem onClick={() => history.push("/profile")}>My borrowed books</MenuItem>
                    <MenuItem onClick={() => alert("logout not implemented")}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
             </HStack>
           </HStack>
    </nav>
      </Container>
    </header>
  )
}

export default observer(Navbar);
