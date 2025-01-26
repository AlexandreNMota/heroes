import React from "react";
import { Box, Button, IconButton, Stack } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onPageChange,
}) => {
  return (
    <Box display="flex" justifyContent="center" marginTop={4} sx={{position:"absolute", bottom:"20px"}}>
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton
          onClick={onPrevious}
          disabled={currentPage === 1}
          sx={{
            width: "36px",
            minWidth:"36px",
            height: "36px",
            padding: 0,
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        {currentPage > 1 && (
          <Button
            variant="contained"
            onClick={() => onPageChange(currentPage - 1)}
            sx={{
                backgroundColor: "#e6eaf8",
                color: "#152d8b",
                width: "36px",
            minWidth:"36px",
            height: "36px",
            padding: 0,
            }}
          >
            {currentPage - 1}
          </Button>
        )}
        <Button variant="contained" color="secondary" disabled sx={{
           width: "36px",
           minWidth:"36px",
           height: "36px",
           padding: 0,
        }}>
          {currentPage}
        </Button>

        {currentPage < totalPages && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => onPageChange(currentPage + 1)}
            sx={{
                backgroundColor: "#e6eaf8",
                color: "#152d8b",
                width: "36px",
            minWidth:"36px",
            height: "36px",
            padding: 0,
            }}
          >
            {currentPage + 1}
          </Button>
        )}
        <IconButton
          onClick={onNext}
          disabled={currentPage === totalPages}
          sx={{
            width: "36px",
            minWidth:"36px",
            height: "36px",
            padding: 0,
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Stack>
    </Box>
  );
};
