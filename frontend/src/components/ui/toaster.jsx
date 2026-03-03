import { useToast } from "@/hooks/useToast";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";



export function Toaster() {

  const { toasts } = useToast();



  return (

    <ToastProvider>

      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {

        return (

          <Toast
            key={id}
            variant={variant}
            {...props}

            className={`
              bg-white/5 backdrop-blur-xl
              border border-white/10
              text-white
              shadow-2xl

              ${variant === "destructive"
                ? "bg-red-500/10 border-red-500/30 text-red-400 shadow-red-500/10"
                : ""
              }
            `}
          >

            <div className="grid gap-1">

              {title && (
                <ToastTitle className="text-white font-semibold">
                  {title}
                </ToastTitle>
              )}

              {description && (
                <ToastDescription className="text-white/70">
                  {description}
                </ToastDescription>
              )}

            </div>


            {action}


            <ToastClose className="text-white/50 hover:text-white" />

          </Toast>

        );

      })}


      <ToastViewport />

    </ToastProvider>

  );

}