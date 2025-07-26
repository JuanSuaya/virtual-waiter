"use client";
import Layout from "@/layouts/layout";
import { TabsDemo } from "@/components/ui/tabs-demo";

function EditAccount() {
  return (
    <Layout hasBackground>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <TabsDemo />
      </div>
    </Layout>
  );
}

export default EditAccount;
