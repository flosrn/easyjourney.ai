import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/Dialog";

export default function SettingsDialog({ title }) {
  return (
    <Dialog>
      <DialogTrigger>{title}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modify your profile</DialogTitle>
          <DialogDescription>Personalize your profile</DialogDescription>
        </DialogHeader>
        <div>test</div>
      </DialogContent>
    </Dialog>
  );
}
