import { Alert } from "@chakra-ui/react";


const AlertNoGoal = () => {

    return (
        <Alert.Root
        status="info"
        colorPalette="teal"
        width="40%"
        height="fit-content"
        margin="0 auto"
      >
        <Alert.Indicator />
        <Alert.Title>No Goals Set</Alert.Title>
      </Alert.Root>
    
    
    )
}

export default AlertNoGoal;