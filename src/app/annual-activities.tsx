import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";


export default function AnnualActivities() {
    return (
    <div >
      <div className="flex flex-col">
        <SiteHeader /> 
        {/* Main Content */}
        <section className="container mx-auto px-4 py-16 md:py-24">
        </section>
        {/* Footer */}
        <SiteFooter />
      </div>
    </div>
  );
}   