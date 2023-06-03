import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const CounterBarDialog = ({ open, setOpen, defaultValue }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader></DialogHeader>
        <Tabs defaultValue={defaultValue} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="likes">Likes</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="likes">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="followers">
            Change your password here.
          </TabsContent>
          <TabsContent value="following">
            Change your password here.
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CounterBarDialog;
