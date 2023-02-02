import ProfileCard from "@/components/ProfileCard";
import DashboardLayout from "@/layout/DashboardLayout";

export default function settings() {
  // const [profile, setProfile]
  return (
    <>
      <DashboardLayout title="Settings" namePage="Settings">
        <ProfileCard />
      </DashboardLayout>
    </>
  );
}
