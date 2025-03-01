import { Box, Button, ColorSwatch, createListCollection, Fieldset, Flex, Input,  
      SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger,
     SelectValueText, Stack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RiAddFill } from "react-icons/ri";
import { goalCategories } from "@/data/goalData";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { NewGoalProps } from "@/helpers/types";
import { getMaxGoalId, uploadGoal } from "@/firebase/services";
import { Toaster, toaster } from "@/components/ui/toaster";


  
const CreateGoal = () => {
    const { user } = useSelector(
        (state: RootState) => state.auth
      );
    const categories = 
    createListCollection({
        items: Object.keys(goalCategories).map((category)=>({ label: category, value: category}))
    });
    const contentRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState<boolean>(false);
    const [goal, setGoal] =useState<NewGoalProps>({
        id: "",
        title: "",
        description: "",
        target: 0,
        progress: 0,
        category: "",
        priority: "",
        severityColor: "",
        completed: false,
        createdBy: user?.email || "",
        image: ""
    })

    const handleGoalSet = (attr: string, value: string | number) => {
        setGoal((prev: NewGoalProps)=> ({...prev, [attr]: value }))
    }

    const handleSubmitForm = async () => {
        const id : number = await getMaxGoalId(user?.email || '');
        const newGoal : NewGoalProps = Object.assign(goal, 
            {
            ['id']: (id + 1).toString(),
            ['priority']: goalCategories[goal.category].priority,
            ['severityColor']: goalCategories[goal.category].severityColor
            })
        console.log(newGoal)
        const promise =  uploadGoal(newGoal);
  
          toaster.promise(promise, {
            success: {
              title: "Successfully created!",
              description: "You have created a new goal!",
            },
            error: {
              title: "Upload failed",
              description: "Something wrong with the upload",
            },
            loading: {
             title: "Uploading...", description: "Please wait" },
          })
          handleClose()
    }

    const handleClose = () => {
        if (open) {
            setGoal({
                id: "",
                title: "",
                description: "",
                target: 0,
                progress: 0,
                category: "",
                priority: "",
                severityColor: "",
                completed: false,
                createdBy: user?.email || "",
                image: ""
            })
            setOpen(false);
        }
        else {
            setOpen(true);
        }

    }

    const handleReset = () => {
        setGoal({
            id: "",
            title: "",
            description: "",
            target: 0,
            progress: 0,
            category: "",
            priority: "",
            severityColor: "",
            completed: false,
            createdBy: user?.email || "",
            image: ""
        })
    }

  return (
      <>
      <Toaster />
      <DialogRoot open={open} scrollBehavior="inside" size="cover" placement="center" motionPreset="slide-in-bottom" onOpenChange={handleClose}>
          <DialogTrigger asChild>
              <Button colorPalette="teal" variant="solid">
                  <RiAddFill /> Add a New Goal
              </Button>
          </DialogTrigger>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Create a New Goal</DialogTitle>
                  <DialogCloseTrigger />
              </DialogHeader>
              <DialogBody>
                  <Fieldset.Root size="lg" maxW="md">
                      <Stack>
                          <Fieldset.Legend>Goal details</Fieldset.Legend>
                          <Fieldset.HelperText>
                              Please provide your goal details below.
                          </Fieldset.HelperText>
                      </Stack>

                      <Fieldset.Content>
                          <Field label="Title">
                              <Input
                                  name="title"
                                  value={goal.title}
                                  onChange={(e) => handleGoalSet('title', e.target.value)} />
                          </Field>
                          <Field label="Description">
                              <Input
                                  name="description"
                                  value={goal.description}
                                  onChange={(e) => handleGoalSet('description', e.target.value)} />
                          </Field>

                          <Field label="Category">
                              <SelectRoot
                                  collection={categories}
                                  size="sm"
                                  value={[goal.category]}
                                  onValueChange={(e) => handleGoalSet('category', e.value[0])}
                              >
                                  <SelectLabel>Select Category</SelectLabel>
                                  <SelectTrigger>
                                      <SelectValueText placeholder="Select any one" />
                                  </SelectTrigger>
                                  <SelectContent portalRef={contentRef}>
                                      {categories.items.map((item) => (
                                          <SelectItem item={item} key={item.value}>
                                              {item.label}
                                          </SelectItem>
                                      ))}
                                  </SelectContent>
                              </SelectRoot>
                              {goal.category && (
                                  <Button size="sm" variant="surface" colorPalette="red" onClick={() => handleGoalSet('category', "")}>
                                      Clear
                                  </Button>
                              )}
                          </Field>

                          <Field label="Priority (Depends on Category)">
                              {goal.category ?
                                  <Flex gap="2">
                                      <ColorSwatch value={goalCategories[goal.category].severityColor} borderRadius="50%" />
                                      <Box textTransform="uppercase">{goalCategories[goal.category].priority}</Box>
                                  </Flex>
                                  :
                                  <Box>Category not set</Box>}
                          </Field>
                          <Field label="Target">
                              <Input name="target" type="number"
                                  value={goal.target}
                                  onChange={(e) => handleGoalSet('target', e.target.value)} />
                          </Field>
                      </Fieldset.Content>

                      <Flex gap="4">
                          <Button type="submit" alignSelf="flex-start" onClick={handleSubmitForm}>
                              Submit
                          </Button>
                          <Button alignSelf="flex-start"
                              colorPalette="orange"
                              variant="outline"
                              onClick={handleReset}>
                              Reset
                          </Button>
                      </Flex>
                  </Fieldset.Root>
              </DialogBody>
          </DialogContent>
      </DialogRoot></>
  )
}

export default CreateGoal;
