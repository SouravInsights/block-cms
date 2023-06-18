import { Box, Flex } from "@chakra-ui/react"
import Sidebar from "./SideBar"
import ModelsDrawer from "./ModelsDrawer"

const studio = () =>{

return(
    <Box>
        <Flex flexDir="row">
       <Sidebar/> 
       <ModelsDrawer/>
       </Flex>
    </Box>
)
}
export default studio