import React from "react";
import { Box, Button, IconButton, Stack } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { PaginationProps } from "../@types/components/Pagination";

const styles = {
  container: {
    position: "absolute",
    bottom: "20px",
  },
  btn: {
    width: "36px",
    minWidth: "36px",
    height: "36px",
    padding: 0,
  },
  neighbourBtn: {
    backgroundColor: "#e6eaf8",
    color: "#152d8b",
    width: "36px",
    minWidth: "36px",
    height: "36px",
    padding: 0,
  },
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onPageChange,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      marginTop={4}
      sx={styles.container}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton
          onClick={onPrevious}
          disabled={currentPage === 1}
          sx={styles.btn}
        >
          <ChevronLeftIcon />
        </IconButton>
        {currentPage > 1 && (
          <Button
            variant="contained"
            onClick={() => onPageChange(currentPage - 1)}
            sx={styles.neighbourBtn}
          >
            {currentPage - 1}
          </Button>
        )}
        <Button variant="contained" color="secondary" disabled sx={styles.btn}>
          {currentPage}
        </Button>

        {currentPage < totalPages && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => onPageChange(currentPage + 1)}
            sx={styles.neighbourBtn}
          >
            {currentPage + 1}
          </Button>
        )}
        <IconButton
          onClick={onNext}
          disabled={currentPage === totalPages}
          sx={styles.btn}
        >
          <ChevronRightIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};
