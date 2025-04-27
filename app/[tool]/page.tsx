import { Sidebar } from "@/components/layout/sidebar";
import { WordCounter } from "@/components/tools/word-counter";
import { LoremIpsum } from "@/components/tools/lorem-ipsum";
import { PasswordGenerator } from "@/components/tools/password-generator";
import { UUIDGenerator } from "@/components/tools/uuid-generator";
import { QRCodeGenerator } from "@/components/tools/qr-code-generator";
import { Base64Converter } from "@/components/tools/base64-encoder";
import { RegexTester } from "@/components/tools/regex-tester";
import { ColorPicker } from "@/components/tools/color-picker";
import { notFound } from "next/navigation";
import { tools } from "@/lib/data";
import { Metadata } from "next";

interface ToolPageProps {
  params: {
    tool: string;
  };
}

export function generateMetadata({ params }: ToolPageProps): Metadata {
  const tool = tools.find((t) => t.id === params.tool);

  if (!tool) {
    return {
      title: "Tool Not Found - Micro Tools Hub",
    };
  }

  return {
    title: `${tool.name} - Micro Tools Hub`,
    description: tool.description,
  };
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    tool: tool.id,
  }));
}

// export default function ToolPage({ params }: ToolPageProps) {
//   const { tool } = params;

//   // Find the tool data
//   const toolData = tools.find((t) => t.id === tool);

//   if (!toolData) {
//     return notFound();
//   }

//   // Render the specific tool component based on the ID
//   const renderTool = () => {
//     switch (tool) {
//       case "word-counter":
//         return <WordCounter />;
//       case "lorem-ipsum":
//         return <LoremIpsum />;
//       case "password-generator":
//         return <PasswordGenerator />;
//       case "uuid-generator":
//         return <UUIDGenerator />;
//       case "qr-code-generator":
//         return <QRCodeGenerator />;
//       case "base64":
//         return <Base64Converter />;
//       case "regex-tester":
//         return <RegexTester />;
//       case "color-picker":
//         return <ColorPicker />;
//       default:
//         return <div>Tool not implemented yet</div>;
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <div className="hidden md:block">
//         <Sidebar />
//       </div>
//       <div className="flex-1 p-4 md:p-8">
//         <div className="container max-w-3xl mx-auto">{renderTool()}</div>
//       </div>
//     </div>
//   );
// }

export default function ToolPage({ params }: ToolPageProps) {
  const { tool } = params;

  const toolData = tools.find((t) => t.id === tool);

  if (!toolData) {
    return notFound(); // <- fix here
  }

  const renderTool = () => {
    switch (tool) {
      case "word-counter":
        return <WordCounter />;
      case "lorem-ipsum":
        return <LoremIpsum />;
      case "password-generator":
        return <PasswordGenerator />;
      case "uuid-generator":
        return <UUIDGenerator />;
      case "qr-code-generator":
        return <QRCodeGenerator />;
      case "base64":
        return <Base64Converter />;
      case "regex-tester":
        return <RegexTester />;
      case "color-picker":
        return <ColorPicker />;
      default:
        return <div>Tool not implemented yet</div>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 p-4 md:p-8">
        <div className="container max-w-3xl mx-auto">{renderTool()}</div>
      </div>
    </div>
  );
}
