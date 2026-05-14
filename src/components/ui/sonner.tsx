import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:rounded-[18px] group-[.toaster]:border group-[.toaster]:border-white/45 group-[.toaster]:bg-[rgb(255,255,255/0.9)] group-[.toaster]:backdrop-blur-md group-[.toaster]:text-foreground group-[.toaster]:shadow-[0_10px_40px_rgba(0,0,0,0.08)]",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:rounded-[14px] group-[.toast]:bg-gradient-to-br group-[.toast]:from-[#FFD60A] group-[.toast]:to-[#FFB703] group-[.toast]:font-semibold group-[.toast]:text-[#1A1A1A]",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
