import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Download, RotateCcw, Sparkles, FileImage, FileText } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "@/hooks/use-toast";

interface VirtueCardProps {
  id: string;
  grade: string;
  className: string;
  studentName: string;
  frontVirtue: string;
  frontAction: string;
  backVirtue: string;
  backThanks: string;
  backgroundColor: string;
  pattern: string;
}

export interface VirtueCardData {
  id: string;
  grade: string;
  className: string;
  studentName: string;
  frontVirtue: string;
  frontAction: string;
  backVirtue: string;
  backThanks: string;
  backgroundColor: string;
  pattern: string;
}

export const VirtueCard = ({
  grade,
  className,
  studentName,
  frontVirtue,
  frontAction,
  backVirtue,
  backThanks,
  backgroundColor,
  pattern,
}: VirtueCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);

  const cardStyle = {
    backgroundColor,
    backgroundImage: pattern !== "none" ? pattern : undefined,
    backgroundSize: pattern.includes("radial-gradient") ? "20px 20px" : undefined,
  };

  const downloadAsImage = async (side: "front" | "back") => {
    const cardElement = side === "front" ? frontCardRef.current : backCardRef.current;
    if (!cardElement) return;

    try {
      const canvas = await html2canvas(cardElement, {
        backgroundColor: backgroundColor,
        scale: 3,
        logging: false,
        useCORS: true,
      });

      const link = document.createElement("a");
      const fileName = `미덕카드_${studentName || "카드"}_${side === "front" ? "앞면" : "뒷면"}.png`;
      link.download = fileName;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast({
        title: "✅ 다운로드 완료",
        description: `${fileName}이(가) 다운로드되었습니다.`,
      });
    } catch (error) {
      toast({
        title: "❌ 다운로드 실패",
        description: "이미지 다운로드 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const downloadAsPDF = async (layout: "separate" | "together") => {
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      if (layout === "together") {
        // 한 페이지에 앞뒷면 함께
        if (frontCardRef.current && backCardRef.current) {
          const frontCanvas = await html2canvas(frontCardRef.current, {
            backgroundColor: backgroundColor,
            scale: 3,
            logging: false,
            useCORS: true,
          });
          
          const backCanvas = await html2canvas(backCardRef.current, {
            backgroundColor: backgroundColor,
            scale: 3,
            logging: false,
            useCORS: true,
          });

          const imgWidth = 90;
          const frontHeight = (frontCanvas.height * imgWidth) / frontCanvas.width;
          const backHeight = (backCanvas.height * imgWidth) / backCanvas.width;
          
          // 제목
          pdf.setFontSize(16);
          pdf.text(`${studentName}의 미덕 카드`, 105, 15, { align: "center" });
          
          // 앞면
          pdf.setFontSize(12);
          pdf.text("앞면", 60, 30, { align: "center" });
          const frontX = (105 - imgWidth) / 2 + 5;
          pdf.addImage(frontCanvas.toDataURL("image/png"), "PNG", frontX, 35, imgWidth, frontHeight);
          
          // 뒷면
          pdf.text("뒷면", 150, 30, { align: "center" });
          const backX = 105 + (105 - imgWidth) / 2 - 5;
          pdf.addImage(backCanvas.toDataURL("image/png"), "PNG", backX, 35, imgWidth, backHeight);
        }
      } else {
        // 별도 페이지로 앞뒷면
        if (frontCardRef.current) {
          const frontCanvas = await html2canvas(frontCardRef.current, {
            backgroundColor: backgroundColor,
            scale: 3,
            logging: false,
            useCORS: true,
          });
          
          const imgWidth = 150;
          const imgHeight = (frontCanvas.height * imgWidth) / frontCanvas.width;
          const x = (210 - imgWidth) / 2;
          const y = 30;

          pdf.setFontSize(14);
          pdf.text("앞면", 105, 20, { align: "center" });
          pdf.addImage(frontCanvas.toDataURL("image/png"), "PNG", x, y, imgWidth, imgHeight);
        }

        if (backCardRef.current) {
          const backCanvas = await html2canvas(backCardRef.current, {
            backgroundColor: backgroundColor,
            scale: 3,
            logging: false,
            useCORS: true,
          });
          
          const imgWidth = 150;
          const imgHeight = (backCanvas.height * imgWidth) / backCanvas.width;
          const x = (210 - imgWidth) / 2;
          const y = 30;

          pdf.addPage();
          pdf.setFontSize(14);
          pdf.text("뒷면", 105, 20, { align: "center" });
          pdf.addImage(backCanvas.toDataURL("image/png"), "PNG", x, y, imgWidth, imgHeight);
        }
      }

      const fileName = `미덕카드_${studentName || "카드"}.pdf`;
      pdf.save(fileName);

      toast({
        title: "✅ PDF 다운로드 완료",
        description: `${fileName}이(가) 다운로드되었습니다.`,
      });
    } catch (error) {
      console.error("PDF 다운로드 오류:", error);
      toast({
        title: "❌ PDF 다운로드 실패",
        description: "PDF 다운로드 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* 카드 표시 영역 */}
      <div className="relative w-full h-80">
        {/* 앞면 카드 */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isFlipped ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <Card
            ref={frontCardRef}
            className="w-full h-full p-6 shadow-card hover:shadow-hover transition-all duration-300"
            style={cardStyle}
          >
            <div className="flex flex-col h-full space-y-4">
              <div className="text-right">
                <p className="text-sm text-foreground/70">
                  {grade} {className} {studentName}
                </p>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <Badge className="text-xl px-6 py-2 bg-primary text-primary-foreground">
                  <Sparkles className="w-5 h-5 mr-2" />
                  {frontVirtue || "나의 미덕"}
                </Badge>
                <div className="flex-1 flex items-center justify-center px-4">
                  <p className="text-center text-foreground font-medium leading-relaxed">
                    {frontAction || "미덕을 실천한 행동을 적어보세요"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 뒷면 카드 */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isFlipped ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Card
            ref={backCardRef}
            className="w-full h-full p-6 shadow-card hover:shadow-hover transition-all duration-300"
            style={cardStyle}
          >
            <div className="flex flex-col h-full space-y-4">
              <div className="text-center">
                <Badge className="text-lg px-4 py-2 bg-secondary text-secondary-foreground">
                  친구가 발견한 미덕
                </Badge>
              </div>
              <div className="flex-1 space-y-4">
                <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2 font-semibold">미덕:</p>
                  <p className="text-foreground font-medium leading-relaxed">
                    {backVirtue || "친구의 칭찬을 기다려요"}
                  </p>
                </div>
                <div className="bg-card/80 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2 font-semibold">감사의 말:</p>
                  <p className="text-foreground leading-relaxed">
                    {backThanks || "감사의 마음을 전해보세요"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-foreground/70">
                  {grade} {className} {studentName}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="flex justify-center gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFlipped(!isFlipped)}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          {isFlipped ? "앞면 보기" : "뒷면 보기"}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              다운로드
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 bg-popover">
            <DropdownMenuItem onClick={() => downloadAsImage("front")} className="gap-2 cursor-pointer">
              <FileImage className="w-4 h-4" />
              앞면만 이미지로
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadAsImage("back")} className="gap-2 cursor-pointer">
              <FileImage className="w-4 h-4" />
              뒷면만 이미지로
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => downloadAsPDF("together")} className="gap-2 cursor-pointer">
              <FileText className="w-4 h-4" />
              PDF (앞뒷면 한 장에)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadAsPDF("separate")} className="gap-2 cursor-pointer">
              <FileText className="w-4 h-4" />
              PDF (앞뒷면 별도)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
