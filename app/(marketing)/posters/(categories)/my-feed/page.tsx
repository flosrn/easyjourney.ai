import MyFeed from "./my-feed";

export default async function MyFeedPage() {
  return (
    <section className="container mt-6 grid items-center justify-center gap-6 pb-8">
      <h1 className="text-3xl font-bold">
        New posters from the persons you follow
      </h1>
      <MyFeed />
    </section>
  );
}
