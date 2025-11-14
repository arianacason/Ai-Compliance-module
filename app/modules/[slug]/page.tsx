import { notFound } from "next/navigation";
import ModuleContent from "@/components/course/ModuleContent";

const modules = [
  { slug: "ai-awakening", id: "module-1" },
  { slug: "rulebook-decoded", id: "module-2" },
  { slug: "bias-in-machine", id: "module-3" },
  { slug: "decision-point", id: "module-4" },
  { slug: "spotting-red-flags", id: "module-5" },
  { slug: "speaking-up", id: "module-6" },
  { slug: "staying-ahead", id: "module-7" },
  { slug: "capstone", id: "capstone" },
];

export default async function ModulePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const module = modules.find((m) => m.slug === params.slug);

  if (!module) {
    notFound();
  }

  return <ModuleContent moduleId={module.id} slug={module.slug} />;
}

export async function generateStaticParams() {
  return modules.map((module) => ({
    slug: module.slug,
  }));
}