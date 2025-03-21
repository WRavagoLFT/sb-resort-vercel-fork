"use client";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
export default function Provider({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient());
    
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </TooltipProvider>
        </QueryClientProvider>
    );
}
