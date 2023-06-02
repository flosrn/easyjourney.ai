"use client";

import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Textarea as TextareaInput } from "~/components/ui/textarea";

import { cn } from "~/lib/classNames";

import { useInputStore } from "../../store/inputStore";

type TextareaProps = {};

type Image = {
  id: string;
  imageUrl: string;
  command: string;
  prompt: string;
  jobId: string;
};

const getAllPosters = async () => {
  const response = await fetch("/api/admin/posters");
  const data = await response.json();
  return data;
};

const fetchMidjourneyResults = async (value: string, page: number) => {
  const response = await fetch("/api/admin/midjourney/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value, page }),
  });
  const data = await response.json();
  return data;
};

const updatePosters = async (posters: Image[]) => {
  const response = await fetch("/api/admin/posters/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ posters }),
  });
  const data = await response.json();
  return data;
};

const TextareaPrompt = ({}: TextareaProps) => {
  const [startSearch, setStartSearch] = useState<boolean>(false);
  const [startFetch, setStartFetch] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [finalPosters, setFinalPosters] = useState<Image[]>([]);
  const [updatedPosters, setUpdatedPosters] = useState<Image[]>([]);
  const [inputValue, setInputValue] = useInputStore((state) => [
    state.inputValue,
    state.setInputValue,
  ]);

  const { data: posters, isFetching } = useQuery<Image[]>({
    queryKey: ["posters"],
    queryFn: async () => getAllPosters(),
    enabled: startFetch,
  });

  const { data: images, isFetching: isSearchFetching } = useQuery<Image[]>({
    queryKey: ["images", inputValue, page],
    queryFn: async () => fetchMidjourneyResults(inputValue, page),
    enabled: startSearch,
  });

  const updateMutation = useMutation({
    mutationFn: async () => updatePosters(finalPosters),
    onSuccess: (data) => {
      console.log("data :", data);
      setUpdatedPosters(data.numberOfPostersUpdated);
    },
  });

  // console.log("updateMutation :", updateMutation);

  const syncImages = () => {
    const newPosters = posters
      ?.map((poster) => {
        // eslint-disable-next-line no-shadow
        const image = allImages.find((image) =>
          image.prompt.trim().includes(poster.prompt.trim())
        );
        if (!image) return;
        return {
          ...poster,
          image: image.imageUrl,
        };
      })
      .filter(Boolean);
    console.log("newPosters :", newPosters);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    newPosters && setFinalPosters(newPosters);
  };

  useEffect(() => {
    images && setAllImages([...allImages, ...images]);
  }, [images, setAllImages]);

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue.length > 0) {
        setStartSearch(true);
      }
    }
  };

  const columns: Image[][] = [[], [], [], []];

  allImages.map((poster, index) => {
    columns[index % 4].push(poster);
  });

  return (
    <div className="">
      <div className="mb-5 font-bold">Search for midjourney results</div>
      <div className="flex items-end space-x-5">
        <div className="flex w-full">
          <TextareaInput
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="leave blank to search for all midjourney results or enter a specific midjourney prompt"
            className={cn("h-[110px]")}
          />
        </div>
        <div className="space-y-2">
          <Button onClick={() => setStartFetch(true)}>
            {isFetching && (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span className="hidden md:block">Get all posters</span>
          </Button>
        </div>
      </div>
      <div className="my-5 flex items-center space-x-3">
        <div className="">Page: {page}</div>
        <Button onClick={() => setPage(page + 1)} variant="outline">
          Next page
        </Button>
        <Button onClick={() => setStartSearch(true)}>
          {isSearchFetching && (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          )}
          <span className="hidden md:block">Search on MJ</span>
        </Button>
        <Button onClick={() => setStartSearch(false)} variant="outline">
          Reset
        </Button>
        <Button onClick={() => syncImages()} variant="secondary">
          Sync
        </Button>
        <Button onClick={async () => updateMutation.mutate()} variant="success">
          {updateMutation.isPending && (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Update
        </Button>
      </div>
      <div className="">Number of Images from MJ: {allImages.length}</div>
      <div className="">Number of Posters from DDB: {posters?.length}</div>
      <div className="">Number of matched posters: {finalPosters.length}</div>
      <div className="">Number of updated posters: {updatedPosters.length}</div>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {allImages.length > 0 &&
          columns.map((column, index) => (
            <div className="grid h-fit gap-3" key={index}>
              {column.map((poster) => (
                <React.Fragment key={poster.id}>
                  <div className="">
                    <img
                      src={poster.imageUrl}
                      alt=""
                      width={500}
                      height={500}
                    />
                    <p>{poster.prompt}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TextareaPrompt;
