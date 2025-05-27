"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLeads, addLead } from "@/features/leads/leadsSlice";
import { useGetLeadsQuery, useCreateLeadMutation } from "@/features/api/apiSlice";
import { RootState } from "../store/store";
import LeadCard from "@/components/LeadCard";
import AddLeadModal from "@/components/AddLeadModal";
import Spinner from "../components/spinner";

function Page() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createLead] = useCreateLeadMutation();
  const dispatch = useDispatch();
  const { data, isError, isLoading, error: fetchError } = useGetLeadsQuery({ page, limit: 9 });
  const leadsState = useSelector((state: RootState) => state.leads);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddLead = async (lead: { name: string; email: string; status?: string }) => {
  try {
    const response = await createLead(lead).unwrap();

    const createdLead = response.data; // This is the actual lead object from backend
      
    dispatch(addLead(createdLead)); // Add to Redux state
    setPage(1); // Reset to first page
    setErrorMessage(null); // Clear any error
  } catch (error: any) {
    setErrorMessage(
      error?.data?.message ||
      error?.message ||
      "Failed to add lead. Please try again."
    );
  }
};


  useEffect(() => {
    if (data) {
      dispatch(setLeads({ leads: data.data.leads, pagination: data.data.pagination }));
    }
    if (isError) {
      // User-friendly fetch error
      setErrorMessage(
        (fetchError as any)?.data?.message ||
        (fetchError as any)?.message ||
        "Failed to fetch leads. Please try again later."
      );
    }
  }, [data, dispatch, isError, fetchError]);

  const handleCloseError = () => setErrorMessage(null);

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      {errorMessage && (
        <div className="container mx-auto mt-4 flex justify-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-xl w-full flex items-center justify-between" role="alert">
            <span>{errorMessage}</span>
            <button
              onClick={handleCloseError}
              className="ml-4 text-red-700 font-bold"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <div className="container mx-auto gap-10 px-4 pt-10 flex justify-center flex-wrap">
        {leadsState.leads.map((lead, index) => (
          <LeadCard key={lead._id || index} lead={lead} />
        ))}
      </div>
      <div className="container mx-auto flex justify-center mt-10 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
            page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-500 hover:bg-orange-300"
          }`}
        >
          Previous
        </button>
        <span className="self-center">
          Page {leadsState.pagination.currentPage} of {leadsState.pagination.totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === leadsState.pagination.totalPages}
          className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
            page === leadsState.pagination.totalPages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-500 hover:bg-orange-300"
          }`}
        >
          Next
        </button>
      </div>
      <div className="container mx-auto flex justify-center mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-black"
        >
          Add New Lead
        </button>
      </div>
      <AddLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddLead}
      />
    </div>
  );
}

export default Page;