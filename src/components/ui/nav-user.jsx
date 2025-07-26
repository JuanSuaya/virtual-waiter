"use client";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
// import Logo from "@/assets/logos/favicon-white.svg";
// import LogoBlue from "@/assets/logos/logo-blue.svg";

export function NavUser({ user }) {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const logout = useAuthStore((state) => state.logout);


  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="relative group data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* <img
                src={Logo}
                alt="Logo"
                height={25}
                width={25}
                className="group-hover:opacity-0 transition-opacity absolute"
              /> */}
              {/* Logo azul */}
              {/* <img
                src={LogoBlue}
                alt="Logo azul"
                height={25}
                width={25}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              /> */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {/* <img src={LogoBlue} alt="Logo" height={25} width={25} /> */}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/edit-account")}>
                <BadgeCheck className="mr-2" />
                Cuenta
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2" />
                Facturación
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2" />
                Notificaciones
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
