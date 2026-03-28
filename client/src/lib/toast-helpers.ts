// lib/toast-helpers.ts
import { toast } from "@/hooks/use-toast";

export const showToast = {
  success: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "success",
      duration: 3000, // 3 seconds - auto dismiss after this time
    });
  },
  
  error: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
      duration: 5000, // 5 seconds - longer for errors
    });
  },
  
  warning: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "warning",
      duration: 4000, // 4 seconds
    });
  },
  
  info: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "info",
      duration: 3000, // 3 seconds
    });
  },
};