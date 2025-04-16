import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const allJobsLoader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    return { data };
  } catch (error) {
    console.log("🔴ERROR:", error);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AllJobsCtxt = createContext();
function AllJobs() {
  const { data } = useLoaderData();
  console.log(data)
  return (
    <AllJobsCtxt.Provider value={{ data }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsCtxt.Provider>
  );
}

export const useAllJobsCtxt = () => {
  return useContext(AllJobsCtxt);
};

export default AllJobs;
