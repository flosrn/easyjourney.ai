import * as Dialog from "~/components/ui/dialog";

export default const Dialog = () => {
  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>Manage your account settings</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <Button variant="secondary" onClick={handleSubmit}>
          Confirmer
        </Button>
        <Toaster />
      </DialogContent>
    </Dialog>
  );
}