// import { tools, toolCategories } from '@/lib/data';
// import * as LucideIcons from 'lucide-react';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// export default function Home() {
//   const IconComponents: Record<string, React.ComponentType<any>> = LucideIcons;

//   return (
//     <div className="container mx-auto py-10 px-4">
//       <div className="max-w-4xl mx-auto text-center mb-12">
//         <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
//           Micro Tools Hub
//         </h1>
//         <p className="text-xl text-muted-foreground mb-8">
//           A collection of free utility tools to boost your productivity
//         </p>
//         <div className="flex flex-wrap justify-center gap-2">
//           {toolCategories.map((category) => {
//             const CategoryIcon = IconComponents[category.icon];
//             return (
//               <Button key={category.id} variant="outline" className="mb-2">
//                 <CategoryIcon className="mr-2 h-4 w-4" />
//                 {category.name}
//               </Button>
//             );
//           })}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
//         {tools.map((tool) => {
//           const ToolIcon = IconComponents[tool.icon];
//           return (
//             <Card key={tool.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
//               <CardHeader className="pb-3">
//                 <CardTitle className="flex items-center text-xl">
//                   <ToolIcon className="mr-2 h-5 w-5" />
//                   {tool.name}
//                 </CardTitle>
//                 <CardDescription>{tool.description}</CardDescription>
//               </CardHeader>
//               <CardFooter className="pt-3">
//                 <Button asChild className="w-full">
//                   <Link href={`/${tool.id}`}>Open Tool</Link>
//                 </Button>
//               </CardFooter>
//             </Card>
//           );
//         })}
//       </div>

//       <div className="text-center text-muted-foreground">
//         <p className="text-sm">
//           All tools are free to use and don&apos;t track your data.
//         </p>
//       </div>
//     </div>
//   );
// }

import { tools, toolCategories } from "@/lib/data";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ComponentType } from "react";

export default function Home() {
  // Create a type-safe mapping of string to icon components only
  const IconComponents: Record<string, ComponentType<any>> = {};

  // Add only the actual icon components to our mapping with proper type checking
  Object.entries(LucideIcons).forEach(([name, component]) => {
    // Skip non-icon utility functions by checking name patterns
    // Lucide icon components start with uppercase letters
    if (
      name !== "createLucideIcon" &&
      name[0] === name[0].toUpperCase() &&
      typeof component === "function"
    ) {
      IconComponents[name] = component as ComponentType<any>;
    }
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          Toolify
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          A collection of free utility tools to boost your productivity
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {toolCategories.map((category) => {
            // Use type assertion to satisfy TypeScript
            const CategoryIcon = (IconComponents[category.icon] ||
              LucideIcons.HelpCircle) as ComponentType<any>;
            return (
              <Button key={category.id} variant="outline" className="mb-2">
                <CategoryIcon className="mr-2 h-4 w-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {tools.map((tool) => {
          // Use type assertion to satisfy TypeScript
          const ToolIcon = (IconComponents[tool.icon] ||
            LucideIcons.HelpCircle) as ComponentType<any>;
          return (
            <Card
              key={tool.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-xl">
                  <ToolIcon className="mr-2 h-5 w-5" />
                  {tool.name}
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-3">
                <Button asChild className="w-full">
                  <Link href={`/${tool.id}`}>Open Tool</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="text-center text-muted-foreground">
        <p className="text-sm">
          All tools are free to use and don&apos;t track your data.
        </p>
      </div>
    </div>
  );
}
