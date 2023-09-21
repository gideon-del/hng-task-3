import Grid from "@/components/Gallery/grid";
import GuestGrid from "@/components/Gallery/guestGrid";
import { useUser } from "@clerk/nextjs";

export default function useCanDrag() {
  const { user } = useUser();
  const Component = user ? Grid : GuestGrid;
  return Component;
}
