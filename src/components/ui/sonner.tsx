import type { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:rounded-lg group-[.toaster]:border group-[.toaster]:border-[#2b3139] group-[.toaster]:bg-[#1e2329] group-[.toaster]:text-[#eaecef] group-[.toaster]:shadow-none",
          description: "group-[.toast]:text-[#707a8a]",
          actionButton:
            "group-[.toast]:rounded-md group-[.toast]:bg-[#fcd535] group-[.toast]:font-semibold group-[.toast]:text-[#181a20] hover:group-[.toast]:bg-[#f0b90b]",
          cancelButton:
            "group-[.toast]:rounded-md group-[.toast]:border group-[.toast]:border-[#2b3139] group-[.toast]:bg-transparent group-[.toast]:text-[#eaecef]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
