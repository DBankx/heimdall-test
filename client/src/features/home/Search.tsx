import React from "react";
import {Box, FormControl, FormErrorMessage, Input, Stack, Select, Button} from "@chakra-ui/react";
import {Formik} from "formik";

const Search = () => {
  return (
    <Box>
      <Formik initialValues={{title: "", genre: ""}} onSubmit={values => console.log(values)}>
        {({
          handleSubmit,
          values,
          errors,
          touched,
          handleBlur,
          handleChange
          }) => (
          <form onSubmit={handleSubmit}>
          <Stack spacing="20px" direction={["column", "row"]} alignItems="center">
            <FormControl isInvalid={!!errors.title && touched.title} id="password">
              <Input value={values.title} name="title" onBlur={handleBlur} onChange={handleChange} className="search__input" placeholder="What are you looking for" />
              {errors.title && touched.title && <FormErrorMessage>
                {errors.title}
              </FormErrorMessage>}
            </FormControl>

            <FormControl id="genre">
              <Select className="search__input__2" value={values.genre} name="genre" onChange={handleChange} onBlur={handleBlur}  placeholder="Select a genre">
                <option value="Romance">Romance</option>
                <option value="Educational">Educational</option>
                <option value="Computers">Computers</option>
              </Select>
            </FormControl>

            <Box>
              <Button type="submit" className="search__btn">Search</Button>
            </Box>

          </Stack>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Search;
