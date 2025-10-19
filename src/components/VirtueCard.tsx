import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
  onUpdate?: (updates: Partial<VirtueCardData>) => void;
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
  onUpdate,
}: VirtueCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);

  const cardStyle = {
    backgroundColor,
    backgroundImage: pattern !== "none" ? pattern : undefined,
  };

  const downloadAsImage = async (side: "front" | "back") => {
    const cardElement = side === "front" ? frontCardRef.current : backCardRef.current;
    if (!cardElement) return;

    try {
      const canvas = await html2canvas(cardElement, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });

      const link = document.createElement("a");
      const fileName = `미덕카드_${studentName || "카드"}_${side === "front" ? "앞면" : "뒷면"}.png`;
      link.download = fileName;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast({
        title: "다운로드 완료",
        description: `${fileName}이(가) 다운로드되었습니다.`,
      });
    } catch (error) {
      toast({
        title: "다운로드 실패",
        description: "이미지 다운로드 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const downloadAsPDF = async () => {
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // 앞면 캡처
      if (frontCardRef.current) {
        const frontCanvas = await html2canvas(frontCardRef.current, {
          backgroundColor: null,
          scale: 2,
          logging: false,
        });
        const frontImgData = frontCanvas.toDataURL("image/png");
        const imgWidth = 150;
        const imgHeight = (frontCanvas.height * imgWidth) / frontCanvas.width;
        const x = (210 - imgWidth) / 2;
        const y = 20;

        pdf.addPage();
        pdf.text("앞면", 105, 15, { align: "center" });
        pdf.addImage(frontImgData, "PNG", x, y, imgWidth, imgHeight);
      }

      // 뒷면 캡처
      if (backCardRef.current) {
        const backCanvas = await html2canvas(backCardRef.current, {
          backgroundColor: null,
          scale: 2,
          logging: false,
        });
        const backImgData = backCanvas.toDataURL("image/png");
        const imgWidth = 150;
        const imgHeight = (backCanvas.height * imgWidth) / backCanvas.width;
        const x = (210 - imgWidth) / 2;
        const y = 20;

        pdf.addPage();
        pdf.text("뒷면", 105, 15, { align: "center" });
        pdf.addImage(backImgData, "PNG", x, y, imgWidth, imgHeight);
      }

      // 첫 페이지 삭제 (빈 페이지)
      pdf.deletePage(1);

      const fileName = `미덕카드_${studentName || "카드"}.pdf`;
      pdf.save(fileName);

      toast({
        title: "다운로드 완료",
        description: `${fileName}이(가) 다운로드되었습니다.`,
      });
    } catch (error) {
      toast({
        title: "다운로드 실패",
        description: "PDF 다운로드 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto perspective-1000">
      <div
        className={`relative w-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 앞면 */}
        <Card
          ref={frontCardRef}
          className={`absolute w-full h-80 p-6 shadow-card hover:shadow-hover transition-all duration-300 backface-hidden ${
            isFlipped ? "invisible" : ""
          }`}
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

        {/* 뒷면 */}
        <Card
          ref={backCardRef}
          className={`absolute w-full h-80 p-6 shadow-card hover:shadow-hover transition-all duration-300 backface-hidden rotate-y-180 ${
            !isFlipped ? "invisible" : ""
          }`}
          style={cardStyle}
        >
          <div className="flex flex-col h-full space-y-4">
            <Badge className="text-lg px-4 py-2 bg-secondary text-secondary-foreground self-center">
              친구가 발견한 미덕
            </Badge>
            <div className="flex-1 space-y-3">
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-muted-foreground mb-1">미덕:</p>
                <p className="text-foreground font-medium">
                  {backVirtue || "친구의 칭찬을 기다려요"}
                </p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-muted-foreground mb-1">감사의 말:</p>
                <p className="text-foreground">
                  {backThanks || "감사의 마음을 전해보세요"}
                </p>
              </div>
            </div>
          </div>
        </Card>
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
          뒤집기
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              다운로드
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-50 bg-popover">
            <DropdownMenuItem onClick={() => downloadAsImage("front")} className="gap-2 cursor-pointer">
              <FileImage className="w-4 h-4" />
              앞면 이미지로 저장
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => downloadAsImage("back")} className="gap-2 cursor-pointer">
              <FileImage className="w-4 h-4" />
              뒷면 이미지로 저장
            </DropdownMenuItem>
            <DropdownMenuItem onClick={downloadAsPDF} className="gap-2 cursor-pointer">
              <FileText className="w-4 h-4" />
              PDF로 저장 (앞뒷면)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};
