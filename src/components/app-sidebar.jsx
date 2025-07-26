"use client";

import React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  CalendarDays,
  GalleryVerticalEnd,
  Wrench,
  Settings2,
  Receipt,
  Users2,
  Users,
  BookUser,
  ChartSpline,
  Car,
  Home
} from "lucide-react";

import { NavMain } from "./ui/nav-main";
import { NavProjects } from "./ui/nav-projects";
import { NavUser } from "./ui/nav-user";
import { TeamSwitcher } from "./ui/team-switcher";
import Logo from "@/assets/logos/waiter.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Hackaton",
    email: "Hackaton@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Hackaton",
      logo: GalleryVerticalEnd,
      plan: "Empresa",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Inicio",
      url: "/",
      icon: Home,
    },
    {
      title: "Mis Tickets",
      url: "/my-tickets",
      icon: Receipt,
    },
    {
      title: "Crear Evento",
      url: "/create-event",
      icon: CalendarDays,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex flex-col items-center gap-2 py-6 data-[collapsible=icon]:py-3">
          <div className="bg-gradient-to-br from-violet-600 to-blue-500 rounded-full p-1 shadow-md data-[collapsible=icon]:p-0">
            <img
              src={Logo}
              alt="Logo"
              className="w-16 h-16 rounded-full bg-white object-contain p-2 data-[collapsible=icon]:w-8 data-[collapsible=icon]:h-8 data-[collapsible=icon]:p-1"
              onError={e => { e.target.onerror = null; e.target.src = '/avatars/shadcn.jpg'; }}
            />
          </div>
          <div className="text-center mt-2 data-[collapsible=icon]:hidden">
            <div className="font-bold text-base bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">{data.teams[0].name}</div>
            <div className="text-xs text-gray-400">{data.teams[0].plan}</div>
          </div>
        </div>
        <div className="px-4 data-[collapsible=icon]:px-2"><hr className="border-t border-gray-100 mb-2 data-[collapsible=icon]:mb-1" /></div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
