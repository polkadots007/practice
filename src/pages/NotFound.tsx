import { EmptyState, Stack, VStack } from "@chakra-ui/react"
import { TbError404 } from "react-icons/tb";

const NotFound = () => {
  return (
    <Stack>
          <EmptyState.Root size="lg" key="lg">
            <EmptyState.Content>
              <EmptyState.Indicator>
                <TbError404 />
              </EmptyState.Indicator>
              <VStack textAlign="center">
                <EmptyState.Title>Error - 404</EmptyState.Title>
                <EmptyState.Description>
                  Page not found
                </EmptyState.Description>
              </VStack>
            </EmptyState.Content>
          </EmptyState.Root>
    </Stack>
  )
}

export default NotFound;