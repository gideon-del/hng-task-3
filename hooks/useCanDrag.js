import Grid from "@/components/grid";
import GuestGrid from "@/components/guestGrid";
import { useUser } from "@clerk/nextjs";

export default function useCanDrag() {
  const { user } = useUser();
  const Component = user ? Grid : GuestGrid;
  return Component;
}
