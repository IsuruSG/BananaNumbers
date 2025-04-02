import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router";
import "./BackButton.css";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton className="back-button" onClick={() => navigate("/")}>
      <ArrowBack className="back-icon" />
    </IconButton>
  );
};

export default BackButton;
