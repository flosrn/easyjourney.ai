const extractJobId = (url: string): string | undefined => {
  const splitedUrl = url.split("_");
  const lastPart = splitedUrl.at(-1);
  const jobId = lastPart?.split(".")[0];
  return jobId;
};

export default extractJobId;
