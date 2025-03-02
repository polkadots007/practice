import { auth } from "@/firebaseConfig";
import { logoutUser } from "@/store/authSlice";
import { Box, Button, Circle } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { PopoverArrow, PopoverBody, PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import { FaRegUser } from "react-icons/fa";

const Profile = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await signOut(auth);
        dispatch(logoutUser());
        navigate("/login");
      };
    

    return (
        <Box
        flex="1"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
      >
        <PopoverRoot
          open={open}
          onOpenChange={(e) => setOpen(e.open)}
          size="xs"
        >
          <PopoverTrigger>
            <Circle size="10" bg="teal" color="white">
              <FaRegUser />
            </Circle>
          </PopoverTrigger>
          <PopoverContent
            w="15rem"
            position="absolute"
            top="6rem"
            right="3rem"
          >
            <PopoverArrow />
            <PopoverBody>
              <Button onClick={handleLogout} variant="ghost" w="full">
                Logout
              </Button>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
      </Box>  
    
    )
}

export default Profile;