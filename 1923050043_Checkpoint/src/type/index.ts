export type ApplicationStatus = 'wishlist' | 'applied' | 'interviewing' | 'offered' | 'rejected';

export interface Company {
  id: string;
  name: string;
  industry: string;
}

export interface Application {
  id: string;
  companyId: string; 
  role: string;
  status: ApplicationStatus;
  deadline?: string; 
  updatedAt: string;
}