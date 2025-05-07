// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { tools, toolCategories } from "@/lib/data";
// import * as LucideIcons from "lucide-react";

// export function Sidebar() {
//   const pathname = usePathname();
//   const IconComponents: Record<string, React.ComponentType<any>> = LucideIcons;

//   return (
//     <div className="flex h-screen flex-col border-r bg-background">
//       <div className="py-4 px-3 border-b">
//         <Link href="/" className="flex items-center space-x-2">
//           <LucideIcons.LayoutGrid className="h-6 w-6" />
//           <span className="font-bold text-lg">Micro Tools Hub</span>
//         </Link>
//       </div>
//       <ScrollArea className="flex-1">
//         <div className="px-1 py-2">
//           {toolCategories.map((category) => {
//             const categoryTools = tools.filter((tool) => tool.category === category.id);
//             const CategoryIcon = IconComponents[category.icon];

//             return (
//               <div key={category.id} className="mb-4">
//                 <div className="mb-1 px-4 py-1.5">
//                   <div className="flex items-center space-x-2">
//                     <CategoryIcon className="h-4 w-4" />
//                     <span className="text-sm font-medium text-muted-foreground">
//                       {category.name}
//                     </span>
//                   </div>
//                 </div>
//                 {categoryTools.map((tool) => {
//                   const isActive = pathname === `/${tool.id}`;
//                   const ToolIcon = IconComponents[tool.icon];

//                   return (
//                     <Button
//                       key={tool.id}
//                       variant={isActive ? "secondary" : "ghost"}
//                       asChild
//                       className={cn(
//                         "w-full justify-start px-4 py-2 mb-1 h-9",
//                         isActive && "bg-secondary text-secondary-foreground"
//                       )}
//                     >
//                       <Link href={`/${tool.id}`}>
//                         <ToolIcon className="mr-2 h-4 w-4" />
//                         {tool.name}
//                       </Link>
//                     </Button>
//                   );
//                 })}
//               </div>
//             );
//           })}
//         </div>
//       </ScrollArea>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { tools, toolCategories } from "@/lib/data";
import * as LucideIcons from "lucide-react";
import { ComponentType } from "react";

export function Sidebar() {
  const pathname = usePathname();

  // Create a filtered icon components object
  const IconComponents: Record<string, ComponentType<any>> = {};

  // Filter the lucide icons to only include actual icon components
  Object.entries(LucideIcons).forEach(([name, component]) => {
    // Lucide icon components start with uppercase letters and are functions
    if (
      name[0] === name[0].toUpperCase() &&
      name !== "createLucideIcon" &&
      typeof component === "function"
    ) {
      IconComponents[name] = component as ComponentType<any>;
    }
  });

  return (
    <div className="flex h-screen flex-col border-r bg-background">
      <div className="py-4 px-3 border-b">
        <Link href="/" className="flex items-center space-x-2">
          <LucideIcons.LayoutGrid className="h-6 w-6" />
          <span className="font-bold text-lg">Toolify</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="px-1 py-2">
          {toolCategories.map((category) => {
            const categoryTools = tools.filter(
              (tool) => tool.category === category.id
            );
            const CategoryIcon =
              IconComponents[category.icon] || LucideIcons.HelpCircle;

            return (
              <div key={category.id} className="mb-4">
                <div className="mb-1 px-4 py-1.5">
                  <div className="flex items-center space-x-2">
                    <CategoryIcon className="h-4 w-4" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {category.name}
                    </span>
                  </div>
                </div>
                {categoryTools.map((tool) => {
                  const isActive = pathname === `/${tool.id}`;
                  const ToolIcon =
                    IconComponents[tool.icon] || LucideIcons.HelpCircle;

                  return (
                    <Button
                      key={tool.id}
                      variant={isActive ? "secondary" : "ghost"}
                      asChild
                      className={cn(
                        "w-full justify-start px-4 py-2 mb-1 h-9",
                        isActive && "bg-secondary text-secondary-foreground"
                      )}
                    >
                      <Link href={`/${tool.id}`}>
                        <ToolIcon className="mr-2 h-4 w-4" />
                        {tool.name}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
