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
  const { data, isError, isLoading } = useGetLeadsQuery({ page, limit: 9 });
  const leadsState = useSelector((state: RootState) => state.leads);

  const handleAddLead = async (lead: { name: string; email: string; status?: string }) => {
    try {
      const response = await createLead(lead).unwrap();
      dispatch(addLead({ ...lead, status: lead.status || "New", createdAt: new Date().toISOString() }));
      // Optionally refetch the current page to include the new lead
      setPage(1); // Reset to page 1 to show the newest lead
    } catch (error: unknown) {
      throw error;
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(setLeads({ leads: data.data.leads, pagination: data.data.pagination }));
    }
  }, [data, dispatch]);

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error fetching leads</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
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
            page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
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
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
      <div className="container mx-auto flex justify-center mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
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