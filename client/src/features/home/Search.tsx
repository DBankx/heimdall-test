﻿import React from "react";
import {Box, FormControl, FormErrorMessage, Input, Stack, Select, Button} from "@chakra-ui/react";
import {Formik} from "formik";

const Search = () => {
  return (
    <Box>
      <Formik initialValues={{title: ""}} onSubmit={values => console.log(values)}>
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
            <FormControl style={{maxWidth: "350px"}} isInvalid={!!errors.title && touched.title} id="password">
              <Input value={values.title} name="title" onBlur={handleBlur} onChange={handleChange} className="search__input" placeholder="What are you looking for" />
              {errors.title && touched.title && <FormErrorMessage>
                {errors.title}
              </FormErrorMessage>}
            </FormControl>
              <Button type="submit" className="search__btn">Search</Button>
          </Stack>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Search;
