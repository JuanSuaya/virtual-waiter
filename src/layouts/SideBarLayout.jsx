import {
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
  } from "@/components/ui/sidebar";
  import { AppSidebar } from "@/components/app-sidebar";
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
  import { Separator } from "@/components/ui/separator";
  import { useBreadcrumbStore } from "@/store/breadcrumbStore";
  
  export default function SideBarLayout({ children, hasBackground }) {
    const { breadcrumbs } = useBreadcrumbStore();
  
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset hasBackground={hasBackground} className="flex flex-col min-h-screen">
          <header className="w-full bg-gradient-to-r from-violet-600 to-blue-500 flex h-10 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-400 opacity-30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-300 opacity-20 rounded-full blur-3xl animate-pulse" />
            <div className="flex items-center gap-2 px-4 relative z-10">
              <SidebarTrigger className="-ml-1 text-white" />
              <Separator orientation="vertical" className="mr-2 h-4 bg-white/20" />
              <Breadcrumb>
                <BreadcrumbList className="text-white">
                  {breadcrumbs.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <BreadcrumbItem className={index !== 0 ? "hidden md:block md:flex" : ""}>
                        {item.href ? (
                          <BreadcrumbLink href={item.href} className="text-white hover:text-violet-100">
                            {item.label}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage className="text-white">{item.label}</BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator className="hidden md:block text-white/50" />
                      )}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    );
  }
  