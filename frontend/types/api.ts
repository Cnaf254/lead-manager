export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

export interface LeadsResponse {
  success: boolean;
  message: string;
  data: {
    leads: Lead[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalLeads: number;
      limit: number;
    };
  };
}

export interface LeadRequest {
  name: string;
  email: string;
  status?: string;
}