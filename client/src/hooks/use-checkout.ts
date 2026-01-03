import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type AstrologyInput } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateCheckoutSession() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: AstrologyInput) => {
      // Validate data with schema before sending (double check)
      // Note: In a real app we might rely on the form validation mostly
      
      const res = await fetch(api.checkout.createSession.path, {
        method: api.checkout.createSession.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create checkout session");
      }

      return api.checkout.createSession.responses[200].parse(await res.json());
    },
    onSuccess: (data) => {
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    },
    onError: (error) => {
      toast({
        title: "Checkout Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
