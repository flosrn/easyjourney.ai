import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function AboutPage() {
  return (
    <>
      <section className="container mt-24 grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            About
          </h1>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">account</TabsContent>
            <TabsContent value="password">password</TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
