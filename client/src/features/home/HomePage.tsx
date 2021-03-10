import React, {useContext, useEffect} from "react";
import {Box, Container, SimpleGrid} from "@chakra-ui/react";
import {observer} from "mobx-react-lite";
import Search from "./Search";
import storeContext from "../../application/store/store";
import Loader from "../../application/layout/Spinner";
import BookItem from "../book/BookItem";

const HomePage = () => {
  const {loadingBooks, books, getAllBooks} = useContext(storeContext);
  useEffect(() => {
    getAllBooks();
  }, [getAllBooks])

  if(loadingBooks || books == null) return <Loader />;
  return (
    <Box>
      <Container maxW="container.lg">
        <Box mt={5} mb={5}>
          <Search />
        </Box>
        <Box>
          <SimpleGrid templateColumns={{xl: "0.8fr 1fr", lg: "0.8fr 1fr", sm: "1fr"}}>
            <Box>
              <Box>
                <small style={{fontWeight: "bold"}}>{books.length} books found</small>
              </Box>
              {books.map((book) => (
                <Box mb={5} key={book._id}>
                  <BookItem book={book} />
                </Box>
              ))}
            </Box>

            <Box>

            </Box>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  )
}

export default observer(HomePage);
