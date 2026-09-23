import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Application, Company } from '../type'; 

const MOCK_COMPANIES: Company[] = [
  { id: 'c1', name: 'TechNova', industry: 'Software' },
  { id: 'c2', name: 'FinServ', industry: 'Finance' }
];

const MOCK_APPLICATIONS: Application[] = [
  { 
    id: 'a1', 
    companyId: 'c1', 
    role: 'Frontend Intern', 
    status: 'interviewing', 
    updatedAt: new Date().toISOString() 
  },
  { 
    id: 'a2', 
    companyId: 'c2', 
    role: 'Data Analyst Intern', 
    status: 'applied', 
    updatedAt: new Date().toISOString() 
  }
];

interface AppState {
  companies: Company[];
  applications: Application[];
  isLoggedIn: boolean; 
  
  addApplication: (app: Application) => void;
  deleteApplication: (id: string) => void;
  updateStatus: (id: string, newStatus: Application['status']) => void;
  login: () => void;   
  logout: () => void;  

  addCompany: (company: Company) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      companies: MOCK_COMPANIES,
      applications: MOCK_APPLICATIONS,
      isLoggedIn: false, 
      
      addApplication: (app) => 
        set((state) => ({ applications: [...state.applications, app] })),
        
      deleteApplication: (id) => 
        set((state) => ({ 
          applications: state.applications.filter((a) => a.id !== id) 
        })),

      updateStatus: (id, newStatus) => 
        set((state) => ({
          applications: state.applications.map((app) => 
            app.id === id ? { ...app, status: newStatus } : app
          )
        })),
    
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),

      addCompany: (company) => 
        set((state) => ({ 
          companies: [...state.companies, company] 
        })),
    }),
    {
      name: 'internship-storage', 
      storage: createJSONStorage(() => AsyncStorage), 
    }
  )
);
