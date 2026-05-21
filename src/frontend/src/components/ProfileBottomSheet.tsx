import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileBottomSheetProps {
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function ProfileBottomSheet({
  open,
  onClose,
  onLogout,
}: ProfileBottomSheetProps) {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop — covers only the area above the bottom nav */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bottom-16 z-40 bg-black/50"
              onClick={onClose}
              data-ocid="profile.backdrop"
            />

            {/* Sheet — anchored above bottom nav, full app width */}
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-16 left-0 right-0 max-h-[60vh] z-50 bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
              data-ocid="profile.sheet"
            >
              {/* Drag handle + close button */}
              <div className="relative flex justify-center items-center pt-2 pb-1 shrink-0">
                <div className="w-10 h-1.5 rounded-full bg-gray-300" />
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 active:scale-95 transition-all"
                  data-ocid="profile.close_button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-5 pt-2 pb-4 flex flex-col items-center gap-2 overflow-y-auto">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-vospital-primary flex items-center justify-center shadow-md shrink-0">
                  <span className="text-white font-bold text-base">AM</span>
                </div>

                {/* Name */}
                <p className="text-base font-bold text-gray-900">CHW Amara</p>

                {/* Info rows */}
                <div className="w-full space-y-0">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500">
                      Role
                    </span>
                    <span className="text-xs font-semibold text-gray-800">
                      Community Health Worker
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-xs font-medium text-gray-500">
                      Organization
                    </span>
                    <span className="text-xs font-semibold text-gray-800">
                      Vospital Health Network
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="w-full space-y-2 pt-1">
                  <button
                    type="button"
                    data-ocid="profile.switch_role.button"
                    onClick={() => toast("Feature coming soon")}
                    className="w-full min-h-[44px] bg-vospital-primary text-white font-bold rounded-xl text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    Switch Role
                  </button>
                  <button
                    type="button"
                    data-ocid="profile.settings.button"
                    onClick={() => toast("Feature coming soon")}
                    className="w-full min-h-[44px] bg-gray-200 text-gray-700 font-bold rounded-xl text-sm tracking-wide hover:bg-gray-300 active:scale-[0.98] transition-all"
                  >
                    Settings
                  </button>
                  <button
                    type="button"
                    data-ocid="profile.delete_button"
                    onClick={() => setLogoutDialogOpen(true)}
                    className="w-full min-h-[44px] bg-red-600 text-white font-bold rounded-xl text-sm tracking-wide hover:bg-red-700 active:scale-[0.98] transition-all"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent data-ocid="profile.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to logout?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              data-ocid="profile.cancel_button"
              onClick={() => setLogoutDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-ocid="profile.confirm_button"
              onClick={() => {
                setLogoutDialogOpen(false);
                onLogout();
              }}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
