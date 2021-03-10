import React, {useContext} from "react";
import storeContext from "../../application/store/store";
import {observer} from "mobx-react-lite";
import {Box, HStack, Spacer, Container, Menu, MenuButton, MenuList, MenuItem, Image} from "@chakra-ui/react";
import {NavLink, Link} from "react-router-dom";
import {history} from "../../index";

const Navbar = () => {
  const {user} = useContext(storeContext);
  return (
    <header className="nav">
      <Container>
    <nav className="navbar">
           <HStack>
             <Box>
               <h1>Hemidall Library</h1>
             </Box>
             <Spacer />
             <HStack spacing="10px">
              <NavLink to="/borrowed">My borrowed books</NavLink>
              <Box>
                <Menu size="large" isLazy={true} >
                  <MenuButton as={Box} >
                    <HStack spacing="10px">
                      <Image src={user.avatar} alt="user_avatar" borderRadius="full" boxSize="40px" />
                      <ChevronDownIcon boxSize={8} />
                    </HStack>
                  </MenuButton>
                  <MenuList   minWidth="180px" className="nav__auth__box">
                    <MenuItem onClick={() => history.push("/profile")}>My Tasks</MenuItem>
                    <MenuItem as={Link} to="/profile?tab=1">Bids / Offers</MenuItem>
                    <MenuItem as={Link} to="/profile?tab=2">My Orders </MenuItem>
                    <MenuItem as={Link} to="/profile?tab=3">Watchlist</MenuItem>
                    <MenuItem as={Link} to="/profile?tab=4">Saved runners</MenuItem>
                    <MenuItem as={Link} to="/profile?tab=5">My Profile</MenuItem>
                    <MenuItem as={Link} to="/profile?tab=6">My Reviews</MenuItem>
                    <MenuItem as={Link} to="/profile?tab=7">Account Settings</MenuItem>
                    <MenuItem onClick={() => logOutUser()}>Logout</MenuItem>
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
