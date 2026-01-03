import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { astrologyInputSchema, type AstrologyInput, type ReportType, reportDetails } from "@shared/schema";
import { useCreateCheckoutSession } from "@/hooks/use-checkout";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedReport: ReportType | null;
}

export function PurchaseModal({ isOpen, onClose, selectedReport }: PurchaseModalProps) {
  const { mutate, isPending } = useCreateCheckoutSession();

  const form = useForm<AstrologyInput>({
    resolver: zodResolver(astrologyInputSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      timeOfBirth: "",
      cityOfBirth: "",
      countryOfBirth: "",
      customerEmail: "",
      reportType: selectedReport || "natal",
    },
  });

  const customerEmail = form.watch("customerEmail");
  const adminEmail = "Kyle.merritt@cosmicblueprint.space"; // In a real app, this would be from env
  const isAdmin = customerEmail.toLowerCase() === adminEmail.toLowerCase();

  // Update report type if it changes
  if (selectedReport && form.getValues().reportType !== selectedReport) {
    form.setValue("reportType", selectedReport);
  }

  const onSubmit = (data: AstrologyInput) => {
    mutate(data);
  };

  if (!selectedReport) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#1a103c] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display text-primary">
            Begin Your Journey
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Provide your birth details to generate your {reportDetails[selectedReport].name}.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your@email.com" className="bg-black/20 border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" className="bg-black/20 border-white/10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" className="bg-black/20 border-white/10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time of Birth (Optional)</FormLabel>
                    <FormControl>
                      <Input type="time" className="bg-black/20 border-white/10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cityOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City of Birth</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" className="bg-black/20 border-white/10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="countryOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country of Birth</FormLabel>
                    <FormControl>
                      <Input placeholder="USA" className="bg-black/20 border-white/10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-white/10 mt-6">
              <div className="text-sm text-gray-400">
                Total: <span className="text-white font-bold text-lg ml-1">{isAdmin ? "FREE (Admin)" : `$${reportDetails[selectedReport].price}`}</span>
              </div>
              <Button 
                type="submit" 
                disabled={isPending}
                className={`${isAdmin ? "bg-accent hover:bg-accent/90" : "bg-primary hover:bg-primary/90"} text-primary-foreground font-semibold`}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  isAdmin ? "Generate Free Admin Report" : "Proceed to Checkout"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
